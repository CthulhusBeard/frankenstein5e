import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js';
import ProjectionGraph from './projection-graph.js';

export default {
    props: [
        'initialStatblock',
        'playerData',
        'combatRounds',
        'f5', 
        'measure', 
    ],
    template: '#template-statblock',
    
    components: {
        'Multiselect': Multiselect,
        'StatblockFeature': StatBlockFeature,
    },

    //expose: ['value.name'],

    data: function() {
        return {
            mountedFeatures: 0,
            damageUpdateIncrementer: 0,
            editMode: true,
            trackingId: this.initialStatblock.trackingId,
            value: {
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
                    bonus: '0',
                    stealthDis: false,
                    shield: false,
                    mageArmor: false,
                },
                hitPoints: {
                    diceType: 4,
                    diceAmount: 1,
                    additional: 0,
                },
                abilities: this.createDefaultAbilityScores(),
                savingThrows: this.createDefaultSavingThrows(),
                damageResistances: [],
                damageImmunities: [],
                damageVulnerabilites: [],
                conditionImmunities: [],
                skills: [],
                languages: this.createDefaultLanguages(),
                speeds: this.createDefaultSpeeds(),
                hover: false,
                senses: this.createDefaultSenses(),
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
                bonusActions: 1,
                features: {
                    passive: [],
                    spellcasting: [],
                    multiattack: [],
                    action: [],
                    bonus_action: [],
                    reaction: [],
                    legendary_action: [],
                    mythic_action: [],
                    lair_action: [],
                },
                display: {
                    columns: 1,
                }
            }
        }
    },

    created() {
        for(let prop in this.initialStatblock) {
            if(prop === 'id') continue;
            this.value[prop] = this.initialStatblock[prop]; 
        }
    },

    mounted() {
    },

    computed: {

        displayName: function() {
            this.$emit('update-name', this.trackingId, this.value.name);
            return this.value.name;
        },

        statblockColumns: function() {
            return 'column-'+this.value.display.columns;
        },

        averageDPR: function() {
            let updater = this.damageUpdateIncrementer;
            let dprGroups = {
                passive: 0,
                action: 0, //include spellcasting and multiattack
                reaction: 0,
                bonus_action: 0,
                legendary_action: 0, //include mythic_action
                lair_action: 0,
            };
            
            for(const featureType in this.value.features) {
                for(const feature of this.value.features[featureType]) {
                    let dprType = featureType;
                    if(dprType === 'mythic_action') {
                        dprType = 'legendary_action';
                    } else if(dprType === 'spellcasting' || dprType === 'multiattack') {
                        dprType = 'action';
                    }

                    if(feature.averageDPR > dprGroups[dprType]) {
                        dprGroups[dprType] = feature.averageDPR;
                    }
                }
            }

            let dpr = Object.values(dprGroups).reduce((a, b) => a + b);
            return dpr;
        },

        damageProjection: function() {
            let updater = this.damageUpdateIncrementer;
            let projections = {
                action: {
                    count: this.value.actions,
                    rounds: [],
                    options: [],
                },
                bonus_action: {
                    count: this.value.bonusActions,
                    rounds: [],
                    options: [],
                },
                reaction: {
                    count: this.value.reactions,
                    rounds: [],
                    options: [],
                },
                legendary_action: {
                    count: this.value.legendaryActions,
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
            let mergeActions = {
                'multiattack': 'action',
                'spellcasting': 'action',
                'mythic_action': 'legendary_action',
            };

            for(const featureType in this.value.features) {
                for(const feature of this.value.features[featureType]) {
                    //Merge similar action types
                    if(!feature.damageProjection) {
                        continue;
                    }
                    let actionType = featureType;
                    if(mergeActions.hasOwnProperty(actionType)) {
                        actionType = mergeActions[actionType];
                    }
                    projections[actionType].options.push(JSON.parse(JSON.stringify(feature.damageProjection)));  //Clone projection
                }
            }
            
            //Sort Projections
            for(let actionType in projections) {
                if(!projections[actionType].options.length) {
                    delete projections[actionType];
                    continue;
                }
                for(let roundNum = 0; roundNum < this.combatRounds; roundNum++) {
                    //Sort by most damage
                    projections[actionType].options = projections[actionType].options.sort(function (a, b) {
                        let damageA = (a[roundNum] && a[roundNum].damage) ? a[roundNum].damage / a[roundNum].actionCost : 0;
                        let damageB = (b[roundNum] && b[roundNum].damage) ? b[roundNum].damage / b[roundNum].actionCost : 0;
                        return damageB - damageA;
                    });

                    let actionCount = 0;
                    for(let j = 0; j < projections[actionType].options.length; j++) {
                        let actionObj = projections[actionType].options[j][roundNum];
                        let actionCost = (actionObj && actionObj.actionCost) ? actionObj.actionCost : 0;
                        if(actionCount + actionCost <= projections[actionType].count) {
                            //Action fits
                            if(actionObj) {
                                //Add action
                                if(!projections[actionType].rounds[roundNum]) {
                                    projections[actionType].rounds[roundNum] = [];
                                }
                                projections[actionType].rounds[roundNum][j] = actionObj;
                                actionCount += actionCost;
                            } else if(actionObj) {
                                //Not enough actions
                                actionCount += projections[actionType].count;
                            }

                        } else if(actionObj.damage > 0) {
                            //push out viable damage options until later turns
                            projections[actionType].options[j].splice(roundNum, 0, 0);
                        }
                    }
                }
            }

            //Create turn totals and action list
            let totals = [];
            for(let actionType in projections) { 
                for(let roundNum = 0; roundNum < this.combatRounds; roundNum++) {
                    if(!projections[actionType].rounds[roundNum]) {
                        continue;
                    }
                    for(let i = 0; i < projections[actionType].rounds[roundNum].length; i++) {
                        if(!totals[roundNum]) {
                            totals[roundNum] = {
                                abilities: [], 
                                damage: 0, 
                                maxDamage: 0
                            };
                        }
                        if(
                            projections[actionType].rounds[roundNum][i] && 
                            projections[actionType].rounds[roundNum][i].damage && 
                            projections[actionType].rounds[roundNum][i].damage > 0
                        ) {
                            //Add This Action
                            if(!totals[roundNum].abilities[actionType]) {
                                totals[roundNum].abilities[actionType] = [];
                            }
                            totals[roundNum].abilities[actionType].push({
                                name: projections[actionType].rounds[roundNum][i].name,
                                damage: projections[actionType].rounds[roundNum][i].damage,
                                maxDamage: projections[actionType].rounds[roundNum][i].maxDamage,
                            });
                            totals[roundNum].damage += projections[actionType].rounds[roundNum][i].damage;
                            totals[roundNum].maxDamage += projections[actionType].rounds[roundNum][i].maxDamage;
                        }
                    }
                }
            }
            return totals;
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
            armorCr = armorCr.replace('> ','');
            if(String(armorCr).includes('-')) {
                let splitArmor = armorCr.split('-');
                armorCr = this.toNumber(this.toNumber(splitArmor[0]) + this.toNumber(splitArmor[1])) / 2;
            }
            let defensiveCr = (Number(armorCr) + this.toNumber(this.healthCr)) / 2;

            let average = (defensiveCr + this.toNumber(this.damageCr)) / 2;

            return average;
        },

        //Description Text
        descriptionText: function() {
            let descStr = '';
            if(this.value.size) {
                descStr += this.getProp(this.f5.creaturesizes[this.value.size]);
                this.value.hitPoints.diceType = this.f5.creaturesizes[this.value.size].hit_dice; 
                //TODO check if hitdice were manually set
            }
            if(this.value.type) {
                if(descStr != '') descStr += ' '; 
                descStr += this.capitalize(this.getProp(this.f5.creaturetypes[this.value.type]));
            }
            if(this.value.subtype /*|| (this.value.showtypeCategory && this.value.typeCategory)*/) { 
                if(descStr != '') descStr += ' '; 
                descStr += '('
                if(this.value.subtype) {
                    descStr += this.getProp(this.f5.creaturesubtypes[this.value.subtype]);
                }
                /* TODO Do something with category?
                if(this.value.subtype && (this.value.showtypeCategory && this.value.typeCategory)) { 
                    str += ', ';
                }
                */
                descStr += ')';
            }

            if(this.value.alignment) {
                if(descStr != '') descStr += ', '; 
                if(this.value.showTypicalAlignment) {
                    descStr += this.f5.misc.alignments_typically.replace(":alignment", this.getProp(this.f5.alignments[this.value.alignment]));
                } else {
                    descStr += this.getProp(this.f5.alignments[this.value.alignment]);
                }
            }
            
            return this.capitalize(descStr);

        },

        //Armor Class
        allowAcSelector: function() {
            if(this.value.armorClass && this.value.armorClass.type && this.f5.armor[this.value.armorClass.type]) {
                return (this.f5.armor[this.value.armorClass.type].range);
            }
            return false;
        },

        allowAcBonus: function() {
            if(this.f5.armor[this.value.armorClass.type] && this.f5.armor[this.value.armorClass.type].allow_bonus) {
                return true;
            }
            return false;
        },

        getAcRange: function() {
            if(
                this.value.armorClass && 
                this.value.armorClass.type && 
                this.f5.armor[this.value.armorClass.type] && 
                this.f5.armor[this.value.armorClass.type].range &&
                this.f5.armor[this.value.armorClass.type].range.low &&
                this.f5.armor[this.value.armorClass.type].range.high
            ) {
                let arr = [];
                for(let i = this.f5.armor[this.value.armorClass.type].range.low; i < this.f5.armor[this.value.armorClass.type].range.high+1; i++) {
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
                this.value.armorClass && 
                this.value.armorClass.type && 
                this.f5.armor[this.value.armorClass.type]
            ) {

                //set AC value
                if(this.f5.armor[this.value.armorClass.type].range) {
                    //manual value
                    acValue = parseFloat(this.value.armorClass.manual);

                } else if(this.f5.armor[this.value.armorClass.type].base) {
                    //base value
                    acValue = this.f5.armor[this.value.armorClass.type].base;
                    if(this.f5.armor[this.value.armorClass.type].bonus && this.value.abilities[this.f5.armor[this.value.armorClass.type].bonus]) {
                        //get stat bonus
                        statBonus = this.getAbilityMod(this.f5.armor[this.value.armorClass.type].bonus);
                        if(this.f5.armor[this.value.armorClass.type].max_bonus && statBonus > this.f5.armor[this.value.armorClass.type].max_bonus) {
                            //set to max bonus
                            statBonus = this.f5.armor[this.value.armorClass.type].max_bonus;
                        }
                        acValue += parseFloat(statBonus);
                    }
                } else {
                    console.error('Couldn\'t calculate AC');
                }
                
                if(this.allowAcBonus && this.value.armorClass.bonus && this.value.armorClass.bonus > 0) {
                    acValue += parseFloat(this.value.armorClass.bonus);
                }
                
                if(this.value.armorClass.shield) {
                    acValue += 2;
                }

            }
            return acValue;
        },

        acText: function() {
            let acText = '';
            let name = '';
            let acValue = this.getAC;
            let magicalBonus = '';
            let stealthDis = '';

            if(
                this.value.armorClass && 
                this.value.armorClass.type && 
                this.f5.armor[this.value.armorClass.type]
            ) {
                //set name
                if(this.value.armorClass.type === 'custom' && this.value.armorClass.name) {
                    name = this.value.armorClass.name;
                } else if(this.value.armorClass.type !== 'none' && this.f5.armor[this.value.armorClass.type].name) {
                    name = this.f5.armor[this.value.armorClass.type].name;
                }

                let shieldText = '';
                if(this.value.armorClass.shield) {
                    shieldText = this.f5.misc.shield;
                }

                let mageArmorText = '';
                if(this.value.armorClass.mageArmor) {
                    let mageArmorAc = 13 + this.getAbilityMod('dex');
                    if(this.value.armorClass.shield) {
                        mageArmorAc += 2;
                    }
                    if(mageArmorAc > acValue) {
                        mageArmorText = this.f5.misc.mage_armor.replace(':mage_armour_ac', mageArmorAc);
                    }
                }

                acText = String(acValue);
                if(magicalBonus || shieldText || name || mageArmorText) {
                    acText += ' (' + this.createSimpleList([magicalBonus + name, shieldText, mageArmorText]) + ')';// +stealthDis?;
                }
            }
            return acText.toLowerCase();
        },

        //Hit Points
        getHP: function() {
            let type = this.value.hitPoints.diceType;
            let amount = this.value.hitPoints.diceAmount;
            let additionalHP = this.value.hitPoints.additional > 0 ? Math.floor(this.value.hitPoints.additional) : 0;
            if(additionalHP > 9999) {
                this.value.hitPoints.additional = additionalHP = 9999;
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
            let type = this.value.hitPoints.diceType;
            let amount = this.value.hitPoints.diceAmount;
            let additionalHP = this.value.hitPoints.additional > 0 ? Math.floor(this.value.hitPoints.additional) : 0;
            if(additionalHP > 9999) {
                this.value.hitPoints.additional = additionalHP = 9999;
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
        damageResistanceText: function() {   
            return this.damageList(this.value.damageResistances).toLowerCase();
        },
        damageImmunitiesText: function() { 
            return this.damageList(this.value.damageImmunities).toLowerCase();
        },
        damageVulnerabilitiesText: function() { 
            return this.damageList(this.value.damageVulnerabilites).toLowerCase();
        },
        conditionImmunitiesText: function() {
            return this.conditionList(this.value.conditionImmunities).toLowerCase();
        },
        
        eligableDamageTypes: function() {
            let list = [];
            for(let i in this.f5.damagetypes) {
                if(
                    this.value.damageResistances.includes(i) ||
                    this.value.damageImmunities.includes(i) ||
                    this.value.damageVulnerabilites.includes(i)
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
            for(let i in this.value.speeds) {
                if(!this.value.speeds[i]) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }
                if(!this.f5.speeds[i]['hide_name']) {
                    displayText += this.f5.speeds[i].name.toLowerCase()+' ';
                }
                displayText += this.value.speeds[i]+' '+this.measure.measureUnit; 
                if(i === 'fly' && this.value.hover) {
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
            for(let i in this.value.senses) {
                if(!this.value.senses[i].distance) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }
                if(!this.f5.senses[i]['hide_name']) {
                    displayText += this.f5.senses[i].name.toLowerCase()+' ';
                }
                displayText += this.value.senses[i].distance+' '+this.measure.measureUnit;
                
                if(this.value.senses[i].modifier) {
                    displayText += '('+this.f5.senses[i].modifier_name.toLowerCase()+')';
                }
            }

            //Passive Perception
            //if(this.value.skills.includes('perception')) {
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5.misc.passive_skill.replace(':skill', this.f5.skills['perception'].name)+' '+(this.calcSkillMod('perception')+10);
            //}
            return displayText;
        },

        //Subtypes
        orderedSubtypes: function() {
            if(this.f5.creaturetypes.hasOwnProperty(this.value.type) && this.f5.creaturetypes[this.value.type]['subtypes']) {
                let topSubtypes = [];
                let count = 0;

                for (let i in this.f5.creaturesubtypes) {
                    
                    let subtypeObj = this.f5.creaturesubtypes[i];
                    subtypeObj.id = i;

                    if(this.f5.creaturetypes[this.value.type]['subtypes'].includes(i)) {
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

            if(this.f5.creaturetypes.hasOwnProperty(this.value.type) && this.f5.creaturetypes[this.value.type].hasOwnProperty('options')) {
                for (let i in this.f5.creaturetypes[this.value.type]['options']) {
                    let data = this.f5.creaturetypes[this.value.type]['options'][i];
                    data.id = i;
                    optionsList.push(data);
                }
            }

            if(this.f5.creaturesubtypes.hasOwnProperty(this.value.subtype) && this.f5.creaturesubtypes[this.value.subtype].hasOwnProperty('options')) {
                for (let i in this.f5.creaturesubtypes[this.value.subtype]['options']) {
                    let data = this.f5.creaturesubtypes[this.value.subtype]['options'][i];
                    data.id = i;
                    optionsList.push(data);
                }
            }
            return optionsList;
        },

        //Languages
        languageText: function() {
            let displayText = '';

            if(this.value.languages.spokenWritten.includes('all')) {
                return this.f5.languages['all'].name;
            }

            for(let lang of this.value.languages.spokenWritten) {
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5.languages[lang].name; 
            }

            if(this.value.languages.telepathy) {
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5.misc.telepathy+' '+this.value.languages.telepathy +' '+ this.measure.measureUnit;
            }

            //No Languages
            if(!displayText) {
                displayText = this.f5.misc.languages_none;
            }
            return displayText;
        },

        //Skills
        skillText: function() {
            let displayText = '';

            for(let skill in this.f5.skills) {
                if(!this.value.skills.includes(skill)) {
                    continue;
                }
                if(this.calcSkillMod(skill) == 0) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }

                displayText += this.f5.skills[skill].name + ' '+this.addPlus(this.calcSkillMod(skill)); 
            }
            return displayText;
        },

        //Saving Throw
        savingThrowText: function() {
            let displayText = '';

            for(let i in this.value.savingThrows) {
                if(!this.value.savingThrows[i]) {
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
            return this.addPlus(this.proficiency);
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

        //Legendary, Mythic, and Lair Actions
        legendaryActionText: function() {
            let legendaryActionText = this.pluralize(this.f5.misc.legendary_action_desc, this.value.legendaryActions);

            let creatureName = this.value.name.toLowerCase();
            if(this.value.isNameProperNoun) {
                legendaryActionText = legendaryActionText.replace(/the :creature_name/ig, this.capitalize(creatureName));
                legendaryActionText = legendaryActionText.replaceAll(':creature_name', this.capitalize(creatureName));
            } else {
                legendaryActionText = legendaryActionText.replaceAll(':creature_name', creatureName);
            }
            legendaryActionText = legendaryActionText.replaceAll(':legendary_action_count', this.value.legendaryActions);

            return legendaryActionText;
        },

        mythicActionText: function() {
            let mythicActionText = this.f5.misc.mythic_action_desc;
            let creatureName = this.value.name.toLowerCase();
            if(this.value.isNameProperNoun) {
                mythicActionText = mythicActionText.replace(/the :creature_name/ig, this.capitalize(creatureName));
                mythicActionText = mythicActionText.replaceAll(':creature_name', this.capitalize(creatureName));
            } else {
                mythicActionText = mythicActionText.replaceAll(':creature_name', creatureName);
            }
            mythicActionText = mythicActionText.replaceAll(':mythic_trait_name', "MYTHIC TRAIT NAME GOES HERE");

            return mythicActionText;
        },

        ///////////////// NEW FEATURE /////////////////
        // newFeatureAttackText: function() {
        //     let abilityMod = this.getAbilityMod(this.newFeature.attack.ability);
        //     let displayText = '<span class="i">';
        //     if(this.newFeature.attack.meleeRanged == 'meleeranged') {
        //         displayText += 'Melee or Ranged';
        //     } else if(this.newFeature.attack.meleeRanged == 'melee') {
        //         displayText += 'Melee';
        //     } else if(this.newFeature.attack.meleeRanged == 'ranged') {
        //         displayText += 'Ranged';
        //     }
        //     if(this.newFeature.attack.weaponSpell == 'weapon') {
        //         displayText += ' Weapon ';
        //     } else if(this.newFeature.attack.weaponSpell == 'spell') {
        //         displayText += ' Spell ';
        //     }
        //     displayText += 'Attack:</span> +';
        //     displayText += (abilityMod+this.proficiency);
        //     displayText += ' to hit';

        //     if(this.newFeature.attack.meleeRanged !== 'ranged') {
        //         displayText += ', reach '+this.newFeature.attack.reach+' '+this.measure.measureUnit;
        //         displayText += ', '+this.newFeature.attack.targets+' target';
        //         if(this.newFeature.attack.targets !== 1) {
        //             displayText += 's';
        //         }
        //     }

        //     if(this.newFeature.attack.meleeRanged !== 'melee') {
        //         displayText += ', range ';
        //         displayText += this.newFeature.attack.rangeShort;
        //         if(this.newFeature.attack.rangeLong > this.newFeature.attack.rangeShort) {
        //             displayText += '/'+this.newFeature.attack.rangeLong;
        //         }
        //         displayText += ' '+this.measure.measureUnit;
        //         displayText += ', '+this.newFeature.attack.targets+' target';
        //         if(this.newFeature.attack.targets !== 1) {
        //             displayText += 's';
        //         }
        //     }

        //     displayText += '. <span class="i">Hit: </span> (';
        //     displayText += this.newFeature.attack.diceAmount+'d'+this.newFeature.attack.damageDice;
        //     if(abilityMod > 0) {
        //         displayText += ' + '+abilityMod;
        //     } else if(abilityMod < 0) {
        //         displayText += ' - '+(abilityMod*-1);
        //     } 
        //     displayText += ')';

        //     return displayText;
        // },

        // newFeatureSpellText: function() {
        //     let displayText = '';

        //     return displayText;
        // },

        casterLevel: function() {
            let casterLevel = this.value.hitPoints.diceAmount;
            return casterLevel;
        },

        proficiency: function() {
            let proficiency = 2; //Default

            if(this.value.manualOverride.proficiency > 1) {
                return this.value.manualOverride.proficiency;
            }

            let cr = this.f5.challengerating[this.toCRFormat(this.averageCR)];
            if(cr && cr.prof > 0) {
                proficiency = cr.prof;
            }

            return proficiency;
        },
        
        playerChanceToHit: function() {
            let levelData = this.f5.playerlevels[this.playerData.level];
            let toHitModifier = levelData.proficiency + levelData.average_modifier;
            let hitChance = ( 21 - ( this.getAC - (toHitModifier) )) / 20;
            return hitChance;
        },

        statblockPlayerData: function() {
            let sbPlayerData = this.playerData;
            sbPlayerData.hit_chance = this.playerChanceToHit;
            return sbPlayerData;
        },
        
        hasInstantKillPotential: function() {
            //TODO
            let playerHP = this.f5.playerlevels[this.playerData.level].average_hp;
            //if(this.maxDPR > playerHP) {
                //Make maxDPR
                //return true;
            //}
            return false;
        },
        featureCount: function() {
            let count = 0;
            for(let type in this.value.features) {
                count += this.value.features[type].length;
            }
            return count;
        },
    },





    methods: {

        createDefaultAbilityScores: function() {
            let abilities = {};
            for(let ability in this.f5.abilities) {
                abilities[ability] = 10;
            }
            return abilities;
        },
        createDefaultSavingThrows: function() {
            let savingThrows = {};
            for(let ability in this.f5.abilities) {
                savingThrows[ability] = false;
            }
            return savingThrows;
        },
        createDefaultSenses: function() {
            let senses = {};
            for(let sense in this.f5.senses) {
                senses[sense] = {
                    distance: 0,
                    modifier: false,
                };
            }
            return senses;
        },
        createDefaultLanguages: function() {
            let languages = {
                spokenWritten: [],
                doesntSpeak: [],
                telepathy: 0,
            };
            for(let lang in this.f5.languages) {
                if(this.f5.languages[lang]['default']) {
                    languages.spokenWritten.push(lang);
                }
            }
            return languages;
        },
        createDefaultSpeeds: function() {
            let speeds = {};
            for(let speed in this.f5.speeds) {
                if(this.f5.speeds[speed]['default']) {
                    speeds[speed] = this.f5.speeds[speed]['default'];
                } else {
                    speeds[speed] = 0;
                }
            }
            return speeds;
        },


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
            if(type != "resistance" && this.value.damageResistances[i]) {
                this.value.damageResistances[i] = false;
            }
            if(type != "immunity" && this.value.damageImmunities[i]) {
                this.value.damageImmunities[i] = false;
            }
            if(type != "vulnerability" && this.value.damageVulnerabilites[i]) {
                this.value.damageVulnerabilites[i] = false;
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
                return this.f5[list]['all'].name;
            }

            for(let i in this.value[list]) {
                if(!this.value[list][i]) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5[list][i].name; 
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
                this.value.armorClass.type && 
                this.f5.armor[this.value.armorClass.type] && 
                this.f5.armor[this.value.armorClass.type].str_requirement && 
                this.abilities.str < this.f5.armor[this.value.armorClass.type].str_requirement
            ) {
                //TODO CREATE WARNING
            }
        },

        calcSkillMod: function (skill) {
            let ability = this.f5.skills[skill].ability;
            let abilityMod = this.getAbilityMod(ability);
            if(this.value.skills.includes(skill)) {
                abilityMod += this.proficiency;
            }
            return abilityMod;
        },

        calcAbilityMod: function (abilityScore) {
            let mod = Math.floor((abilityScore-10)/2);
            return mod;
        },

        getAbilityMod: function (ability) {
            let score = this.value.abilities[ability];
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
            this.value.features[type].push({trackingId: this.$parent.randChars(15)});
        },

        removeFeature: function(type, id) {
            for(let i in this.value.features[type]) {
                if(this.value.features[type][i].id === id) {
                    this.value.features[type].splice(i, 1);
                    return;
                }
            }
        },

        averageDamage: function(damageObj, ability = 0, useMax = false) { //ability accepts Number or ability name
            let abilityDamage = 0;
            if(typeof ability === 'string' && damageObj.abilityBonus) {
                abilityDamage = Number(this.getAbilityMod(ability));
                if(Number.isNaN(abilityDamage)) {
                    abilityDamage = 0;
                }
            } else if(typeof ability === 'number') {
                abilityDamage = Number(ability);
            }
            let additional = (damageObj.additional) ? Number(damageObj.additional) : 0;
            let damage;
            if(useMax) {
                damage = Math.floor(damageObj.diceType * damageObj.diceAmount) + additional + Number(abilityDamage);
            } else {
                damage = Math.floor(((damageObj.diceType / 2) + .5) * damageObj.diceAmount) + additional + Number(abilityDamage);
            }
            return damage > 0 ? damage : 1;
        },

        createDamageText: function(damageObj, ability) {
            let descText = '';
            if(damageObj.diceAmount > 0) {
                descText += this.averageDamage(damageObj, ability);
                descText += ' ('+this.f5.misc.die_structure.replace(':die_amount', damageObj.diceAmount).replace(':die_type', damageObj.diceType);

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
            descText += this.f5.misc.damage.replace(':type', this.f5.damagetypes[damageObj.type].name.toLowerCase());
            return descText;
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

        createSimpleList: function(input, allowEmpty = false) {
            let len = input.length;
            if(isNaN(len)) {
                if(!isNaN(Object.keys(input).length)) {
                    len = Object.keys(input).length;
                }
            }
            let descText = '';
            for(let i in input) {
                if(input[i] || allowEmpty) {
                    if(descText) {;
                        descText += this.f5.misc.sentence_list_separator+' ';
                    }
                    descText += input[i];
                }
            }
            return descText;
        },

        pluralize: function(str, pluralCount = 1) {
            let pluralBreak = str.indexOf('|');
            if(pluralBreak < 0) {
                return str;
            }
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
            let lastDigit = String(num).slice(-1);

            if(lastDigit == 1 && num != 11) {
                ordinal = this.f5.misc.ordinal_one;
            } else if(lastDigit == 2 && num != 12) {
                ordinal = this.f5.misc.ordinal_two;
            } else if(lastDigit == 3 && num != 13) {
                ordinal = this.f5.misc.ordinal_three;
            } else {
                ordinal = this.f5.misc.ordinal_other;
            }

            return String(num)+ordinal;
        }, 

        numberOfTimesSemantics: function(num) {
            if(num == 1) {
                return this.f5.misc.once;
            }
            if(num == 2) {
                return this.f5.misc.twice;
            }
            return this.f5.misc.three_or_more_times.replace(':number_of_times', num);
        },

        numberToWord: function(num) {
            let words = [
                this.f5.misc.zero, 
                this.f5.misc.one, 
                this.f5.misc.two, 
                this.f5.misc.three,
                this.f5.misc.four,
                this.f5.misc.five,
                this.f5.misc.six,
                this.f5.misc.seven,
                this.f5.misc.eight,
                this.f5.misc.nine,
                this.f5.misc.ten,
            ];

            if(words[num]) {
                return words[num];
            }

            return num;
        },

        determineIndefiniteArticle: function(str, ordinalNum = false) {
            let vowels = ['a', 'e', 'i', 'o', 'u'];
            let vowelNumbers = [1,8,11,18]; //ignoring 80+
            if(ordinalNum) {
                vowelNumbers = [8,11,18];
            }
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
            let targets = this.f5.areaofeffect[targetType].targets_at_30;
            if(targets > 1) {
                targets = (targets/(distanceBaseline*2)) * (distanceBaseline + this.value.aoeRange); //basic formula to assume average number of targets hit
                if(targets > this.playerData.number) {
                    targets = this.playerData.number;
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

        toCRFormat: function(input) {
            if(input > 0 && input < 1) {
                let compareToHalf = input - .5;
                compareToHalf = (compareToHalf >= 0) ? compareToHalf : compareToHalf * -1;
                let compareToQuarter = input - .25;
                compareToQuarter = (compareToQuarter >= 0) ? compareToQuarter : compareToQuarter * -1;
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
            return Math.round(input);
        },

        exportMonster: function() {
            let cloneOptions = JSON.parse(JSON.stringify(this.value));
            delete cloneOptions.averageDPR;
            delete cloneOptions.damageProjection;
            for(let featureType in cloneOptions.features) {
                for(let feature of cloneOptions.features[featureType]) {
                    delete feature.averageDPR;
                    delete feature.damageProjection;
                }
            }
        },

        getFeatureById: function(id, types = null) {
            let featureTypes = this.value.features.keys();
            if(typeof types === 'array') {
                featureTypes = types;
            }
            for(let featureType in featureTypes) {
                if(this.value.features.hasOwnProperty(featureType)) {
                    for(let feature of this.value.features[featureType]) {
                        if(feature.id === id) {
                            return feature;
                        }
                    }
                }
            }
        },

        featureIsMounted: function() {
            this.mountedFeatures++;
            if(this.featureCount === this.mountedFeatures) {
                if(this.$refs.multiattack_features && this.$refs.multiattack_features.length) {
                    for(const feature of this.$refs.multiattack_features) {
                        feature.forceProjectionUpdate();
                    }
                }
                this.damageUpdateIncrementer++;
            }
        },
        
        toNumber: function(input) {
            if(String(input).includes('/')) {
                let divideArray = input.split('/');
                input = divideArray[0] / divideArray[1];
            }
            return Number(input);
        },
    }
}