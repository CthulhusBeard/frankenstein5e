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
                round_tracker: 7,
                import_monster: 0,
            },
            statblocks: [],
            f5: f5data,
        },

        components: {
            'Multiselect': Multiselect,
            'statblock': StatBlock,
            'statblock-feature': StatBlockFeature,
        },

        created() {
            console.log('created');
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
                if(input.includes('/')) {
                    let divideArray = input.split('/');
                    input = divideArray[0] / divideArray[1];
                }
                return Number(input);
            },

            importMonster: function(monster) {
                console.log('import');
                console.log(monster);
                let importedStatBlock = monster;
                //TODO validation ?
                this.statblocks.push(importedStatBlock);
                console.log(this.statblocks);
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
                    display: {
                        columns: 2,
                    }
                };

                for(let ability in f5data.abilities) {
                    statblock.abilities[ability] = 10;
                    statblock.savingThrows[ability] = false;
                }
            
                for(let sense in f5data.senses) {
                    statblock.senses[sense] = 0;
                }
            
                for(let lang in f5data.languages) {
                    if(f5data.languages[lang]['default']) {
                        statblock.languages.spokenWritten.push(lang);
                    }
                }
            
                for(let speed in f5data.speeds) {
                    if(f5data.speeds[speed]['default']) {
                        statblock.speeds[speed] = f5data.speeds[speed]['default'];
                    } else {
                        statblock.speeds[speed] = 0;
                    }
                }

                this.statblocks.push(statblock);

                
                console.log('Stat block added');
                console.log(this.statblocks);
            },

            removeStatBlock: function(id) {
                for(let i in this.statblocks) {
                    if(this.statblocks[i].id === id) {
                        this.statblocks.splice(i, 1);
                    }
                }
            },
        },
    });

    return app;

}