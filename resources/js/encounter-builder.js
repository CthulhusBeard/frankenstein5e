import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js'
import StatBlock from './statblock.js'
import EncounterGraph from './encounter-graph.js';
import * as SampleMonsters from './sample-monsters';

export function initVue(f5data) {
    Vue.config.devtools = true;
    
    let app = new Vue({
        el: '#f5',
        data: {
            editor: {
                editMode: true,
                playerData: {
                    number: 4,
                    level: 1,
                },
                measure: {
                    measureUnit: 'ft.',
                    measureIncrement: 5,
                    measureUnitUp: 5280,
                    measureUnitUpName: 'miles',
                },
                roundTracker: 7,
                importMonster: 0,
            },
            sampleMonsters: SampleMonsters.monsters,
            statblocks: [],
            projections: [],
            f5: f5data,
        },

        components: {
            'Multiselect': Multiselect,
            'Statblock': StatBlock,
            'StatblockFeature': StatBlockFeature,
            'Encountergraph': EncounterGraph, //TODO: Find out why "Encountergraph" works and "EncounterGraph" doesnt
        },

        mounted() {
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

            importMonster: function(monster) {
                console.log('== import monster ==');
                let importedStatBlock = JSON.parse(JSON.stringify(monster));
                importedStatBlock.trackingId = this.randChars(15);
                console.log(importedStatBlock);
                this.statblocks.push(importedStatBlock);
            },

            createStatBlock: function() {
                let i = this.statblocks.push({
                    trackingId: this.randChars(15), 
                });
                return i-1;
            },

            removeStatBlock: function(id) {
                for(let i in this.statblocks) {
                    if(this.statblocks[i].trackingId === id) {
                        this.statblocks.splice(i, 1);
                    }
                }
            },

            clearAllData: function() {
                this.statblocks = [];
                this.createStatBlock();
            },

            updateMonsterName: function(id, name) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.name = name;
                    }
                }
            },

            updateMonsterHP: function(id, hp) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.hp = hp;
                    }
                }
            },

            updateMonsterAC: function(id, ac) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.ac = ac;
                    }
                }
            },

            updateMonsterProjections: function(id, projections) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.projections = projections;
                    }
                }
            }
        },
    });

    return app;

}