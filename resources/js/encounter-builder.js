import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js'
import StatBlock from './statblock.js'
import EncounterGraph from './encounter-graph.js';
import statblock from './statblock.js';

export function initVue(f5data) {

    let StatBlockClass = Vue.extend(StatBlock);
    
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
            statblockclass: StatBlock,
            f5: f5data,
        },

        components: {
            'multiselect': Multiselect,
            'statblock': StatBlock,
            'statblock-feature': StatBlockFeature,
            'encounter-graph': EncounterGraph,
        },

        created() {
            this.createStatBlock();
        },

        computed: {
            encounterData: function() {
                let graphData = [];

                for(let statblock of this.statblocks) {
                    let monsterData = {
                        name: statblock.name,
                        hp: statblock.getHP,
                        dpr: statblock.averageDPR,
                        projection: statblock.damageProjection,
                    };

                    graphData.push(monsterData);
                }

                return graphData;
            },
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
                importedStatBlock.id = this.randChars(15);
                this.statblocks.push(importedStatBlock);
            },

            createStatBlock: function() {            

                let instance = new StatBlockClass({
                    propsData: { 
                        f5: this.f5,
                        player_data: this.editor.player_characters,
                        combat_rounds: this.editor.round_tracker,
                        measure: this.editor.measure,
                    }
                });
//                instance.$mount();
                
                let i = this.statblocks.push(instance);

                console.log('List all statblocks');
                console.log(this.statblocks);

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