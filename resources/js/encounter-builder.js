import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js'
import StatBlock from './statblock.js'

export function initVue(f5data) {
    
    let app = new Vue({
        el: '#f5',
        data: {
            editor: {
                edit_mode: true,
                player_characters: {
                    number: 4,
                    level: 1,
                },
                measure: {
                    measureUnit: 'ft.',
                    measureIncrement: 5,
                    measureUnitUp: 5280,
                    measureUnitUpName: 'miles',
                },
                round_tracker: 7,
                import_monster: 0,
            },
            statblocks: [],
            f5: f5data,
        },

        components: {
            'multiselect': Multiselect,
            'statblock': StatBlock,
            'statblock-feature': StatBlockFeature,
        },

        created() {
            this.createStatBlock();
        },

        computed: {

        },

        methods: {
            randChars: function(len) {
                const base = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvyxyz0123456789"];
                const generator = (base, len) => {
                    return [...Array(len)]
                      .map(i => base[Math.random()*base.length|0])
                      .join('');
                };
                return generator(base, len);
            },

            toNumber: function(input) {
                if(String(input).includes('/')) {
                    let divideArray = input.split('/');
                    input = divideArray[0] / divideArray[1];
                }
                return Number(input);
            },

            importMonster: function(monster) {
                console.log('import monster');
                let importedStatBlock = monster;
                console.log(importedStatBlock);
                this.statblocks.unshift(importedStatBlock);
            },

            createStatBlock: function() {
                let statblock = {
                    id: this.randChars(15),
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
                };

                for(let ability in this.f5.abilities) {
                    statblock.abilities[ability] = 10;
                    statblock.savingThrows[ability] = false;
                }
            
                for(let sense in this.f5.senses) {
                    statblock.senses[sense] = {
                        distance: 0,
                        modifier: false,
                    };
                }
            
                for(let lang in this.f5.languages) {
                    if(this.f5.languages[lang]['default']) {
                        statblock.languages.spokenWritten.push(lang);
                    }
                }
            
                for(let speed in this.f5.speeds) {
                    if(this.f5.speeds[speed]['default']) {
                        statblock.speeds[speed] = this.f5.speeds[speed]['default'];
                    } else {
                        statblock.speeds[speed] = 0;
                    }
                }

                let i = this.statblocks.push(statblock);
                return i-1;
            },

            removeStatBlock: function(id) {
                for(let i in this.statblocks) {
                    if(this.statblocks[i].id === id) {
                        this.statblocks.splice(i, 1);
                    }
                }
            },

            clearAllData: function() {
                this.statblocks = [];
                this.createStatBlock();
            },
        },
    });

    return app;

}