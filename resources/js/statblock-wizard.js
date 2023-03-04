import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';

const template = require('../html/statblock-wizard.html');

export default {
    props: [
        'f5', 
        'measure', 
    ],

    template: template,  

    components: {
        'Multiselect': Multiselect,
    },

    data: function() {
        return {
            activePage: 'target-cr',

            targetCR: 0,
            playerCount: 4,
            playerLevel: 1,
            monsterCount: 1,
            encounterDifficulty: 'medium',
            set_targetCR: false,

            size: 'medium',
            type: 'aberration',
            subtypes: [],
            typeCategories: [],
            set_creatureType: false,

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
            set_creatureArmorHP: false,

            damageResistances: [],
            damageImmunities: [],
            damageVulnerabilites: [],
            conditionImmunities: [],
            set_creatureDamageTypes: false,

            skills: [],
            expertise: [],
            languages: this.createDefaultLanguages(),
            speeds: this.createDefaultSpeeds(),
            hover: false,
            senses: this.createDefaultSenses(),
            alignment: '',
            showTypicalAlignment: true,
            set_creatureSpeedsSensesLanguagesAlignment: false,

            features: [],
            set_creatureFeatures: false,

            abilities: {
                str: 10,
                dex: 10,
                con: 10,
                int: 10,
                wis: 10,
                cha: 10,
            },
            creatureAbilityScorePriority: [
                'str',
                'dex',
                'con',
                'int',
                'wis',
                'cha',
            ],
            savingThrows: this.createDefaultSavingThrows(),
            set_creatureStats: false,

        }
    },

    created() {
    },

    mounted() {
    },

    computed: {
        

        //Armor Class
        allowAcSelector: function() {
            if(this.armorClass && this.armorClass.type && this.f5.armor[this.armorClass.type]) {
                return (this.f5.armor[this.armorClass.type].range);
            }
            return false;
        },

        allowAcBonus: function() {
            if(this.f5.armor[this.armorClass.type] && this.f5.armor[this.armorClass.type].allow_bonus) {
                return true;
            }
            return false;
        },

        creatureTips: function() {
            return this.getCreatureTips();
        },

        //Subtypes
        orderedSubtypes: function() {
            let sortedSubtypes = [];
            let count = 0;

            for (let i in this.f5.creaturesubtypes) {
                if(
                    this.f5.creaturesubtypes[i].hasOwnProperty('tags') && 
                    this.f5.creaturesubtypes[i].tags.hasOwnProperty('woc_property') && 
                    this.f5.creaturesubtypes[i].tags.woc_property
                ) {
                    continue;
                }
                
                let subtypeObj = { value: i, label: this.f5.creaturesubtypes[i].name};

                if(
                    this.f5.creaturetypes[this.type].hasOwnProperty('subtypes') && 
                    this.f5.creaturetypes[this.type]['subtypes'].includes(i)
                ) {
                    sortedSubtypes.splice(count, 0, subtypeObj);
                    count++;
                } else {
                    sortedSubtypes.push(subtypeObj);
                }
            }

            return sortedSubtypes;
        },

        //Type Options
        creatureSpecificsList: function() {
            let optionsList = [];

            //Creature types
            if(this.f5.creaturetypes.hasOwnProperty(this.type) && this.f5.creaturetypes[this.type].hasOwnProperty('options')) {
                for (let i in this.f5.creaturetypes[this.type]['options']) {
                    let option = this.f5.creaturetypes[this.type]['options'][i];
                    if(this.f5.tags.creature_options.hasOwnProperty(option)) {
                        let specificObj = { value: option, label: this.f5.tags.creature_options[option].name};
                        optionsList.push(specificObj);
                    }
                }
            }

            //Creature subtypes
            for(let i in this.subtypes) {
                if(
                    this.f5.creaturesubtypes.hasOwnProperty(this.subtypes[i]) && 
                    this.f5.creaturesubtypes[this.subtypes[i]].hasOwnProperty('options')
                ) {
                    let subtypeOptions = this.f5.creaturesubtypes[this.subtypes[i]]['options'];

                    for (let j in subtypeOptions) {
                        let option = subtypeOptions[j];
                        if(this.f5.tags.creature_options.hasOwnProperty(option)) {
                            let specificObj = { value: option, label: this.f5.tags.creature_options[option].name};
                            optionsList.push(specificObj);
                        }
                    }
                }
            }

            return optionsList;
        },

        recommendedCR: function() {

            let xpMultipliers = { //DMG pg 82
                1: 1,
                2: 1.5,
                3: 2,
                7: 2.5,
                11: 3,
                15: 4,
            };
            let xpMultiplier = this.$parent.getValueByHighestProperty(xpMultipliers, this.monsterCount);

            let xpThresholds = this.f5.playerlevels[this.playerLevel].xp_thresholds;
            let xpTargetThreshold = xpThresholds[this.encounterDifficulty];
            let xpTargetTotal = xpTargetThreshold / xpMultiplier / this.monsterCount * this.playerCount;

            let crList = this.f5.challengerating;
            let closest;
            for(let i in crList) {
                if(!closest || (crList[i].xp <= xpTargetTotal && crList[i].xp > closest.xp)) {
                    closest = crList[i];
                }
            }

            return closest.cr_text;
        },
        
        targetCRData: function() {
            let targetCR;
            if(this.activePage === 'cr-help') {
                targetCR = this.f5.challengerating[this.recommendedCR];
            } else {
                targetCR = this.f5.challengerating[this.targetCR];
            }
            return targetCR;
        },

        targetCRDesc: function() {
            return this.f5.misc.wizard_cr_description.replace(':cr', this.targetCRData.cr_text)
        },

        alignmentText: function() {
            if(this.alignment == '') {
                return this.getProp(this.f5.alignments[this.alignment]);
            }
            if(this.showTypicalAlignment) {
                return this.f5.misc.alignments_typically.replace(":alignment", this.getProp(this.f5.alignments[this.alignment]));
            }
            return this.getProp(this.f5.alignments[this.alignment]);
        },


        getAcRange: function() {
            if(
                this.armorClass && 
                this.armorClass.type && 
                this.f5.armor[this.armorClass.type] && 
                this.f5.armor[this.armorClass.type].range &&
                this.f5.armor[this.armorClass.type].range.low &&
                this.f5.armor[this.armorClass.type].range.high
            ) {
                let arr = [];
                for(let i = this.f5.armor[this.armorClass.type].range.low; i < this.f5.armor[this.armorClass.type].range.high+1; i++) {
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
                this.armorClass && 
                this.armorClass.type && 
                this.f5.armor[this.armorClass.type]
            ) {

                //set AC value
                if(this.f5.armor[this.armorClass.type].range) {
                    //manual value
                    acValue = parseFloat(this.armorClass.manual);

                } else if(this.f5.armor[this.armorClass.type].base) {
                    //base value
                    acValue = this.f5.armor[this.armorClass.type].base;
                    if(this.f5.armor[this.armorClass.type].bonus && this.abilities[this.f5.armor[this.armorClass.type].bonus]) {
                        //get stat bonus
                        statBonus = this.getAbilityMod(this.f5.armor[this.armorClass.type].bonus);
                        if(this.f5.armor[this.armorClass.type].max_bonus && statBonus > this.f5.armor[this.armorClass.type].max_bonus) {
                            //set to max bonus
                            statBonus = this.f5.armor[this.armorClass.type].max_bonus;
                        }
                        acValue += parseFloat(statBonus);
                    }
                } else {
                    console.error('Couldn\'t calculate AC');
                }
                
                if(this.allowAcBonus && this.armorClass.bonus && this.armorClass.bonus > 0) {
                    acValue += parseFloat(this.armorClass.bonus);
                }
                
                if(this.armorClass.shield) {
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
                this.armorClass && 
                this.armorClass.type && 
                this.f5.armor[this.armorClass.type]
            ) {
                //set name
                if(this.armorClass.type === 'custom' && this.armorClass.name) {
                    name = this.armorClass.name;
                } else if(this.armorClass.type !== 'none' && this.f5.armor[this.armorClass.type].name) {
                    name = this.f5.armor[this.armorClass.type].name;
                }

                let shieldText = '';
                if(this.armorClass.shield) {
                    shieldText = this.f5.misc.shield;
                }

                let mageArmorText = '';
                if(this.armorClass.mageArmor) {
                    let mageArmorAc = 13 + this.getAbilityMod('dex');
                    if(this.armorClass.shield) {
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

        hpConMod: function() {
            let conMod = this.getAbilityMod('con');
            let conHP = 0;
            if(conMod > 0) {
                conHP = conMod * this.hitPoints.diceAmount;
            }
            return conHP;
        },

        
        hitPointsText: function() {
            let type = this.hitPoints.diceType;
            let amount = this.hitPoints.diceAmount;
            let additionalHP = this.hitPoints.additional > 0 ? Math.floor(this.hitPoints.additional) : 0;
            if(additionalHP > 9999) {
                this.hitPoints.additional = additionalHP = 9999;
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
            return this.damageList(this.damageResistances, this.f5.damagetypes).toLowerCase();
        },
        damageImmunitiesText: function() { 
            return this.damageList(this.damageImmunities, this.f5.damagetypes).toLowerCase();
        },
        damageVulnerabilitiesText: function() { 
            return this.damageList(this.damageVulnerabilites, this.f5.damagetypes).toLowerCase();
        },
        conditionImmunitiesText: function() {
            return this.conditionList(this.conditionImmunities, this.f5.conditions).toLowerCase();
        },
        
        eligableDamageTypes: function() {
            let list = [];
            for(let i in this.f5.damagetypes) {
                if(
                    this.damageResistances.includes(i) ||
                    this.damageImmunities.includes(i) ||
                    this.damageVulnerabilites.includes(i)
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
                    this.skills.includes(i) ||
                    this.expertise.includes(i) 
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
            for(let i in this.speeds) {
                if(!this.speeds[i]) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }
                if(!this.f5.speeds[i]['hide_name']) {
                    displayText += this.f5.speeds[i].name.toLowerCase()+' ';
                }
                displayText += this.speeds[i]+' '+this.measure.measureUnit; 
                if(i === 'fly' && this.hover) {
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
            for(let i in this.senses) {
                if(!this.senses[i].distance) {
                    continue;
                }
                if(displayText !== '') {
                    displayText += ', ';
                }
                if(!this.f5.senses[i]['hide_name']) {
                    displayText += this.f5.senses[i].name.toLowerCase()+' ';
                }
                displayText += this.senses[i].distance+' '+this.measure.measureUnit;
                
                if(this.senses[i].modifier) {
                    displayText += '('+this.f5.senses[i].modifier_name.toLowerCase()+')';
                }
            }

            //Passive Perception
            //if(this.skills.includes('perception')) {
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5.misc.passive_skill.replace(':skill', this.f5.skills['perception'].name)+' '+(this.calcSkillMod('perception')+10);
            //}
            return displayText;
        },

        //Languages
        languageText: function() {
            let displayText = '';

            if(this.languages.spokenWritten.includes('all')) {
                return this.f5.languages['all'].name;
            }

            for(let lang of this.languages.spokenWritten) {
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5.languages[lang].name; 
            }

            if(this.languages.telepathy) {
                if(displayText !== '') {
                    displayText += ', ';
                }
                displayText += this.f5.misc.telepathy+' '+this.languages.telepathy +' '+ this.measure.measureUnit;
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
                if(!this.skills.includes(skill) && !this.expertise.includes(skill)) {
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
    },

    methods: {

        buildTipElement: function(key, tagGroup, typeName) {

            let tipString = '';

            if(this.f5.tags.translations.hasOwnProperty('tag_'+key)) {
                tipString = this.f5.tags.translations['tag_'+key];
            }

            //Convert to array
            if(!Array.isArray(tagGroup)) {
                tagGroup = [tagGroup];
            }

            for(let i in tagGroup) {
                if(this.f5.hasOwnProperty(key) && this.f5[key].hasOwnProperty(tagGroup[i])) {
                    tagGroup[i] = this.f5[key][tagGroup[i]].name;
                } else if(this.f5.tags.hasOwnProperty(key) && this.f5.tags[key].hasOwnProperty(tagGroup[i])) {
                    tagGroup[i] = this.f5.tags[key][tagGroup[i]].name;
                }
            }

            tipString += this.$parent.createSentenceList(tagGroup);
            tipString = tipString.replace(':creature_type', typeName);

            return tipString;
        },
        

        setCR: function(setThis = true) {
            this.set_targetCR = setThis;
            this.setActivePage();
        },

        setCreatureType: function(setThis = true) {
            this.set_creatureType = setThis;
            this.hitPoints.diceType = this.f5.creaturesizes[this.size].hit_dice;
            this.setActivePage();
        },

        setCreatureStats: function(setThis = true) {
            //TODO also set Saving throws
            this.set_creatureStats = setThis;
            this.setActivePage();
        },

        setCreatureArmorHP: function(setThis = true) {
            this.set_creatureArmorHP = setThis;
            this.setActivePage();
        },

        setCreatureDamageTypes: function(setThis = true) {
            this.set_creatureDamageTypes = setThis;
            this.setActivePage();
        },

        setCreatureSpeedsSensesLanguagesAlignment: function(setThis = true) {
            this.set_creatureSpeedsSensesLanguagesAlignment = setThis;
            this.setActivePage();
        },

        setCreatureFeatures: function(setThis = true) {
            this.set_creatureFeatures = setThis;
            this.setActivePage();
        },

        manualStats: function() {
            this.setActivePage('manual-stats');
        },

        crHelp: function() {
            this.setActivePage('cr-help');
        },


        shiftAbilityPriorityUp: function(score) {
            let index = this.creatureAbilityScorePriority.indexOf(score);
            if(index > 0) {
                this.creatureAbilityScorePriority.splice(index-1, 0, this.creatureAbilityScorePriority.splice(index, 1)[0]);
            }
        },

        shiftAbilityPriorityDown: function(score) {
            let index = this.creatureAbilityScorePriority.indexOf(score);
            if(index < this.creatureAbilityScorePriority.length) {
                this.creatureAbilityScorePriority.splice(index+1, 0, this.creatureAbilityScorePriority.splice(index, 1)[0]);
            }
        },


        setActivePage: function(force = null) {
            if(force) {
                this.activePage = force;
                return;
            }

            let pageKeyValues = {
                set_targetCR: 'target-cr',
                set_creatureType: 'choose-type',
                set_creatureStats: 'choose-stats',
                set_creatureArmorHP: 'armor-hp',
                set_creatureDamageTypes: 'damage-types',
                set_creatureSpeedsSensesLanguagesAlignment: 'speeds-senses-languages-alignments',
                set_creatureFeatures: 'choose-features',
            };

            for(let i in pageKeyValues) {
                if(!this[i]) {
                    this.activePage = pageKeyValues[i];
                    return;
                }
            }
        },

        abilityScoreDistributionByCR: function(cr) {
            //TODO: This
            return '[30, 30, 30, 30, 30, 30] //TODO';
        },

        
        getCreatureTips: function(specificTips = null) {

            let crText = 'Challenge Rating '+this.targetCR;
            let crTips = {};
            crTips[crText] = [];

            let tipsAssociation = {
                armor: this.f5.misc.wizard_cr_ac+' ~'+this.targetCRData.ac,
                hp: this.f5.misc.wizard_cr_hit_points+' '+this.targetCRData.hp.low+'-'+this.targetCRData.hp.high,
                attack_bonus: this.f5.misc.wizard_cr_attack_bonus+' - '+this.targetCRData.attack_bonus,
                prof: this.f5.misc.wizard_cr_proficiency+' '+this.targetCRData.prof,
                examples: this.f5.misc.wizard_cr_examples+' '+this.targetCRData.examples,
            };

            if(specificTips) {
                for(let tipType of specificTips) {
                    if(tipsAssociation.hasOwnProperty(tipType)) {
                        crTips[crText].push(tipsAssociation[tipType]);
                    }
                }
            }

            if(!crTips[crText].length) {
                delete crTips[crText];
                console.log(crTips);
            }

            let typeTips = this.getTipsFromGroup(this.f5.creaturetypes, [this.type], specificTips);
            let subtypeTips = this.getTipsFromGroup(this.f5.creaturesubtypes, this.subtypes, specificTips);
            let sizeTips = this.getTipsFromGroup(this.f5.creaturesizes, [this.size], specificTips);
            let tagTips = this.getTipsFromGroup(this.f5.tags.creature_options, this.typeCategories, specificTips);

            let tips = Object.assign(crTips, typeTips, subtypeTips, sizeTips, tagTips);
            console.log('tips');
            console.log(tips);
            
            return tips;
        },

        getTipsFromGroup: function(f5Group, creatureTypes, specificTips = null) {
            let tips = {};
            let skipProperties = ['woc_property'];

            for(let i in creatureTypes) {
                if(
                    f5Group.hasOwnProperty(creatureTypes[i]) &&
                    f5Group[creatureTypes[i]].hasOwnProperty('tags')
                ) {
                    let creatureTag = f5Group[creatureTypes[i]]['name'];
                    tips[creatureTag] = [];

                    for(let tagKey in f5Group[creatureTypes[i]]['tags']) {
                        if(skipProperties.includes(tagKey)) continue;
                        if(specificTips !== null && !specificTips.includes(tagKey)) continue;

                        let tagGroup = f5Group[creatureTypes[i]]['tags'][tagKey];
                        tips[creatureTag].push(this.buildTipElement(tagKey, tagGroup, creatureTag));
                    }
                    if(!tips[creatureTag].length) {
                        delete tips[creatureTag];
                    }
                }
            }

            return tips;
        },        

        getAbilityMod: function (ability) {
            let score = this.abilities[ability];
            return this.calcAbilityMod(score);
        },

        calcSkillMod: function (skill) {
            let ability = this.f5.skills[skill].ability;
            let abilityMod = this.getAbilityMod(ability);
            if(this.skills.includes(skill)) {
                abilityMod += this.proficiency;
            }
            if(this.expertise.includes(skill)) {
                abilityMod += this.proficiency*2;
            }
            return abilityMod;
        },
        

    },       
};