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
                activeSection: 'statblock-display',
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
            encounterXP: 0,
            encounterDifficulty: f5data.encounterdifficulties['easy'],
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
            sortedCRList: function () {
                let crArray = [];
                for(let i in this.f5.challengerating) {
                    crArray.push(this.f5.challengerating[i]);
                }
                return crArray.sort(function(a, b) {
                    return a.cr - b.cr;
                });
            },
        },

        methods: {

            getEncounterXP: function() {
                let xpTotal = 0;
                let totalNumOfMonsters = 0;
                for(let i in this.statblocks) {
                    let numOfMonsters = (this.statblocks[i].number) ? this.statblocks[i].number : 1;
                    xpTotal += this.statblocks[i].xp * numOfMonsters;
                    totalNumOfMonsters += numOfMonsters;
                }

                let xpMultipliers = { //DMG pg 82
                    1: 1,
                    2: 1.5,
                    3: 2,
                    7: 2.5,
                    11: 3,
                    15: 4,
                };
                let xpMultiplier = this.getValueByHighestProperty(xpMultipliers, totalNumOfMonsters);

                return xpTotal * xpMultiplier;
            },

            getEncounterDifficulty: function() {
                let difficulty = 'easy';
                let xpPerPlayer = this.encounterXP / this.editor.playerData.number;
                let thresholds = this.f5.playerlevels[this.editor.playerData.level]['xp_thresholds'];
                let difficultyLevels = ['medium', 'hard', 'deadly'];
                for(let diffKey of difficultyLevels) {
                    if(xpPerPlayer >= thresholds[diffKey]) {
                        difficulty = diffKey;
                    }
                }

                return this.f5.encounterdifficulties[difficulty];
            },

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
                importedStatBlock.number = 1;
                console.log(importedStatBlock);
                this.statblocks.push(importedStatBlock);
            },

            importMonsterFromClipboard: async function() {
                let monster = await navigator.clipboard.readText();

                try {
                    let parsed = JSON.parse(monster);

                    //TODO: Add better import validation
                    this.importMonster(parsed);

                } catch(e) {
                    alert('Your clipboard does not contain a valid Frankenstein 5E monster.'); // error in the above string (in this case, yes)!
                }

            },

            createStatBlock: function() {
                let i = this.statblocks.push({
                    trackingId: this.randChars(15), 
                    number: 1,
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
                if(confirm("Are you sure you want to clear all your encounter data?")) {
                    this.statblocks = [];
                    this.createStatBlock();
                }
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

            updateMonsterCR: function(id, cr, xp, lairCr = null, lairXp = null) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.cr = cr;
                        statblock.xp = xp;
                        if(lairCr && lairXp) {
                            statblock.lairCr = lairCr;
                            statblock.lairXp = lairXp;
                        }
                    }
                }
                
                this.encounterXP = this.getEncounterXP();
                this.encounterDifficulty = this.getEncounterDifficulty();
            },

            updateMonsterProjections: function(id, projections, mythicRecovery) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.projections = projections;
                        statblock.mythicRecovery = mythicRecovery;
                    }
                }
            },

            changeActiveDisplay: function(activeDisplayName) {
                this.editor.activeSection = activeDisplayName;
                if(activeDisplayName == 'encounter-display') {
                    this.$refs['encounterGraph'].updateGraph();
                }
            },

            //getValueByHighestProperty([1: 'a', 5: 'b', 10: 'c'], 6) = 'b'
            getValueByHighestProperty: function(array, indexNum) {
                indexNum = parseInt(indexNum);
                let returnVal, indexTracker;
                for(let i in array) {
                    if(indexNum >= parseInt(i) && (!indexTracker || parseInt(i) > indexTracker)) {
                        indexTracker = parseInt(i);
                        returnVal = array[i];
                    }
                }
                return returnVal;
            },
        },
    });

    return app;

}