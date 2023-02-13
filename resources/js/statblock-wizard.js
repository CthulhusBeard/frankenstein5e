import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';

const template = require('../html/statblock-wizard.html');

export default {
    props: [
        'f5', 
    ],

    template: template,  

    components: {
        'Multiselect': Multiselect,
    },

    data: function() {
        return {
            activePage: 'target-cr',

            targetCR: 0,
            playerCount: 1,
            playerLevel: 1,
            monsterCount: 1,
            encounterDifficulty: 'easy',
            set_targetCR: false,

            creatureType: 'aberration',
            creatureSubtypes: [],
            creatureSpecifics: [],
            set_creatureType: false,

            set_creatureArmorHP: false,
            
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

            creatureAbilityScores: {
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
            set_creatureStats: false,

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
                    this.f5.creaturetypes[this.creatureType].hasOwnProperty('subtypes') && 
                    this.f5.creaturetypes[this.creatureType]['subtypes'].includes(i)
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
            if(this.f5.creaturetypes.hasOwnProperty(this.creatureType) && this.f5.creaturetypes[this.creatureType].hasOwnProperty('options')) {
                for (let i in this.f5.creaturetypes[this.creatureType]['options']) {
                    let option = this.f5.creaturetypes[this.creatureType]['options'][i];
                    if(this.f5.tags.creature_options.hasOwnProperty(option)) {
                        let specificObj = { value: option, label: this.f5.tags.creature_options[option].name};
                        optionsList.push(specificObj);
                    }
                }
            }

            //Creature subtypes
            for(let i in this.creatureSubtypes) {
                if(
                    this.f5.creaturesubtypes.hasOwnProperty(this.creatureSubtypes[i]) && 
                    this.f5.creaturesubtypes[this.creatureSubtypes[i]].hasOwnProperty('options')
                ) {
                    let subtypeOptions = this.f5.creaturesubtypes[this.creatureSubtypes[i]]['options'];

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
    },

    methods: {

        buildTipString: function(key, tagGroup, typeName) {

            let tipString = '';

            console.log('--buildTipString--');
            console.log(key);
            console.log(tagGroup);

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
        

        setCR: function(setThis = true) {
            this.set_targetCR = setThis;
            this.setActivePage();
        },

        setCreatureType: function(setThis = true) {
            this.set_creatureType = setThis;
            this.setActivePage();
        },

        setCreatureStats: function(setThis = true) {
            this.set_creatureStats = setThis;
            this.setActivePage();
        },

        setCreatureArmorHP: function(setThis = true) {
            this.set_creatureArmorHP = setThis;
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

            let crTips = {
                'Challenge Rating': []
            };

            if(specificTips && specificTips.includes('armor')) {
                crTips['Challenge Rating'].push(targetCRData.ac);
            }
            if(crTips['Challenge Rating'].length) {
                crTips['Challenge Rating'] = [];
            }

            let typeTips = this.getTipsFromGroup(this.f5.creaturetypes, [this.creatureType], specificTips);
            let subtypeTips = this.getTipsFromGroup(this.f5.creaturesubtypes, this.creatureSubtypes, specificTips);
            let tagTips = this.getTipsFromGroup(this.f5.tags.creature_options, this.creatureSpecifics, specificTips);

            let tips = Object.assign(crTips, typeTips, subtypeTips, tagTips);
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
                        tips[creatureTag].push(this.buildTipString(tagKey, tagGroup, creatureTag));
                    }
                    if(!tips[creatureTag].length) {
                        delete tips[creatureTag];
                    }
                }
            }

            return tips;
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
        

    },       
};