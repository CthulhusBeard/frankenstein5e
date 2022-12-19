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
            targetCR: -1,
            playerCount: -1,
            playerLevel: -1,
            monsterCount: -1,
            encounterDifficulty: -1,

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


        changeActivePage: function() {
            if(targetCR == -1) {
                target-cr
            }
        }
    },       
};