import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js';

const template = require('../html/statblock.html');

export default {
    props: [
        'initialStatblock',
        'playerData',
        'combatRounds',
        'f5', 
        'measure', 
    ],

    template: template,
    
    components: {
        'Multiselect': Multiselect,
        'StatblockFeature': StatBlockFeature,
    },

    data: function() {
        return this.defaultMonsterSettings();
    },

    created() {
        for(let prop in this.initialStatblock) {
            //console.log('import: '+prop);
            if(prop === 'id' || prop === 'trackingId') {
                continue;
            }
            
            if(prop === 'features') {
                for(let actionType in this.initialStatblock.features) {
                    if(this.initialStatblock.features[actionType].length) {
                        for(let feature in this.initialStatblock.features[actionType]) {
                            let trackingId = (this.initialStatblock.features[actionType][feature]['trackingId']) ? this.initialStatblock.features[actionType][feature]['trackingId'] : this.randChars(15) ;
                            delete this.initialStatblock.features[actionType][feature]['trackingId'];
                            this.value.features[actionType].push(
                                {
                                    trackingId: trackingId,
                                    value: this.initialStatblock.features[actionType][feature]
                                }
                            );
                        }
                    }
                }
                continue;
            }

            // console.log(this.value[prop]);
            // console.log(this.initialStatblock[prop]);

            if(typeof this.initialStatblock[prop] === 'object') {
                for(let i in this.initialStatblock[prop]) {
                    this.value[prop][i] = this.initialStatblock[prop][i];
                }
            } else {
                this.value[prop] = this.initialStatblock[prop]; 
            }
        }

        console.log('Done creating stat block');
        console.log(this.clone(this.value));
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

        damageCrWithLair: function() {
            let dpr = this.averageLairDPR;
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
            return this.getHealthCr(1);
        },

        armorCr: function() {
            let crLow = 31;
            let crHigh = 0;
            let ac = this.getBestAC;

            if(!ac) {
                return 'Unset';
            } else if(ac < this.f5.challengerating[0].ac) {
                crLow = 0;
            } else if(ac > this.f5.challengerating[30].ac) {
                return '> 30';
            } else {
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
            }

            //If it has magic resistance, increase AC CR by 2
            for(let passiveFeature of this.value.features.passive) {
                if(passiveFeature.template === 'magic_resistance') {
                    crLow += 2;
                    crHigh += 2;
                    break;
                }
            }

            if(crLow == crHigh) return crLow; 
            return crLow+'-'+crHigh;
        },

        averageCR: function() {
            return this.calcAverageCR();
        },

        averageCRInLair: function() {
            return this.calcAverageCR(true);
        },

        displayCR: function() {
            let cr = this.averageCR;
            let lairCr = this.averageCRInLair;
            
            if(this.value.manualOverride.challengeRating >= 0) {
                cr = this.value.manualOverride.challengeRating;
            }

            return cr;
        },

        displayCRInLair: function() {
            let cr = this.averageCRInLair;

            if(this.value.manualOverride.challengeRatingLair >= 0) {
                cr = this.value.manualOverride.challengeRatingLair;
            }

            //Get XP for emit
            let xp = 0;
            let crData = this.f5.challengerating[cr];
            if(crData && crData.xp) {
                xp = crData.xp;
            }

            return cr;
        },

        //Description Text
        descriptionText: function() {
            let descStr = '';
            if(this.value.size) {
                descStr += this.getProp(this.f5.creaturesizes[this.value.size]);
                //this.value.hitPoints.diceType = this.f5.creaturesizes[this.value.size].hit_dice; 
                //TODO Do this elsewhere
            }
            if(this.value.type) {
                if(descStr != '') descStr += ' '; 
                descStr += this.capitalize(this.getProp(this.f5.creaturetypes[this.value.type]));
            }
            if(this.value.subtypes.length /*|| (this.value.showtypeCategory && this.value.typeCategory)*/) { 

                if(descStr != '') descStr += ' '; 
                descStr += '('
                if(this.value.subtypes.length) {
                    let modifiedList = [];
                    for(let i in this.value.subtypes) {
                        if(this.f5.creaturesubtypes.hasOwnProperty(this.value.subtypes[i])) {
                            modifiedList[i] = this.getProp(this.f5.creaturesubtypes[this.value.subtypes[i]]);
                        } else {
                            modifiedList[i] = this.value.subtypes[i];
                        }
                    }
                    descStr += this.createSimpleList(modifiedList);
                }
                /* TODO Do something with category?
                if(this.value.subtypes && (this.value.showtypeCategory && this.value.typeCategory)) { 
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

        getBestAC: function() {
            let acValue = this.getAC;
            let bestAC = acValue;
            if(this.value.armorClass.mageArmor) {
                let mageArmorAc = 13 + this.getAbilityMod('dex');
                if(this.value.armorClass.shield) {
                    mageArmorAc += 2;
                }
                if(mageArmorAc > acValue) {
                    bestAC = mageArmorAc;
                }
            }
            return bestAC;
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
                        mageArmorText = this.f5.misc.mage_armor.replace(':mage_armor_ac', mageArmorAc);
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

        hpConMod: function() {
            let conMod = this.getAbilityMod('con');
            let conHP = 0;
            if(conMod > 0) {
                conHP = conMod * this.value.hitPoints.diceAmount;
            }
            return conHP;
        },
        
        hitPointsText: function() {
            let type = this.value.hitPoints.diceType;
            let amount = this.value.hitPoints.diceAmount;
            let additionalHP = this.value.hitPoints.additional > 0 ? Math.floor(this.value.hitPoints.additional) : 0;
            if(additionalHP > 9999) {
                this.value.hitPoints.additional = additionalHP = 9999;
            }
            let conHP = this.hpConMod;

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
            return this.damageList(this.value.damageResistances, this.f5.damagetypes).toLowerCase();
        },
        damageImmunitiesText: function() { 
            return this.damageList(this.value.damageImmunities, this.f5.damagetypes).toLowerCase();
        },
        damageVulnerabilitiesText: function() { 
            return this.damageList(this.value.damageVulnerabilites, this.f5.damagetypes).toLowerCase();
        },
        conditionImmunitiesText: function() {
            return this.conditionList(this.value.conditionImmunities, this.f5.conditions).toLowerCase();
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
        
        eligableSkills: function() {
            let list = [];
            for(let i in this.f5.skills) {
                if(
                    this.value.skills.includes(i) ||
                    this.value.expertise.includes(i) 
                ) {
                    list.push({ value: i, label: this.f5.skills[i].name, disabled: true});
                } else {
                    list.push({ value: i, label: this.f5.skills[i].name});
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
                    
                    let subtypeObj = { value: i, label: this.f5.creaturesubtypes[i].name};

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

        // //Type Options
        // typeCategoryList: function() {
        //     let optionsList = [];

        //     if(this.f5.creaturetypes.hasOwnProperty(this.value.type) && this.f5.creaturetypes[this.value.type].hasOwnProperty('options')) {
        //         for (let i in this.f5.creaturetypes[this.value.type]['options']) {
        //             let data = this.f5.creaturetypes[this.value.type]['options'][i];
        //             data.id = i;
        //             optionsList.push(data);
        //         }
        //     }

        //     if(this.f5.creaturesubtypes.hasOwnProperty(this.value.subtypes) && this.f5.creaturesubtypes[this.value.subtypes].hasOwnProperty('options')) {
        //         for (let i in this.f5.creaturesubtypes[this.value.subtypes]['options']) {
        //             let data = this.f5.creaturesubtypes[this.value.subtypes]['options'][i];
        //             data.id = i;
        //             optionsList.push(data);
        //         }
        //     }
        //     return optionsList;
        // },

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
                if(!this.value.skills.includes(skill) && !this.value.expertise.includes(skill)) {
                    continue;
                }
                let skillMod = this.calcSkillMod(skill);
                if(skillMod == 0) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }

                displayText += this.f5.skills[skill].name + ' '+this.addPlus(skillMod); 
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
        crDisplayText: function() {
            let averageCR = this.displayCR;
            let averageCRKey = this.toCRFormat(averageCR);
            let crText = this.f5.misc.display_challenge_rating.replace(':cr', averageCRKey);
            let cr = this.f5.challengerating[averageCRKey];
            if(cr && cr.xp) {
                crText += ' '+this.f5.misc.display_challenge_rating_xp.replace(':xp', cr.xp);
            }
            
            //Lair actions
            let averageCRInLair = this.displayCRInLair;
            let averageCRInLairKey = this.toCRFormat(averageCRInLair);
            if(averageCRInLairKey !== averageCRKey) {
                let crLairText = this.f5.misc.display_challenge_rating_in_lair.replace(':cr', averageCRInLairKey);
                let crInLair = this.f5.challengerating[averageCRInLairKey];
                if(crInLair && crInLair.xp) {
                    crLairText += ' '+this.f5.misc.display_challenge_rating_xp.replace(':xp', crInLair.xp);
                }
                crText += '; '+crLairText;  
            
                this.$emit('update-cr', this.trackingId, cr.cr, cr.xp, crInLair.cr, crInLair.xp);
            } else {
                this.$emit('update-cr', this.trackingId, cr.cr, cr.xp);
            }

            return crText;
        },

        calculatedCrText: function() {
            let averageCR = this.averageCR;
            let averageCRKey = this.toCRFormat(averageCR);
            let crText = this.f5.misc.display_challenge_rating.replace(':cr', averageCRKey);
            let cr = this.f5.challengerating[averageCRKey];
            if(cr && cr.xp) {
                crText += ' '+this.f5.misc.display_challenge_rating_xp.replace(':xp', cr.xp);
            }

            //Lair actions
            let averageCRInLair = this.averageCRInLair;
            let averageCRInLairKey = this.toCRFormat(averageCRInLair);
            if(averageCRInLairKey !== averageCRKey) {
                let crLairText = this.f5.misc.display_challenge_rating_in_lair.replace(':cr', averageCRInLairKey);
                let crInLair = this.f5.challengerating[averageCRInLairKey];
                if(crInLair && crInLair.xp) {
                    crText += ' / '+crLairText+' '+this.f5.misc.display_challenge_rating_xp.replace(':xp', crInLair.xp);
                }
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
            let str = this.value.mythicTrait.name+' ('+this.f5.misc.mythic_trait_name;
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
            if(this.value.manualOverride.casterLevel > 1) {
                return this.value.manualOverride.casterLevel;
            }
            return this.value.hitPoints.diceAmount;
        },

        proficiency: function() {
            let proficiency = 2; //Default

            if(this.value.manualOverride.proficiency > 1) {
                return this.value.manualOverride.proficiency;
            }

            let cr = this.f5.challengerating[this.toCRFormat(this.displayCR)];
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
            let multipleTurnDPR = 0;
            let numberOfTurns = 3;
            for(let i = 0; i < numberOfTurns; i++) {
                if(
                    this.generatedProjection[i] && 
                    this.generatedProjection[i].hasOwnProperty('standardTurn') && 
                    this.generatedProjection[i].standardTurn.hasOwnProperty('damage')
                ) {
                    multipleTurnDPR += this.generatedProjection[i].standardTurn.damage;
                }
            }
            return Math.round(multipleTurnDPR / numberOfTurns);
        },

        averageLairDPR: function() {
            let multipleTurnDPR = 0;
            let numberOfTurns = 3;
            for(let i = 0; i < numberOfTurns; i++) {
                if(
                    this.generatedProjection[i] && 
                    this.generatedProjection[i].hasOwnProperty('standardTurn') && 
                    this.generatedProjection[i].standardTurn.hasOwnProperty('damage')
                ) {
                    multipleTurnDPR += this.generatedProjection[i].standardTurn.damage;
                }
                if(
                    this.generatedProjection[i] && 
                    this.generatedProjection[i].hasOwnProperty('lairActions') && 
                    this.generatedProjection[i].lairActions.hasOwnProperty('damage')
                ) {
                    multipleTurnDPR += this.generatedProjection[i].lairActions.damage;
                }
            }
            return Math.round(multipleTurnDPR / numberOfTurns);
        },

        maxDPR: function() {
            let multipleTurnDPR = 0;
            let numberOfTurns = 3;
            for(let i = 0; i < numberOfTurns; i++) {
                if(
                    this.generatedProjection[i] && 
                    this.generatedProjection[i].hasOwnProperty('standardTurn') && 
                    this.generatedProjection[i].standardTurn.hasOwnProperty('maxDamage')
                ) {
                    multipleTurnDPR += this.generatedProjection[i].standardTurn.maxDamage;
                }
            }
            return Math.round(multipleTurnDPR / numberOfTurns);
        },
    },


    methods: {

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
            if(this.value.expertise.includes(skill)) {
                abilityMod += this.proficiency*2;
            }
            return abilityMod;
        },

        getAbilityMod: function (ability) {
            let score = this.value.abilities[ability];
            return this.calcAbilityMod(score);
        },

        makeSavingThrowDC: function(ability) {
            return (8 + this.proficiency + this.getAbilityMod(ability));
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
                let compareToEighth = input - .125;
                compareToEighth = (compareToEighth >= 0) ? compareToEighth : compareToEighth * -1;

                if(compareToHalf <= compareToQuarter && compareToHalf <= compareToEighth && compareToHalf <= input) {
                    return "1/2";
                } else if(compareToQuarter <= compareToHalf && compareToQuarter <= compareToEighth && compareToQuarter <= input) {
                    return "1/4";
                } else if(compareToEighth <= compareToEighth && compareToEighth <= compareToHalf && compareToEighth <= input) {
                    return "1/8";
                } else {
                    return 0;
                }
            }
            return Math.round(input);
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

        updateFeatureName: function(type, id, name, displayName) {
            for(let feature of this.value.features[type]) {
                if(feature.trackingId == id) {
                    feature.name = name;
                    feature.displayName = displayName;
                }
            }
        },

        updateFeatureDescription: function(type, id, desc) {
            for(let feature of this.value.features[type]) {
                if(feature.trackingId == id) {
                    feature.desc = desc;
                }
            }
        },

        updateFeatureProjections: function(type, template, id, projection) {
            let changesMade = false;
            for(let feature of this.value.features[type]) {
                if(feature.trackingId == id && feature.damageProjection != projection) {
                    feature.damageProjection = projection;
                    feature.averageDPR = projection.damage; //TODO: Do we need these? probably not
                    feature.maxDPR = projection.maxDamage;//TODO: Do we need these? probably not
                    feature.template = template;
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

        getHealthCr: function(multiplier = 1) {
            let hp = this.getHP;
            let approxCr = 31;

            //Double health for mythic encounters
            if(this.value.features.mythic_action.length && this.value.mythicTrait.restoreHitPoints) {
                hp = hp * 2;
            }

            hp = multiplier * hp;

            for(let i in this.f5.challengerating) {
                let cr = this.f5.challengerating[i];
                if(hp >= cr.hp.low && hp <= cr.hp.high) {
                    approxCr = i;
                    break;
                }
            }

            return approxCr;
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
            //console.log(this.clone(projections));


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
                                projections[actionType].rounds[roundNum].push(this.clone(projection)); //Copy a clone of the feature in its current state
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
            let hasLairActions = (projections.hasOwnProperty('lair_action'));
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
                            if(hasLairActions) {
                                totals[roundNum].lairActions = {
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
                            if(actionType != 'mythic_action' && actionType != 'lair_action') {
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

                            //Add This Action to Lair Actions
                            if(hasLairActions && actionType == 'lair_action') {
                                if(!totals[roundNum]['lairActions'].abilities[actionType]) {
                                    totals[roundNum]['lairActions'].abilities[actionType] = [];
                                }
                                totals[roundNum]['lairActions'].abilities[actionType].push(featureObj);
                                if(featureObj.damage) {
                                    totals[roundNum]['lairActions'].damage += featureObj.damage;
                                    totals[roundNum]['lairActions'].maxDamage += featureObj.maxDamage;
                                }
                                if(featureObj.regenerate) {
                                    totals[roundNum]['lairActions'].regenerate += featureObj.regenerate;
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
            
            //console.log('totals');
            //console.log(totals);
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
            if(this.value.shortName) {
                creatureName = this.value.shortName.toLowerCase();
            } 

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

        findFeatureById: function(id, group = null) {
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

        calcAverageCR: function(inLair = false) {
            let armorCr = this.armorCr;
            armorCr = armorCr.toString().replace('> ','');
            if(String(armorCr).includes('-')) {
                let splitArmor = armorCr.split('-');
                armorCr = this.toNumber(this.toNumber(splitArmor[0]) + this.toNumber(splitArmor[1])) / 2;
            }
            let defensiveCr = (Number(armorCr) + this.toNumber(this.healthCr)) / 2;
            let average = 0;
            if(inLair) {
                average = (defensiveCr + this.toNumber(this.damageCrWithLair)) / 2;
            } else {
                average = (defensiveCr + this.toNumber(this.damageCr)) / 2;
            }

            //Multipliers from resitances and immunities (DMG pg 277)
            let hpMultiplier = 1;
            if(this.value.damageImmunities.length >= 3 || this.value.damageImmunities.includes('physical')) {
                let crHealthMultipliersByImmunity = {0: 2, 4: 2, 11: 1.5, 17: 1.25};
                hpMultiplier = this.getValueByHighestProperty(crHealthMultipliersByImmunity, average);
            } else if(this.value.damageResistances.length >= 3 || this.value.damageResistances.includes('physical')) {
                let crHealthMultipliersByResistance = {0: 2, 4: 1.5, 11: 1.25};
                hpMultiplier = this.getValueByHighestProperty(crHealthMultipliersByResistance, average);
            }
            if(hpMultiplier > 1) {
                defensiveCr = (Number(armorCr) + this.toNumber(this.getHealthCr(hpMultiplier))) / 2;
                average = (defensiveCr + this.toNumber(this.damageCr)) / 2;
            }

            //Extra modifiers
            if(average < 10 && this.value.speeds['fly'] > 0) {
                //Flying monsters with CR below 10 are considered effectively 2 AC higher
                average = average + 2;
            }

            return average;
        },

        deleteMonster: function() {
            if(confirm("Are you sure you want to delete \""+this.value.name+"\"?")) {
                this.$emit('remove-statblock', this.trackingId); 
            }
        },

        exportMonster: function() {
            console.log('------Export Monster------');
            let cloneOptions = this.clone(this.value);

            let exportFeatures = {};
            for(let actionType in this.value.features) {
                if(this.$refs['features_'+actionType]) {
                    exportFeatures[actionType] = [];
                    for(let feature of this.$refs['features_'+actionType]) {
                        exportFeatures[actionType].push(feature.exportFeature());
                    }
                }
            }
            //TODO replace features with export features
            cloneOptions.features = exportFeatures;

            console.log('pre intersect');
            console.log(this.clone(cloneOptions));

            cloneOptions = this.intersectObjectsRecursive(cloneOptions, this.defaultMonsterSettings().value);
            console.log('post intersect');
            console.log(this.clone(cloneOptions));
            
            navigator.clipboard.writeText(JSON.stringify(cloneOptions));
            alert('Copied statblock data of "'+this.value.name+'" to clipboard.');
        },

        exportMonsterForHomebrewery: function() {

            let exportString = "";
            exportString += "{{monster,frame,";
            if(this.value.display.columns > 1) exportString += ",wide";
            exportString += "\n";
            exportString += "## "+this.displayName+"\n";
            exportString += "*"+this.descriptionText+"*\n";
            exportString += "___\n";
            
            exportString += "**Armor Class** :: "+this.acText+"\n";
            exportString += "**Hit Points**  :: "+this.hitPointsText+"\n";
            exportString += "**Speed**       :: "+this.speedText+"\n";
            exportString += "___\n";
            
            exportString += "|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n";
            exportString += "|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n";
            exportString += "|\n";
            exportString += this.value.abilities['str']+" ("+this.addPlus(this.calcAbilityMod(this.value.abilities['str']))+")|";
            exportString += this.value.abilities['dex']+" ("+this.addPlus(this.calcAbilityMod(this.value.abilities['dex']))+")|";
            exportString += this.value.abilities['con']+" ("+this.addPlus(this.calcAbilityMod(this.value.abilities['con']))+")|";
            exportString += this.value.abilities['int']+" ("+this.addPlus(this.calcAbilityMod(this.value.abilities['int']))+")|";
            exportString += this.value.abilities['wis']+" ("+this.addPlus(this.calcAbilityMod(this.value.abilities['wis']))+")|";
            exportString += this.value.abilities['cha']+" ("+this.addPlus(this.calcAbilityMod(this.value.abilities['cha']))+")|";
            exportString += "\n___\n";
            
            if(this.skillText) exportString += "**Skills** :: "+this.skillText+"\n";
            if(this.damageResistanceText) exportString += "**Condition Resistances** :: "+this.damageResistanceText+"\n";
            if(this.damageImmunitiesText) exportString += "**Condition Immunities** :: "+this.damageImmunitiesText+"\n";
            if(this.damageVulnerabilitiesText) exportString += "**Condition Vulnerabilites** :: "+this.damageVulnerabilitiesText+"\n";
            if(this.sensesText) exportString += "**Senses**               :: "+this.sensesText+"\n";
            if(this.languageText) exportString += "**Languages**            :: "+this.languageText+"\n";
            exportString += "**Challenge**            :: "+this.crDisplayText+"\n";
            exportString += "**Proficiency**            :: "+this.proficiencyText+"\n";
            exportString += "___\n";
            

            //Start features
            if(this.value.features.mythic_action.length) {
                exportString += "***"+this.mythicTraitTitleText+".*** "+this.mythicTraitDescriptionText+"\n";
            }

            for(let passive of this.value.features.passive) {
                exportString += "***"+passive.displayName+"*** "+passive.desc+"\n";
                exportString += ":\n";    
            }

            if(this.value.features.spellcasting.length) {
                exportString += "### Spellcasting\n";

                for(let spellcasting of this.value.features.spellcasting) {
                    exportString += "***"+spellcasting.displayName+"*** "+spellcasting.desc+"\n";
                    exportString += ":\n";    
                }
            }
            
            if(this.value.features.action.length || this.value.features.multiattack.length) {
                exportString += "### Actions\n";

                for(let multiattack of this.value.features.multiattack) {
                    exportString += "***"+multiattack.displayName+"*** "+multiattack.desc+"\n";
                    exportString += ":\n";    
                }
                for(let action of this.value.features.action) {
                    exportString += "***"+action.displayName+"*** "+action.desc+"\n";
                    exportString += ":\n";    
                }
            }


            if(this.value.features.bonus_action.length) {
                exportString += "### Bonus Actions\n";

                for(let bonus_action of this.value.features.bonus_action) {
                    exportString += "***"+bonus_action.displayName+"*** "+bonus_action.desc+"\n";
                    exportString += ":\n";    
                }
            }

            if(this.value.features.reaction.length) {
                exportString += "### Reactions\n";

                for(let reaction of this.value.features.reaction) {
                    exportString += "***"+reaction.displayName+"*** "+reaction.desc+"\n";
                    exportString += ":\n";    
                }
            }

            if(this.value.features.legendary_action.length) {
                exportString += "### Legendary Actions\n";
                exportString += this.legendaryActionText+"\n";
                exportString += ":\n";

                for(let legendary_action of this.value.features.legendary_action) {
                    exportString += "***"+legendary_action.displayName+"*** "+legendary_action.desc+"\n";
                    exportString += ":\n";    
                }
            }

            if(this.value.features.mythic_action.length) {
                exportString += "### Mythic Actions\n";
                exportString += this.mythicActionText+"\n";
                exportString += ":\n";

                for(let mythic_action of this.value.features.mythic_action) {
                    exportString += "***"+mythic_action.displayName+"*** "+mythic_action.desc+"\n";
                    exportString += ":\n";    
                }
            }

            if(this.value.features.lair_action.length) {
                exportString += "### Lair Actions\n";
                exportString += this.lairActionText+"\n";
                exportString += ":\n";

                for(let lair_action of this.value.features.lair_action) {
                    exportString += "***"+lair_action.displayName+"*** "+lair_action.desc+"\n";
                    exportString += ":\n";    
                }
            }


            exportString += "}}";

            console.log(exportString);
            
            navigator.clipboard.writeText(exportString);
            alert('Copied Homebrewery Format statblock data of "'+this.value.name+'" to clipboard.');

            return exportString;
        },

        defaultMonsterSettings: function() {
            return {
                mountedFeatures: 0,
                editMode: false,
                trackingId: this.initialStatblock.trackingId,
                value: {
                    name: 'Monster',
                    shortName: '',
                    isNameProperNoun: false,
                    size: 'medium',
                    type: 'dragon',
                    subtypes: [],
                    customSubtype: '',
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
                    expertise: [],
                    languages: this.createDefaultLanguages(),
                    speeds: this.createDefaultSpeeds(),
                    hover: false,
                    senses: this.createDefaultSenses(),
                    manualOverride: {
                        proficiency: -1,
                        casterLevel: -1,
                        challengeRating: -1,
                        challengeRatingLair: -1,
                    },
                    targetCR: {
                        offensive: {
                        }, 
                        defensive: {
                        }
                    },
                    mythicTrait: {
                        name: this.f5.misc.mythic_trait_name,
                        description: this.f5.misc.mythic_trait_desc,
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

    }
}