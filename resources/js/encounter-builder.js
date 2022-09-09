import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockFeature from './statblock-feature.js'
import StatBlock from './statblock.js'
import EncounterGraph from './encounter-graph.js';

export function initVue(f5data) {
    
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
            statblocks: [],
            f5: f5data,
        },

        components: {
            'multiselect': Multiselect,
            'statblock': StatBlock,
            'statblock-feature': StatBlockFeature,
            'encounter-graph': EncounterGraph,
        },

        mounted() {
            this.createStatBlock();
        },

        computed: {
            encounterData: function() {
                let graphData = [];

                for(let statblock of this.$refs.statblocks) {
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
                console.log(importedStatBlock);
                this.statblocks.push(importedStatBlock);

                
                console.log('List all statblocks');
                console.log(this.statblocks);
                console.log(this.$refs.statblocks);
            },

            createStatBlock: function() {            
                let i = this.statblocks.push({});
                console.log('List all statblocks');
                console.log(this.statblocks);
                console.log(this.$refs.statblocks);

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