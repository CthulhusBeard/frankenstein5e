import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js';

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
                mythicTrait: {
                    name: this.f5.misc.title_mythic_feature_name,
                    description: this.f5.misc.mythic_action_feature,
                    recharge: 'short_rest',
                    restoreHitPoints: true,
                },
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
            },
            generatedProjection: {},
        }
    },

    created() {
        for(let prop in this.initialStatblock) {
            if(prop === 'id' || prop === 'trackingId') continue;
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


        //Challenge Rating
        damageCr: function() {
            let dpr = 0;
            if(
                this.generatedProjection[0] && 
                this.generatedProjection[0].hasOwnProperty('damage')
            ) {
                dpr = this.generatedProjection[0].damage;
            }
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

            //Double health for mythic encounters
            if(this.value.features.mythic_action.length && this.value.mythicTrait.restoreHitPoints) {
                hp = hp * 2;
            }

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
            armorCr = armorCr.toString().replace('> ','');
            if(String(armorCr).includes('-')) {
                let splitArmor = armorCr.split('-');
                armorCr = this.toNumber(this.toNumber(splitArmor[0]) + this.toNumber(splitArmor[1])) / 2;
            }
            let defensiveCr = (Number(armorCr) + this.toNumber(this.healthCr)) / 2;

            let average = (defensiveCr + this.toNumber(this.damageCr)) / 2;

            //Extra modifiers
            if(average < 10 && this.value.speeds['fly'] > 0) {
                //Flying monsters with CR below 10 are considered effectively 2 AC higher
                average = average + 2;
            }

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
            this.$emit('update-ac', this.trackingId, acValue);
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
            
            this.$emit('update-hp', this.trackingId, hp);

            return hp;
        },

        // getEffectiveHP: function() {
        //     let effectiveHP = this.getHP;

        //     if(this.value.features.mythic_action.length && this.value.mythicTrait.restoreHitPoints) {
        //         effectiveHP = effectiveHP * 2;
        //     }
        //TODO: ??  Doesn't take into account regen abilities

        //     return effectiveHP;
        // },
        
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
            let str = this.pluralize(this.f5.misc.legendary_action_desc, this.value.legendaryActions);
            str = this.keyWordReplace(str);
            str = str.replaceAll(':legendary_action_count', this.value.legendaryActions);
            return str;
        },

        mythicActionText: function() {
            let str = this.keyWordReplace(this.f5.misc.mythic_action_desc);
            str = str.replaceAll(':mythic_trait_name', this.value.mythicTrait.name);
            return str;
        },

        mythicTraitTitleText: function() {
            let str = this.value.mythicTrait.name+' ('+this.f5.misc.mythic_trait;
            if(this.value.mythicTrait.recharge == 'long_rest') {
                str += '; '+this.f5.recharge.long_rest.desc;
            } else if(this.value.mythicTrait.recharge == 'short_rest') {
                str += '; '+this.f5.recharge.short_rest.desc;
            }
            str += ')';
            return str;
        },

        mythicTraitDescriptionText: function() {
            let str = this.keyWordReplace(this.value.mythicTrait.description);
            return str;
        },

        lairActionText: function() {
            let str = this.keyWordReplace(this.f5.misc.lair_action_desc);
            return str;
        },

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

        averageDPR: function() {
            if(
                this.generatedProjection[0] && 
                this.generatedProjection[0].hasOwnProperty('damage')
            ) {
                 return this.generatedProjection[0].damage;
            }
            return 0;
        },

        maxDPR: function() {
            if(
                this.generatedProjection[0] && 
                this.generatedProjection[0].hasOwnProperty('maxDamage')
            ) {
                 return this.generatedProjection[0].maxDamage;
            }
            return 0;
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
                if(this.value.features[type][i].trackingId === id) {
                    this.value.features[type].splice(i, 1);
                    return;
                }
            }
        },

        moveFeatureUp: function(type, id) {
            for(let i in this.value.features[type]) {
                if(this.value.features[type][i].trackingId === id) {
                    if(i !== 0) {
                        this.swapFeatures(type, (parseInt(i)-1), i);
                    }
                    return;
                }
            }
        },

        moveFeatureDown: function(type, id) {
            for(let i in this.value.features[type]) {
                if(this.value.features[type][i].trackingId === id) {
                    if(i !== this.value.features[type].length) {
                        this.swapFeatures(type, i, (parseInt(i)+1));
                    }
                    return;
                }
            }
        },

        swapFeatures: function(type, featIndex1, featIndex2) {
            this.value.features[type].splice(featIndex1, 0, this.value.features[type].splice(featIndex2, 1)[0])
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
            if(damageObj.hasOwnProperty('type')) {
                descText += this.f5.misc.damage.replace(':type', this.f5.damagetypes[damageObj.type].name.toLowerCase());
            }
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

        // morphFeatureProjection: function(featureProjection) {
        //     return featureProjection;
        // },

        // mergeProjections: function(monsterProjection, inject, featureProjection) {
        //     return monsterProjection.splice(inject, 0, this.morphFeatureProjection(featureProjection));
        // },

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
            console.log('Export Monster');
            console.log(cloneOptions);
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
        },
        
        toNumber: function(input) {
            if(String(input).includes('/')) {
                let divideArray = input.split('/');
                input = divideArray[0] / divideArray[1];
            }
            return Number(input);
        },

        updateFeatureName: function(type, id, name) {
            for(let feature of this.value.features[type]) {
                if(feature.trackingId == id) {
                    feature.name = name;
                }
            }
        },

        updateProjections: function(type, id, projection) {
            let changesMade = false;
            for(let feature of this.value.features[type]) {
                if(feature.trackingId == id && feature.damageProjection != projection) {
                    feature.damageProjection = projection;
                    feature.averageDPR = projection.damage; //TODO: Do we need these? probably not
                    feature.maxDPR = projection.maxDamage;
                    changesMade = true;
                }
            }

            //Set referencing actions
            let referencableActions = ['multiattack', 'legendary_action', 'mythic_action'];
            if(!referencableActions.includes(type)) {
                for(let actionType of referencableActions) {
                    if(Array.isArray(this.$refs['features_'+actionType])) {
                        for(let feature of this.$refs['features_'+actionType]) {
                            if(feature.value.existingFeatureReferenceId == id) {
                                feature.referencedProjection = projection;
                                //TODO: Is this happening here? Should it?
                                console.log('referencableActions -> !!');
                            }
                        }
                    }
                }
            }

            //Emit updates on change
            if(changesMade) {
                let mythicHealthRestore = false;
                if(this.value.features.mythic_action.length && this.value.mythicTrait.restoreHitPoints) {
                    mythicHealthRestore = true;
                }
    
                let statblockProjection = this.getDamageProjection();
                this.generatedProjection = statblockProjection;
                this.$emit('update-projections', this.trackingId, statblockProjection, mythicHealthRestore);
            }
        },

        getAverageDPR: function() {
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
                    if(!feature.damageProjection) {
                        continue;
                    }

                    let dprType = featureType;
                    if(dprType === 'mythic_action') {
                        dprType = 'legendary_action';
                    } else if(dprType === 'spellcasting' || dprType === 'multiattack') {
                        dprType = 'action';
                    }

                    if(feature.damageProjection[0].damage > dprGroups[dprType]) {
                        dprGroups[dprType] = feature.damageProjection[0].damage;
                    }
                }
            }

            //TODO: This doesn't take into consideration multiple actions/legendary actions etc

            let dpr = Object.values(dprGroups).reduce((a, b) => a + b);
            return dpr;
        },

        getMaxDPR: function() {
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
                    if(!feature.damageProjection) {
                        continue;
                    }

                    let dprType = featureType;
                    if(dprType === 'mythic_action') {
                        dprType = 'legendary_action';
                    } else if(dprType === 'spellcasting' || dprType === 'multiattack') {
                        dprType = 'action';
                    }

                    if(feature.damageProjection[0].maxDamage > dprGroups[dprType]) {
                        dprGroups[dprType] = feature.damageProjection[0].maxDamage;
                    }
                }
            }

            let dpr = Object.values(dprGroups).reduce((a, b) => a + b);
            return dpr;
        },

        getDamageProjection: function() {

            let referencableProjections = [];
            let referencingProjections = [];

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
                mythic_action: {
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
                    count: 1000, //big number to let as many passive features through as possible
                    rounds: [],
                    options: [],
                },
            };

            //Gather Projections
            let mergeActions = {
                'multiattack': 'action',
                'spellcasting': 'action',
            };

            for(const featureType in this.value.features) {
                for(const feature of this.value.features[featureType]) {
                    if(!feature.damageProjection) {
                        continue;
                    }

                    //Build reference lookups
                    if(this.getProjectionReferences(feature.damageProjection).length > 0) {
                        referencingProjections.push(feature.damageProjection); 
                    } else {
                        referencableProjections[feature.trackingId] = feature.damageProjection;
                    }

                    //Merge similar action types
                    let actionType = featureType; //Do this so we don't change the iterator when we change the type
                    if(mergeActions.hasOwnProperty(actionType)) {
                        actionType = mergeActions[actionType];
                    }
                    if(Array.isArray(feature.damageProjection)) {
                        for(let i in feature.damageProjection) {
                            projections[actionType].options.push(feature.damageProjection[i]); 
                        }
                    } else {
                        projections[actionType].options.push(feature.damageProjection);  
                    }
                }
            }

            //Fill out referenced projections
            if(referencingProjections.length) {
                for(let projection of referencingProjections) {
                    this.fillReferencingProjections(projection, referencableProjections);
                }
            }

            //Mythic actions are linked to legendary actions
            if(projections['mythic_action'].options.length && projections['legendary_action'].options.length) {
                projections['mythic_action'].options.push(...projections['legendary_action'].options)
            }


            //console.log('Projections Data');
            //console.log(JSON.parse(JSON.stringify(projections)));


            //Simulate combat rounds
            //console.log('Simulate combat rounds');
            for(let actionType in projections) {
                if(!projections[actionType].options.length) {
                    delete projections[actionType];
                    continue;
                }

                //Simulate rounds of combat
                for(let roundNum = 0; roundNum < this.combatRounds; roundNum++) {

                    //Start of turn
                    for(let projection of projections[actionType].options) {
                        if(roundNum === 0) {
                            this.resetProjection(projection);
                        }
                        this.prepareProjectionFields(projection);
                        this.incrementProjectionTurn(projection); //Increments cooldowns etc
                    }

                    console.log('---start round '+roundNum);
                    console.log(actionType);
                    console.log(JSON.parse(JSON.stringify(projections[actionType])));

                    //Sort by most damage
                    projections[actionType].options = projections[actionType].options.sort(function (a, b) {
                        return b.damagePerAction - a.damagePerAction;
                    });

                    let actionCount = 0; //Counts the actions spent
                    for(let j = 0; j < projections[actionType].options.length; j++) {
                        let projection = projections[actionType].options[j];

                        //check if usable
                        let isUsable = this.isProjectionUsable(projection);

                        if(!isUsable) {
                            continue;
                        }

                        //Check if action fits within alotted actions (e.g. If it costs 2 Legendary actions but you only have 1 left)
                        let actionCost = (projection && projection.actionCost) ? projection.actionCost : 0;
                        if(actionCount + actionCost <= projections[actionType].count) {
                            //Action fits
                            if(projection) {
                                //Add action
                                if(!projections[actionType].rounds[roundNum]) {
                                    projections[actionType].rounds[roundNum] = [];
                                }
                                projections[actionType].rounds[roundNum].push(JSON.parse(JSON.stringify(projection))); //Copy a clone of the feature in its current state
                                actionCount += actionCost;

                                //Sets cooldowns and decrements "uses" for limited use features
                                this.useFeature(projection);

                                //If this action fits again (and it's not a passive or on a cooldown), 
                                //  decrement the interator variable to use it again
                                if(
                                    actionType != 'passive' && 
                                    !projection.hasOwnProperty('rechargeCooldown') && 
                                    actionCount + actionCost <= projections[actionType].count
                                ) { 
                                    j--;
                                }
                            } else if(projection) {
                                //Not enough actions
                                actionCount += projections[actionType].count;
                            }
                        }
                    }
                    
                }
            }


            //Create turn totals and action list
            let totals = [];
            let hasMythicActions = (projections.hasOwnProperty('mythic_action'));
            for(let actionType in projections) { 
                for(let roundNum = 0; roundNum < this.combatRounds; roundNum++) {
                    if(!projections[actionType].rounds[roundNum]) {
                        continue;
                    }
                    for(let featureObj of projections[actionType].rounds[roundNum]) {
                        if(!totals[roundNum]) {
                            totals[roundNum] = {
                                standardTurn: {
                                    abilities: {},
                                    damage: 0, 
                                    maxDamage: 0,
                                    regenerate: 0,
                                },
                            };
                            if(hasMythicActions) {
                                totals[roundNum].mythicTurn = {
                                    abilities: {},
                                    damage: 0, 
                                    maxDamage: 0,
                                    regenerate: 0,
                                }
                            }
                        }

                        if(
                            featureObj && 
                            (featureObj.damage && featureObj.damage > 0) ||
                            (featureObj.regenerate && featureObj.regenerate > 0) 
                        ) {

                            //Add This Action to Standard Turns
                            if(actionType != 'mythic_action') {
                                if(!totals[roundNum]['standardTurn'].abilities[actionType]) {
                                    totals[roundNum]['standardTurn'].abilities[actionType] = [];
                                }
                                totals[roundNum]['standardTurn'].abilities[actionType].push(featureObj);
                                if(featureObj.damage) {
                                    totals[roundNum]['standardTurn'].damage += featureObj.damage;
                                    totals[roundNum]['standardTurn'].maxDamage += featureObj.maxDamage;
                                }
                                if(featureObj.regenerate) {
                                    totals[roundNum]['standardTurn'].regenerate += featureObj.regenerate;
                                }
                            }

                            //Add This Action to Mythic Turns
                            if(hasMythicActions && actionType != 'legendary_action') {
                                if(!totals[roundNum]['mythicTurn'].abilities[actionType]) {
                                    totals[roundNum]['mythicTurn'].abilities[actionType] = [];
                                }
                                totals[roundNum]['mythicTurn'].abilities[actionType].push(featureObj);
                                if(featureObj.damage) {
                                    totals[roundNum]['mythicTurn'].damage += featureObj.damage;
                                    totals[roundNum]['mythicTurn'].maxDamage += featureObj.maxDamage;
                                }
                                if(featureObj.regenerate) {
                                    totals[roundNum]['mythicTurn'].regenerate += featureObj.regenerate;
                                }
                            }
                        }
                    }
                }
            }
            
            console.log('totals');
            console.log(totals);
            // console.groupEnd();

            return totals;
        },

        isProjectionUsable: function(projection) { //takes projection object
            if(!projection) {
                return false;
            }

            //no uses
            if(projection.hasOwnProperty('remainingUses') && projection.remainingUses <= 0) {
                return false;
            }
            //on cooldown
            if(projection.hasOwnProperty('rechargeTurns') && projection.hasOwnProperty('rechargeCooldown') && projection.rechargeTurns > projection.rechargeCooldown) {
                return false;
            }

            //check references
            if(projection.hasOwnProperty('references')) {
                for(let ref of projection.references) {
                    if(!ref || !ref.hasOwnProperty('feature') || !ref.feature || !this.isProjectionUsable(ref.feature)) {
                        return false;
                    }
                }
            }

            //recursively check nested projections
            if(Array.isArray(projection)) {
                let usable = 0;
                for(let projChild of projection) {
                    if(this.isProjectionUsable(projChild)) {
                        usable++;
                    }
                }
                if(usable === 0) {
                    return false;
                }
            }

            return true;
        },

        incrementProjectionTurn: function(projection) {
            if(projection.hasOwnProperty('rechargeTurns')) {
                if(!projection.hasOwnProperty('rechargeCooldown')) {
                    projection.rechargeCooldown = projection.rechargeTurns;
                }
                if(projection.rechargeCooldown !== projection.rechargeTurns) {
                    projection.rechargeCooldown++;
                }
            }
        },

        resetProjection: function(projection) {
            if(projection.hasOwnProperty('rechargeTurns')) {
                projection.rechargeCooldown = projection.rechargeTurns;
            }
            if(projection.hasOwnProperty('totalUses')) {
                projection.remainingUses = projection.totalUses;
            }
        },

        prepareProjectionFields: function(projection) {
            if(!projection) {
                return;
            }

            let damage = 0;
            let maxDamage = 0;
            let nameList = [];
            
            if(projection.hasOwnProperty('references')) {
                for(let refProjection of projection.references) {
                    if(refProjection.hasOwnProperty('feature') && refProjection.feature) {
                        let uses = 1;
                        if(refProjection.hasOwnProperty('uses')) { 
                            uses = refProjection.uses;
                        }

                        //If features are an array (spellcasting)
                        if(Array.isArray(refProjection.feature)) {
                            for(let featureRef of refProjection.feature) {
                                this.prepareProjectionFields(featureRef);
                            }
                            refProjection.feature = refProjection.feature.sort(function (a, b) {
                                return b.damagePerAction - a.damagePerAction;
                            });
                            let totalFeatureUses = 0;
                            for(let featureRef of refProjection.feature) {
                                let featureUses = uses - totalFeatureUses;
                                if(
                                    featureRef.hasOwnProperty('rechargeTurns') && 
                                    featureRef.hasOwnProperty('rechargeCooldown')
                                ) {
                                    if(featureRef.rechargeTurns > featureRef.rechargeCooldown) {
                                        featureUses = 0;
                                    } else {
                                        featureUses = 1; //It'll get put on cooldown as soon as it's used the first time
                                    }
                                }
                                if(featureRef.hasOwnProperty('remainingUses')) { 
                                    featureUses = featureRef.remainingUses;
                                    if(featureUses > uses) {
                                        featureUses = uses;
                                    }
                                }
                                totalFeatureUses += featureUses;
                                damage += featureRef.damage * featureUses;
                                maxDamage += featureRef.maxDamage * featureUses;
                                if(totalFeatureUses > 0) {
                                    nameList.push(featureRef.name);
                                }

                                if(totalFeatureUses >= uses) {
                                    break;
                                }
                            }
        
                        } else {
                            if(refProjection.feature.hasOwnProperty('remainingUses') && refProjection.feature.remainingUses < uses) {
                                uses = refProjection.feature.remainingUses;
                            }
                            this.prepareProjectionFields(refProjection.feature);
                            damage += refProjection.feature.damage * uses;
                            maxDamage += refProjection.feature.maxDamage * uses;
                            if(uses > 0) {
                                nameList.push(refProjection.feature.name);
                            }
                        }
                    }
                }
                projection.damage = damage;
                projection.maxDamage = maxDamage;
            } 
            
            //Set multiattack name
            if(projection.multiattack) {
                projection.name = this.f5.misc.title_multiattack+': '+nameList.join(' / ');
            }
            
            projection.damagePerAction = projection.damage / projection.actionCost;
            return;
            
        },

        getProjectionReferences: function(projection) {
            let references = [];
            if(Array.isArray(projection)) {
                for(let proj of projection) {
                    if(proj.hasOwnProperty('references')) {
                        references.push(proj.references.id);
                    }
                }
            } else if(projection.hasOwnProperty('references')) {
                references.push(projection.references.id);
            }
            return references;
        },

        fillReferencingProjections: function(projection, references) {
            //fill references
            if(Array.isArray(projection)) {
                for(let projectionOption of projection) {
                    this.fillReferencingProjections(projectionOption, references);
                }
            } else {
                for(let reference of projection.references) {
                    if(references[reference.id]) {
                        reference.feature = references[reference.id];
                    }
                }
            }
        },
        
        useFeature: function(feature) {
            //set uses
            if(feature.hasOwnProperty('remainingUses')) {
                feature.remainingUses--;
            }
            
            //start cooldown
            if(feature.hasOwnProperty('rechargeCooldown')) {
                feature.rechargeCooldown = 0;
            }

            //Recursively run on references
            if(feature.hasOwnProperty('references')) {
                for(let reference of feature.references) {
                    if(reference.hasOwnProperty('feature') && reference.feature) {
                        let uses = 1;
                        if(reference.hasOwnProperty('uses')) { 
                            uses = reference.uses;
                        }
                        if(Array.isArray(reference.feature)) {
                            //TODO stuff here
                            for(let featureRef of reference.feature) {
                                if(featureRef.hasOwnProperty('remainingUses')) { 
                                    //reduce uses
                                    while(featureRef.remainingUses > 0 && uses > 0) {
                                        featureRef.remainingUses--;
                                        uses--;
                                    }
                                }else if(
                                    featureRef.hasOwnProperty('rechargeTurns') && 
                                    featureRef.hasOwnProperty('rechargeCooldown')
                                ) {
                                    if(featureRef.rechargeTurns == featureRef.rechargeCooldown) {
                                        uses--;
                                        featureRef.rechargeCooldown = 0;
                                    }
                                }
                            }
                        } else {
                            this.useFeature(reference.feature);
                        }
                    }
                }
            }
        },

        keyWordReplace: function(str) {
            let creatureName = this.value.name.toLowerCase();
            if(this.value.isNameProperNoun) {
                str = str.replace(/the :creature_name/ig, this.capitalize(creatureName));
                str = str.replaceAll(':creature_name', this.capitalize(creatureName));
            } else {
                str = str.replaceAll(':creature_name', creatureName);
            }

            let keywords = {
            }

            //create ability related string keys
            for(let ability in this.f5.abilities) {
                keywords[':target_save_vs_'+ability] = this.makeSavingThrowDC(ability);
            }

            //create skill related string keys
            for(let skill in this.f5.skills) {
                keywords[':creature_skill_'+skill] = this.calcSkillMod(skill);
            }

            //Replace sting keys
            for(let key in keywords) {
                str = str.replaceAll(key, keywords[key]);
            }

            return str;
        },

        findFeatureById(id, group = null) {
            if(group) {
                for(let feature of this.value.features[group]) {
                    if(feature.trackingId === id) {
                        return feature;
                    }
                }
            } else {
                for(let actionType in this.value.features) {
                    for(let feature of this.value.features[actionType]) {
                        if(feature.trackingId === id) {
                            return feature;
                        }
                    }
                }
            }
            return null;
        },
    }
}