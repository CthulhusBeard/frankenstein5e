import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js'

export function initVue(f5data) {

    let vueData = {
        editor: {
            edit_mode: true,
            columns: 2,
            player_characters: {
                number: 4,
                level: 1,
            },
            round_tracker: 7,
            import_monster: 0,
        },
        options: {
            name: 'Monster',
            shortName: '',
            isNameProperNoun: false,
            size: 'medium',
            type: 'dragon',
            subtype: '',
            typeCategory: '',
            alignment: '',
            showTypicalAlignment: true,
            armorClass: {
                type: 'none',
                manual: '10',
                name: f5data.armor.none.name,
                bonus: '0',
                stealthDis: false,
                shield: false,
            },
            hitPoints: {
                diceType: 4,
                diceAmount: 1,
                additional: 0,
            },
            abilities: {},
            savingThrows: {},
            damageResistances: [],
            damageImmunities: [],
            damageVulnerabilites: [],
            conditionImmunities: [],
            skills: [],
            languages: {
                spokenWritten: [],
                doesntSpeak: [],
                telepathy: 0,
            },
            speeds: {},
            hover: false,
            senses: {},

            measure: {
                measureUnit: 'ft.',
                measureIncrement: 5,
                measureUnitUp: 5280,
                measureUnitUpName: 'miles',
            },

            showNonCombat: true,
            manualOverride: {
                proficiency: 0,
                casterLevel: 0,
            },
            targetCR: {
                offensive: {
                }, 
                defensive: {
                }
            },
            hasLegendaryActions: true,
            hasMythicActions: false,
            legendaryActions: 3,
            reactions: 1,
            actions: 1,
            features: {
                passive: [],
                spellcasting: [],
                action: [],
                bonus_action: [],
                reaction: [],
                legendary_action: [],
                mythic_action: [],
                lair_action: [],
            },
        },
        f5: f5data,
    };

    for(let ability in f5data.abilities) {
        vueData.options.abilities[ability] = 10;
        vueData.options.savingThrows[ability] = false;
    }

    for(let sense in f5data.senses) {
        vueData.options.senses[sense] = 0;
    }

    for(let lang in f5data.languages) {
        if(f5data.languages[lang]['default']) {
            vueData.options.languages.spokenWritten.push(lang);
        }
    }

    for(let speed in f5data.speeds) {
        if(f5data.speeds[speed]['default']) {
            vueData.options.speeds[speed] = f5data.speeds[speed]['default'];
        } else {
            vueData.options.speeds[speed] = 0;
        }
    }
    
    let app = new Vue({
        el: '#f5',
        data: vueData,
        components: {
            'Multiselect': Multiselect,
            'statblock-feature': StatBlockFeature,
        },

        computed: {
            //Editor
            statblockColumns: function() {
                return 'column-'+this.editor.columns;
            },

            averageDPR: function() {
                let avgDPR = 0;
                let dprGroups = {
                    passive: [],
                    action: [], //include spellcasting
                    bonus_action: [],
                    legendary_action: [], //include mythic_action
                    lair_action: [],
                };

                /*
                total passives
                top action / spellcasting +
                top reaction + 
                top bonus + 
                top legendary/mythic combinations + 
                top lair action
                */
                
                for(const featureType in this.options.features) {
                    for(const feature of this.options.features[featureType]) {
                        let dprType = featureType;
                        if(dprType === 'mythic_action') {
                            dprType = 'legendary_action';
                        } else if(dprType === 'spellcasting') {
                            dprType = 'action';
                        }

                        for(let i = 0; i > 7; i++) {
                            dprGroups[dprType][i] = 0;
                        }

                        if(feature.averageDPR > avgDPR) {
                            avgDPR = feature.averageDPR;
                        }
                    }
                }

                return avgDPR;
            },

            damageProjection: function() {
                let projections = {
                    action: {
                        count: this.options.actions,
                        rounds: [],
                        options: [],
                    },
                    reaction: {
                        count: this.options.reactions,
                        rounds: [],
                        options: [],
                    },
                    legendary_action: {
                        count: this.options.legendaryActions,
                        rounds: [],
                        options: [],
                    },
                    lair_action: {
                        count: 1,
                        rounds: [],
                        options: [],
                    },
                    passive: {
                        count: false,
                        rounds: [],
                        options: [],
                    },
                };

                //Gather Projections
                for(const featureType in this.options.features) {
                    for(const feature of this.options.features[featureType]) {

                        //Merge similar action types
                        let actionType = featureType;
                        if(actionType === 'mythic_action') {
                            actionType = 'legendary_action';
                        } else if(actionType === 'spellcasting') {
                            actionType = 'action';
                        }

                        projections[actionType].options.push([...feature.damageProjection]);  //Clone projection
                    }
                }

                //Sort Projections
                for(let actionType in projections) {
                    for(let i = 0; i < this.editor.round_tracker; i++) {
                        projections[actionType].options.sort(function (a, b) {
                            let damageA = (a[i] && a[i].damage) ? a[i].damage/a[i].actionCost : 0;
                            let damageB = (b[i] && b[i].damage) ? b[i].damage/b[i].actionCost : 0;
                            return damageB - damageA;
                        });

                        let actionCount = 0;
                        for(let j = 0; j < projections[actionType].options.length; j++) {
                            let actionObj = projections[actionType].options[j][i];
                            let actionCost = (actionObj && actionObj.actionCost) ? actionObj.actionCost : 0;
                            if(actionCount + actionCost <= projections[actionType].count) {
                                //Action fits
                                if(actionObj) {
                                    //Add action
                                    if(!projections[actionType].rounds[i]) {
                                        projections[actionType].rounds[i] = [];
                                    }
                                    projections[actionType].rounds[i][j] = actionObj;
                                    actionCount += actionCost;
                                } else if(actionObj) {
                                    //Not enough actions
                                    actionCount += projections[actionType].count;
                                }
                            } else if(actionObj.damage > 0) {
                                //push out viable damage options until later turns
                                projections[actionType].options[j].splice(i, 0, 0);
                            }
                        }
                    }
                }

                console.log('Damage Projections:');
                console.log(projections);

                return projections;
            },

            //Challenge Rating
            damageCr: function() {
                let dpr = this.averageDPR;
                let approxCr = 1;
                
                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(dpr >= cr.dpr.low && dpr <= cr.dpr.high) {
                        approxCr = i;
                        break;
                    }
                }

                return approxCr;
            },

            healthCr: function() {
                //TODO: Factor in AC, HP, and defensive features
                let hp = this.getHP;
                let approxCr = 31;

                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(hp >= cr.hp.low && hp <= cr.hp.high) {
                        approxCr = i;
                        break;
                    }
                }

                return approxCr;
            },

            armorCr: function() {
                //TODO: Factor in AC, HP, and defensive features
                let ac = this.getAC;
                if(!ac) {
                    return 'Unset';
                } else if(ac < this.f5.challengerating[0].ac) {
                    return '0';
                } else if(ac > this.f5.challengerating[20].ac) {
                    return '> 30';
                }
                let crLow = 31;
                let crHigh = 0;

                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(ac == cr.ac) {
                        if(cr.cr > crHigh) {
                            crHigh = cr.cr;
                        }
                        if(cr.cr < crLow) {
                            crLow = cr.cr;
                        }
                    }
                }

                if(crLow == crHigh) return crLow; 
                return crLow+'-'+crHigh;
            },

            averageCR: function() {
                let armorCr = this.armorCr;
                if(armorCr.includes('-')) {
                    let splitArmor = armorCr.split('-');
                    armorCr = (this.toNumber(splitArmor[0]) + this.toNumber(splitArmor[1])) / 2;
                }
                let average = Math.round((armorCr + this.toNumber(this.healthCr) + this.toNumber(this.damageCr)) / 3);
                return average;
            },

            //Description Text
            descriptionText: function() {
                let descStr = '';
                if(this.options.size) {
                    descStr += this.getProp(this.f5.creaturesizes[this.options.size]);
                    this.options.hitPoints.diceType = this.f5.creaturesizes[this.options.size].hit_dice; //TODO check if hitdice were manually set
                }
                if(this.options.type) {
                    if(descStr != '') descStr += ' '; 
                    descStr += this.capitalize(this.getProp(this.f5.creaturetypes[this.options.type]));
                }
                if(this.options.subtype /*|| (this.options.showtypeCategory && this.options.typeCategory)*/) { 
                    if(descStr != '') descStr += ' '; 
                    descStr += '('
                    if(this.options.subtype) {
                        descStr += this.getProp(this.f5.creaturesubtypes[this.options.subtype]);
                    }
                    /* TODO Do something with category?
                    if(this.options.subtype && (this.options.showtypeCategory && this.options.typeCategory)) { 
                        str += ', ';
                    }
                    */
                    descStr += ')';
                }

                if(this.options.alignment) {
                    if(descStr != '') descStr += ', '; 
                    if(this.options.showTypicalAlignment) {
                        descStr += this.f5.misc.alignments_typically.replace(":alignment", this.getProp(this.f5.alignments[this.options.alignment]));
                    } else {
                        descStr += this.getProp(this.f5.alignments[this.options.alignment]);
                    }
                }
                
                return this.capitalize(descStr);
    
            },

            //Armor Class
            allowAcSelector: function() {
                if(this.options.armorClass && this.options.armorClass.type && this.f5.armor[this.options.armorClass.type]) {
                    return (this.f5.armor[this.options.armorClass.type].range);
                }
                return false;
            },

            allowAcBonus: function() {
                if(this.f5.armor[this.options.armorClass.type] && this.f5.armor[this.options.armorClass.type].allow_bonus) {
                    return true;
                }
                return false;
            },

            getAcRange: function() {
                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type] && 
                    this.f5.armor[this.options.armorClass.type].range &&
                    this.f5.armor[this.options.armorClass.type].range.low &&
                    this.f5.armor[this.options.armorClass.type].range.high
                ) {
                    let arr = [];
                    for(let i = this.f5.armor[this.options.armorClass.type].range.low; i < this.f5.armor[this.options.armorClass.type].range.high+1; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
                return 30;
            },

            getAC: function() {
                let acValue = 0;
                let statBonus = 0;

                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type]
                ) {

                    //set AC value
                    if(this.f5.armor[this.options.armorClass.type].range) {
                        //manual value
                        acValue = parseFloat(this.options.armorClass.manual);

                    } else if(this.f5.armor[this.options.armorClass.type].base) {
                        //base value
                        acValue = this.f5.armor[this.options.armorClass.type].base;
                        if(this.f5.armor[this.options.armorClass.type].bonus && this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]) {
                            //get stat bonus
                            statBonus = this.getAbilityMod(this.f5.armor[this.options.armorClass.type].bonus);
                            if(this.f5.armor[this.options.armorClass.type].max_bonus && statBonus > this.f5.armor[this.options.armorClass.type].max_bonus) {
                                //set to max bonus
                                statBonus = this.f5.armor[this.options.armorClass.type].max_bonus;
                            }
                            acValue += parseFloat(statBonus);
                        }
                    } else {
                        console.error('Couldn\'t calculate AC');
                    }
                    
                    if(this.allowAcBonus && this.options.armorClass.bonus && this.options.armorClass.bonus > 0) {
                        acValue += parseFloat(this.options.armorClass.bonus);
                    }
                    
                    if(this.options.armorClass.shield) {
                        acValue += 2;
                    }

                }
                return acValue;
            },

            acText: function() {
                let acText = '';
                let name = '';
                let acValue = 0;
                let magicalBonus = '';
                let statBonus = 0;
                let stealthDis = '';

                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type]
                ) {
                    //set name
                    if(this.options.armorClass.type === 'custom' && this.options.armorClass.name) {
                        name = this.options.armorClass.name;
                    } else if(this.options.armorClass.type !== 'none' && this.f5.armor[this.options.armorClass.type].name) {
                        name = this.f5.armor[this.options.armorClass.type].name;
                    }

                    //set AC value
                    if(this.f5.armor[this.options.armorClass.type].range) {
                        //manual value
                        acValue = parseFloat(this.options.armorClass.manual);
                        if(this.options.armorClass.stealthDis) {
                            stealthDis = ' ('+this.f5.misc.stealth_dis+')';
                        }

                    } else if(this.f5.armor[this.options.armorClass.type].base) {
                        //base value
                        acValue = this.f5.armor[this.options.armorClass.type].base;
                        if(this.f5.armor[this.options.armorClass.type].bonus && this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]) {
                            //get stat bonus
                            statBonus = this.getAbilityMod(this.f5.armor[this.options.armorClass.type].bonus);
                            if(this.f5.armor[this.options.armorClass.type].max_bonus && statBonus > this.f5.armor[this.options.armorClass.type].max_bonus) {
                                //set to max bonus
                                statBonus = this.f5.armor[this.options.armorClass.type].max_bonus;
                            }
                            acValue += parseFloat(statBonus);
                        }
                        if(this.f5.armor[this.options.armorClass.type].stealth_dis) {
                            stealthDis = ' ('+this.f5.misc.stealth_dis+')';
                        }
                    } else {
                        console.error('Couldn\'t calculate AC');
                    }
                    
                    if(this.allowAcBonus && this.options.armorClass.bonus && this.options.armorClass.bonus > 0) {
                        acValue += parseFloat(this.options.armorClass.bonus);
                        magicalBonus = "+"+this.options.armorClass.bonus+' ';
                    }

                    let shieldText = '';
                    if(this.options.armorClass.shield) {
                        shieldText = ', '+this.f5.misc.shield;
                    }

                    acText = String(acValue);
                    if(magicalBonus || shieldText || name) {
                        acText += ' (' + magicalBonus + name + shieldText + ')';// +stealthDis?;
                    }
                }
                return acText.toLowerCase();
            },

            //Hit Points
            getHP: function() {
                let type = this.options.hitPoints.diceType;
                let amount = this.options.hitPoints.diceAmount;
                let additionalHP = this.options.hitPoints.additional > 0 ? Math.floor(this.options.hitPoints.additional) : 0;
                if(additionalHP > 9999) {
                    this.options.hitPoints.additional = additionalHP = 9999;
                }
                let conMod = this.getAbilityMod('con');
                let conHP = 0;
                if(conMod > 0) {
                    conHP = conMod * amount;
                }
                let hp = (Math.round((type / 2 + .5) * amount) + conHP) + additionalHP;
                return hp;
            },

            hitPointsText: function() {
                let type = this.options.hitPoints.diceType;
                let amount = this.options.hitPoints.diceAmount;
                let additionalHP = this.options.hitPoints.additional > 0 ? Math.floor(this.options.hitPoints.additional) : 0;
                if(additionalHP > 9999) {
                    this.options.hitPoints.additional = additionalHP = 9999;
                }
                let conMod = this.getAbilityMod('con');
                let conHP = 0;
                if(conMod > 0) {
                    conHP = conMod * amount;
                }

                let hp = (Math.round((type / 2 + .5) * amount) + conHP) + additionalHP;
                if(isNaN(hp)) {
                    return this.f5.misc.undefined_health; 
                }
                let conText = '';
                if(conHP > 0 || additionalHP > 0) {
                    conText = ' + '+(conHP + additionalHP);
                }
                let hpText = hp+' ('+amount + this.f5.misc.die_symbol+type+conText;
                hpText += ')';
                return hpText;
            },

            //Damages
            //TODO have a fix for redundancies
            //If in immunity, then remove from resistance and vulnerability
            //If in resistance, then remove from vulnerability
            damageResistanceText: function() {   
                return this.damageList(this.options.damageResistances).toLowerCase();
            },
            damageImmunitiesText: function() { 
                return this.damageList(this.options.damageImmunities).toLowerCase();
            },
            damageVulnerabilitiesText: function() { 
                return this.damageList(this.options.damageVulnerabilites).toLowerCase();
            },
            conditionImmunitiesText: function() {
                return this.conditionList(this.options.conditionImmunities).toLowerCase();
            },
            
            eligableDamageTypes: function() {
                let list = [];
                for(let i in this.f5.damagetypes) {
                    if(
                        this.options.damageResistances.includes(i) ||
                        this.options.damageImmunities.includes(i) ||
                        this.options.damageVulnerabilites.includes(i)
                    ) {
                        list.push({ value: i, label: this.f5.damagetypes[i].name, disabled: true});
                    } else {
                        list.push({ value: i, label: this.f5.damagetypes[i].name});
                    }
                }
                return list;
            },

            dealableDamageTypes: function() {
                let list = [];
                for(let i in this.f5.damagetypes) {
                    if(!(this.f5.damagetypes[i].dealt === false)) {
                        list.push({ value: i, label: this.f5.damagetypes[i].name});
                    }
                }
                
                return list;
            },

            //Speeds
            speedText: function() {
                let displayText = '';
                for(let i in this.options.speeds) {
                    if(!this.options.speeds[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    if(!this.f5.speeds[i]['hide_name']) {
                        displayText += this.f5.speeds[i].name.toLowerCase()+' ';
                    }
                    displayText += this.options.speeds[i]+' '+this.options.measure.measureUnit; 
                    if(i === 'fly' && this.options.hover) {
                        displayText += ' ('+this.f5.misc.hover.toLowerCase()+')';
                    }
                }
                if(!displayText) {
                    displayText = this.f5.misc.cant_move;
                }
                return displayText;
            },

            //Senses
            sensesText: function() {                
                let displayText = '';
                for(let i in this.options.senses) {
                    if(!this.options.senses[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    if(!this.f5.senses[i]['hide_name']) {
                        displayText += this.f5.senses[i].name.toLowerCase()+' ';
                    }
                    displayText += this.options.senses[i]+' '+this.options.measure.measureUnit;
                }

                //Passive Perception
                if(this.options.skills.includes('perception')) {
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.f5.misc.passive_skill.replace(':skill', this.f5.skills['perception'].name)+' '+(this.calcSkillMod('perception')+10);
                }
                return displayText;
            },

            //Subtypes
            orderedSubtypes: function() {
                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type]['subtypes']) {
                    let topSubtypes = [];
                    let count = 0;

                    for (let i in this.$data.f5.creaturesubtypes) {
                        
                        let subtypeObj = this.$data.f5.creaturesubtypes[i];
                        subtypeObj.id = i;

                        if(this.$data.f5.creaturetypes[this.options.type]['subtypes'].includes(i)) {
                            topSubtypes.splice(count, 0, subtypeObj);
                            count++;
                        } else {
                            topSubtypes.push(subtypeObj);
                        }
                    }

                    return topSubtypes;
                }
        
                return this.f5.creaturesubtypes;
            },

            //Type Options
            typeCategoryList: function() {
                let optionsList = [];

                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type].hasOwnProperty('options')) {
                    for (let i in this.$data.f5.creaturetypes[this.options.type]['options']) {
                        let data = this.$data.f5.creaturetypes[this.options.type]['options'][i];
                        data.id = i;
                        optionsList.push(data);
                    }
                }

                if(this.$data.f5.creaturesubtypes.hasOwnProperty(this.options.subtype) && this.$data.f5.creaturesubtypes[this.options.subtype].hasOwnProperty('options')) {
                    for (let i in this.$data.f5.creaturesubtypes[this.options.subtype]['options']) {
                        let data = this.$data.f5.creaturesubtypes[this.options.subtype]['options'][i];
                        data.id = i;
                        optionsList.push(data);
                    }
                }

                return optionsList;
            },

            //Languages
            languageText: function() {
                let displayText = '';

                if(this.options.languages.spokenWritten.includes('all')) {
                    return this.$data.f5.languages['all'].name;
                }

                for(let lang of this.options.languages.spokenWritten) {
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.$data.f5.languages[lang].name; 
                }
                if(!displayText) {
                    displayText = this.$data.f5.misc.languages_none;
                }
                return displayText;
            },

            //Skills
            skillText: function() {
                let displayText = '';

                for(let skill in this.$data.f5.skills) {
                    if(!this.options.skills.includes(skill)) {
                        continue;
                    }
                    if(this.calcSkillMod(skill) == 0) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }

                    displayText += this.$data.f5.skills[skill].name + ' '+this.addPlus(this.calcSkillMod(skill)); 
                }
                return displayText;
            },

            //Saving Throw
            savingThrowText: function() {
                let displayText = '';

                for(let i in this.options.savingThrows) {
                    if(!this.options.savingThrows[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }

                    displayText += this.capitalize(i) + ' +'+(this.getAbilityMod(i) + this.proficiency); 
                }
                return displayText;
            },

            //
            proficiencyText: function() {
                return "+"+this.proficiency;
            },

            //Challenge Rating
            crText: function() {
                let averageCRKey = this.toCRFormat(this.averageCR);
                let crText = this.f5.misc.display_challenge_rating.replace(':cr', averageCRKey);
                let cr = this.f5.challengerating[averageCRKey];
                if(cr && cr.xp) {
                    crText += ' '+this.f5.misc.display_challenge_rating_xp.replace(':xp', cr.xp);
                }
                return crText;
            },

            ///////////////// NEW FEATURE /////////////////
            newFeatureAttackText: function() {
                let abilityMod = this.getAbilityMod(this.newFeature.attack.ability);
                let displayText = '<span class="i">';
                if(this.newFeature.attack.meleeRanged == 'meleeranged') {
                    displayText += 'Melee or Ranged';
                } else if(this.newFeature.attack.meleeRanged == 'melee') {
                    displayText += 'Melee';
                } else if(this.newFeature.attack.meleeRanged == 'ranged') {
                    displayText += 'Ranged';
                }
                if(this.newFeature.attack.weaponSpell == 'weapon') {
                    displayText += ' Weapon ';
                } else if(this.newFeature.attack.weaponSpell == 'spell') {
                    displayText += ' Spell ';
                }
                displayText += 'Attack:</span> +';
                displayText += (abilityMod+this.proficiency);
                displayText += ' to hit';

                if(this.newFeature.attack.meleeRanged !== 'ranged') {
                    displayText += ', reach '+this.newFeature.attack.reach+' '+this.options.measure.measureUnit;
                    displayText += ', '+this.newFeature.attack.targets+' target';
                    if(this.newFeature.attack.targets !== 1) {
                        displayText += 's';
                    }
                }

                if(this.newFeature.attack.meleeRanged !== 'melee') {
                    displayText += ', range ';
                    displayText += this.newFeature.attack.rangeShort;
                    if(this.newFeature.attack.rangeLong > this.newFeature.attack.rangeShort) {
                        displayText += '/'+this.newFeature.attack.rangeLong;
                    }
                    displayText += ' '+this.options.measure.measureUnit;
                    displayText += ', '+this.newFeature.attack.targets+' target';
                    if(this.newFeature.attack.targets !== 1) {
                        displayText += 's';
                    }
                }

                displayText += '. <span class="i">Hit: </span> (';
                displayText += this.newFeature.attack.diceAmount+'d'+this.newFeature.attack.damageDice;
                if(abilityMod > 0) {
                    displayText += ' + '+abilityMod;
                } else if(abilityMod < 0) {
                    displayText += ' - '+(abilityMod*-1);
                } 
                displayText += ')';

                return displayText;
            },

            newFeatureSpellText: function() {
                let displayText = '';

                return displayText;
            },

            casterLevel: function() {
                let casterLevel = this.options.hitPoints.diceAmount;
                return casterLevel;
            },

            proficiency: function() {
                let proficiency = 2; //Default

                if(this.options.manualOverride.proficiency > 1) {
                    return this.options.manualOverride.proficiency;
                }

                let cr = this.f5.challengerating[this.averageCR];
                if(cr && cr.prof > 0) {
                    proficiency = cr.prof;
                }

                return proficiency;
            },
        },

        methods: {

            damageList: function(input) {
                let sortArr = Object.keys(this.f5.damagetypes);
                input.sort((a, b) => sortArr.indexOf(a) - sortArr.indexOf(b));
                let displayText = '';
                for(let i of input) {
                    if(this.f5.damagetypes[i].long_name) {
                        if(displayText !== '') displayText += '; ';
                        displayText += this.f5.damagetypes[i].long_name;
                    } else {
                        if(displayText !== '') displayText += ', ';
                        displayText += this.f5.damagetypes[i].name;
                    }
                }
                return displayText;
            },

            unsetDamages: function(i, type = null) {
                if(type != "resistance" && this.options.damageResistances[i]) {
                    this.options.damageResistances[i] = false;
                }
                if(type != "immunity" && this.options.damageImmunities[i]) {
                    this.options.damageImmunities[i] = false;
                }
                if(type != "vulnerability" && this.options.damageVulnerabilites[i]) {
                    this.options.damageVulnerabilites[i] = false;
                }
            },

            conditionList: function(input) {
                let displayText = '';
                for(let i of input) {                    
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.f5.conditions[i].name;
                }
                return displayText;
            },

            listReturn: function (list) {
                let displayText = '';
                
                if(this.$data.options[list].hasOwnProperty('all')) {
                    return this.$data.f5[list]['all'].name;
                }

                for(let i in this.options[list]) {
                    if(!this.options[list][i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.$data.f5[list][i].name; 
                }
                return displayText;
            },

            generateArmourText: function (item, max) {
                let text = item.name;
                if(item.range && item.range.low && item.range.high) {
                    text += ' ('+item.range.low+'-'+item.range.high+')';
                }
                if(item.base) {
                    text += ' ('+item.base;
                    if(item.bonus) {
                        text += '+'+item.bonus.toUpperCase();
                        if(item.max_bonus) {
                            text += ' - '+max+' '+item.max_bonus;
                        }
                    }
                    text += ')';
                }
                return text;
            }, 

            generateWarnings: function() {
                //Warning for armor that's too heavy 'str_requirement' vs STR
                if(
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type] && 
                    this.f5.armor[this.options.armorClass.type].str_requirement && 
                    this.abilities.str < this.f5.armor[this.options.armorClass.type].str_requirement
                ) {
                    //TODO CREATE WARNING
                }
            },

            calcSkillMod: function (skill) {
                let ability = this.$data.f5.skills[skill].ability;
                let abilityMod = this.getAbilityMod(ability);
                if(this.options.skills.includes(skill)) {
                    abilityMod += this.proficiency;
                }
                return abilityMod;
            },

            calcAbilityMod: function (abilityScore) {
                let mod = Math.floor((abilityScore-10)/2);
                return mod;
            },

            getAbilityMod: function (ability) {
                let score = this.options.abilities[ability];
                return this.calcAbilityMod(score);
            },

            makeSavingThrowDC: function(ability) {
                return (8 + this.proficiency + this.getAbilityMod(ability));
            },

            addPlus: function (number, addSpace = false) {
                let space = addSpace ? ' ' : '';
                if(number > 0) {
                    number = '+'+space+number;
                } else if(number < 0) {
                    if(addSpace) {
                        number = String(number).replace('-','-'+space);
                    }
                }
                return number; 
            },

            getProp: function (obj, prop = 'name') {
                if(obj === undefined) {
                    return '';
                }
                if(obj[prop]) {
                    return obj[prop];
                }
                
                return obj;
            },

            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            createFeature: function(type) {
                let newFeature = {
                    id: this.randChars(15),
                    actionType: type,
                    name: this.f5.misc.title_new_feature,
                    template: 'custom', 
                    attackAbility: 'str',
                    targetType: 'melee',
                    attackType: 'none',
                    attackRange: {'low': 20, 'high': 60},
                    attackReach: 5,
                    attackDamage: [],
                    attackSavingThrow: false,
                    attackTargets: 1,
                    aoeRange: 30,
                    savingThrowMonsterAbility: 'str',
                    savingThrowSaveAbilities: ['str'],
                    savingThrowDamage: [],
                    savingThrowHalfOnSuccess: true,
                    savingThrowConditions: [],
                    hasOngoingDamage: false,
                    ongoingDamage: [],
                    ongoingDamageOccurs: 'start_of_turn',
                    ongoingDamageOnFailedSave: true,
                    ongoingDamageRepeatSave: false,
                    ongoingDamageDuration: 'ongoing',
                    recharge: {
                        type: 'none',
                        diceType: 6,
                        minRoll: 5,
                        uses: 1,
                    },
                    spellcastingAbility: 'int',
                    innateSpellcasting: false,
                    spellList: [],
                    spellSlots: {
                        0: 1,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                    },
                    customDamage: [],
                    customDescription: '',
                    multiattackReferences: [],
                    legendaryActionCost: 1,
                    manualDPR: -1,
                    averageDPR: -1,
                    damageProjection: [],
                };

                newFeature.attackDamage.push(this.createDamageDie(true));
                newFeature.savingThrowDamage.push(this.createDamageDie());
                newFeature.ongoingDamage.push(this.createDamageDie());

                if(type === 'spellcasting') {
                    newFeature.template = 'spellcasting';
                    newFeature.name = this.f5.misc.title_spellcasting;
                }

                this.options.features[type].push(newFeature);
            },

            removeFeature: function(type, id) {
                for(let i in this.options.features[type]) {
                    if(this.options.features[type][i].id === id) {
                        this.options.features[type].splice(i, 1);
                        return;
                    }
                }
            },

            createDamageDie: function(setAbilityBonus = false) {
                return {
                    diceType: 4,
                    diceAmount: 1,
                    additional: 0,
                    abilityBonus: setAbilityBonus,
                    type: 'slashing',
                }
            },

            averageDamage: function(damageObj, ability = 0) { //ability accepts Number or ability name
                let abilityDamage = 0;
                if(typeof ability === 'string' && damageObj.abilityBonus) {
                    abilityDamage = Number(this.getAbilityMod(ability));
                    if(Number.isNaN(abilityDamage)) {
                        abilityDamage = 0;
                    }
                } else if(typeof ability === 'number') {
                    abilityDamage = Number(ability);
                }
                let damage = Math.floor(((damageObj.diceType / 2) + .5) * damageObj.diceAmount) + (Number(damageObj.additional) + Number(abilityDamage));
                return damage > 0 ? damage : 1;
            },

            createDamageText: function(damageObj, ability) {
                let descText = '';
                if(damageObj.diceAmount > 0) {
                    descText += this.averageDamage(damageObj, ability);
                    descText += ' ('+this.$data.f5.misc.die_structure.replace(':die_amount', damageObj.diceAmount).replace(':die_type', damageObj.diceType);

                    let additionalDamage = Number(damageObj.additional);
                    if(damageObj.abilityBonus) {
                        additionalDamage += this.getAbilityMod(ability);
                    }
                    if(additionalDamage != 0) {
                        descText += ' '+this.addPlus(additionalDamage, true);
                    }

                    descText += ') ';
                } else {
                    descText = damageObj.additional+' ';
                }
                descText += this.$data.f5.misc.damage.replace(':type', this.$data.f5.damagetypes[damageObj.type].name.toLowerCase());
                return descText;
            },

            randChars: function(len) {
                const base = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvyxyz0123456789"];
                const generator = (base, len) => {
                    return [...Array(len)]
                      .map(i => base[Math.random()*base.length|0])
                      .join('');
                };
                return generator(base, len);
            },

            createSentenceList: function(input, inclusive = true, modifierFunction = null) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    //TODO this might need to change in other languages
                    if(descText) {
                        if(len > 2) {
                            descText += this.f5.misc.sentence_list_separator+' ';
                        }
                        if(i == len-1) {
                            if(inclusive) {
                                descText += ' '+this.f5.misc.and+' ';
                            } else {
                                descText += ' '+this.f5.misc.or+' ';
                            }
                        }
                    }
                    if(modifierFunction != null && typeof modifierFunction === 'function') {
                        descText += modifierFunction(input[i]);
                    } else {
                        descText += input[i];
                    }
                }
                return descText;
            },

            createConditionSentenceList: function(input, inclusive = true) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    //TODO this might need to change in other languages
                    if(descText) {
                        if(len > 2) {
                            descText += this.f5.misc.sentence_list_separator+' ';
                        }
                        if(i == len-1) {
                            if(inclusive) {
                                descText += ' '+this.f5.misc.and+' ';
                            } else {
                                descText += ' '+this.f5.misc.or+' ';
                            }
                        }
                    }
                    descText += input[i];
                }
                return descText;
            },

            createSimpleList: function(input) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    if(descText) {
                        descText += this.f5.misc.sentence_list_separator+' ';
                    }
                    descText += input[i];
                }
                return descText;
            },

            translate: function(str, pluralCount = 1) {
                let pluralBreak = str.indexOf('|');
                let retStr = str;
                if(pluralCount == 0 || pluralCount > 1) {
                    retStr = str.substr(pluralBreak+1);
                } else {
                    retStr = str.substr(0, pluralBreak);
                }
                return retStr;
            },

            ordinalNumber: function(num) {
                let ordinal = '';
                let lastDigit = String(num).charAt(-1);

                if(lastDigit === 1 && num != 11) {
                    ordinal = this.f5.misc.ordinal_1;
                } else if(lastDigit === 2 && num != 12) {
                    ordinal = this.f5.misc.ordinal_2;
                } else if(lastDigit === 3 && num != 13) {
                    ordinal = this.f5.misc.ordinal_3;
                } else {
                    ordinal = this.f5.misc.ordinal_other;
                }

                return String(num)+ordinal;
            }, 

            determineIndefiniteArticle: function(str) {
                let vowels = ['a', 'e', 'i', 'o', 'u'];
                let vowelNumbers = [1,8,11,18]; //ignoring 80+
                let firstChar = String(str).charAt(0).toLowerCase();
                if(
                    vowels.includes(firstChar) ||
                    vowelNumbers.includes(Number(str))
                ) {
                    return this.f5.misc.indefinite_article_an;
                } else {
                    return this.f5.misc.indefinite_article_a;
                }
            },

            averageAOETargets: function(targetType) {
                let targets = this.$parent.f5.areaofeffect[targetType].targets_at_30;
                if(targets > 1) {
                    targets = (targets/(distanceBaseline*2)) * (distanceBaseline + this.value.aoeRange); //basic formula to assume average number of targets hit
                    if(targets > this.editor.player_characters.number) {
                        targets = this.editor.player_characters.number;
                    }
                }
                return targets;
            },

            morphFeatureProjection: function(featureProjection) {
                return featureProjection;
            },

            mergeProjections: function(monsterProjection, inject, featureProjection) {
                return monsterProjection.splice(inject, 0, this.morphFeatureProjection(featureProjection));
            },

            toNumber: function(input) {
                if(input.includes('/')) {
                    let divideArray = input.split('/');
                    input = divideArray[0] / divideArray[1];
                }
                return Number(input);
            },

            toCRFormat: function(input) {
                if(input > 0 && input < 1) {
                    let compareToHalf = input - .5;
                    compareToHalf = (compareToHalf >= 0) ? compareToHalf : compareToHalf * -1;
                    let compareToQuarter = input - .25;
                    compareToQuarter = (compareToQuarter >= 0) ? compareToQuarter : comcompareToQuarterpareToHalf * -1;
                    let compareToEigth = input - .125;
                    compareToEigth = (compareToEigth >= 0) ? compareToEigth : compareToEigth * -1;

                    if(compareToHalf <= compareToQuarter && compareToHalf <= compareToEigth && compareToHalf <= input) {
                        return "1/2";
                    } else if(compareToQuarter <= compareToHalf && compareToQuarter <= compareToEigth && compareToQuarter <= input) {
                        return "1/4";
                    } else if(compareToEigth <= compareToEigth && compareToEigth <= compareToHalf && compareToEigth <= input) {
                        return "1/8";
                    } else {
                        return 0;
                    }
                }
                return input;
            },

            exportMonster: function() {
                let cloneOptions = {...this.options};
                cloneOptions.averageDPR = -1;
                cloneOptions.damageProjection = [];
                for(let featureType in cloneOptions.features) {
                    for(let feature of cloneOptions.features[featureType]) {
                        feature.averageDPR = -1;
                        feature.damageProjection = [];
                    }
                }
                console.log('exportMonster');
                console.log(cloneOptions);
            },

            importMonster: function() {
                this.options = SampleMonsters.monsters[this.editor.import_monster];
            },
        }
    });

    return app;

}