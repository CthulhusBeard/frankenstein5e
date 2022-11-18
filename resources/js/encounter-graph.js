import Chart from 'chart.js/auto';

const template = require('../html/encounter-graph.html');

export default {
    props: [
        'encounterData',
        'playerCount',
        'playerLevel',
        'combatRounds',
        'f5'
    ],

    template: template,

    data: function () {
        return {
            graphInstance: null,
            refreshToggle: true, //TODO Make this not necessary
        }
    },

    watch: { //TODO: Can this be removed??
        playerCount: {
            handler(val) {
                this.updateGraph();
            },
        },
        playerLevel: {
            handler(val) {
                this.updateGraph();
            },
        },
    },

    created() {
        console.log('created graphInstance');
    },

    mounted() {
        console.log('mounted graphInstance');
        this.buildGraph();
    },

    beforeDestroy() {
        this.destroyGraph();
    },

    computed: {

        formattedData: function () {
            console.log('----start formattedData----');
            console.log(this.refreshToggle); //this is actually needed. TODO: Make it not needed

            let projectedPCDeathSingleTarget = -1;
            let projectedPCDeathSpreadDamage = -1;

            //X-Axis Labels and Health Over Time
            let labelsList = [];
            let playerHPSingleTargetData = [];
            let playerHPSpreadDamageData = [];
            let playerHPPointStylesSingleTarget = [];
            let playerHPPointStylesSpreadDamage = [];
            let monsterData = [];

            let defaultPointStyle = 'circle';
            let deathPointStyle = 'crossRot';

            let currentPlayerHPSingleTarget = this.f5.playerlevels[this.playerLevel].average_hp;
            let currentPlayerHPSpreadDamage = this.f5.playerlevels[this.playerLevel].average_hp;
            let cumulativeMonsterDamagePerRound = [];

            //Loop through turns
            for (let roundIndex = 0; roundIndex < this.combatRounds; roundIndex++) {
                let playerDamageThisRound = this.playerAverageDamage();
                cumulativeMonsterDamagePerRound[roundIndex] = 0;

                labelsList[roundIndex] = this.f5.misc.round_num.replace(':round_number', roundIndex + 1);

                //Loop through all monsters in the encounter
                for (let monsterIndex = 0; monsterIndex < this.encounterData.length; monsterIndex++) {
                    let monster = this.encounterData[monsterIndex];
                    
                    //Initialize monster data if it doesn't exist
                    if(!monsterData[monsterIndex]) {
                        monsterData[monsterIndex] = {
                            name: monster.name,
                            //hitChance: this.calcHitChance(monster.ac),
                            damageData: [],
                            maxDamageData: [],
                            hpData: [],
                            hpPointStyles: [],
                            projectedDeathRound: -1,
                            mythicRecoveryRound: -1,
                            currentHP: monster.hp,
                            maxHP: monster.hp,
                            regenerate: 0,
                            mythicRecovery: monster.mythicRecovery,
                            mythicTraitActive: false,
                        };
                    }

                    //TODO: Assumes monster goes first (damage is cumulated before checking HP). Does that need to change?
                    let roundDamage = 0;
                    let roundMaxDamage = 0;
                    let roundRegen = 0;

                    if(monsterData[monsterIndex].currentHP > 0 && monster.hasOwnProperty('projections') && monster.projections[roundIndex]) {
                        //Set turn data based on mythics or not
                        let turnData = monster.projections[roundIndex].standardTurn;
                        if(monsterData[monsterIndex].mythicTraitActive) {
                            turnData = monster.projections[roundIndex].mythicTurn;
                        }

                        if(turnData.hasOwnProperty('damage') && turnData.damage > 0) {
                            roundDamage = turnData.damage;
                        }
                        if(turnData.hasOwnProperty('maxDamage') && turnData.maxDamage > 0) {
                            roundMaxDamage = turnData.maxDamage;
                        }
                        if(turnData.hasOwnProperty('regenerate') && turnData.regenerate > 0) {
                            roundRegen = turnData.regenerate;
                        }
                    }

                    monsterData[monsterIndex].damageData[roundIndex] = roundDamage;
                    cumulativeMonsterDamagePerRound[roundIndex] += roundDamage;
                    monsterData[monsterIndex].maxDamageData[roundIndex] = roundMaxDamage;
                    monsterData[monsterIndex].hpData[roundIndex] = monsterData[monsterIndex].currentHP;

                    //Reduce Monster Current HP
                    if (monsterData[monsterIndex].currentHP === 0) {
                        monsterData[monsterIndex].hpPointStyles[roundIndex] = deathPointStyle;
                        if (monsterData[monsterIndex].projectedDeathRound === -1) {
                            monsterData[monsterIndex].projectedDeathRound = roundIndex;
                        }
                    } else {
                        monsterData[monsterIndex].hpPointStyles[roundIndex] = defaultPointStyle;
                    }

                    if (monsterData[monsterIndex].currentHP + monsterData[monsterIndex].regenerate + roundRegen > playerDamageThisRound) {
                        //Player damage less than Monster HP / regenerate: Monster lives
                        monsterData[monsterIndex].currentHP = monsterData[monsterIndex].currentHP + monsterData[monsterIndex].regenerate + roundRegen - playerDamageThisRound;
                        playerDamageThisRound = 0;
                        if(monsterData[monsterIndex].currentHP > monsterData[monsterIndex].maxHP) {
                            monsterData[monsterIndex].currentHP = monsterData[monsterIndex].maxHP;
                        }
                    } else {
                        //Player damage greater than Monster HP: Monster dies
                        playerDamageThisRound = playerDamageThisRound - monsterData[monsterIndex].currentHP;
                        if(monsterData[monsterIndex].mythicRecovery) {
                            monsterData[monsterIndex].currentHP = monsterData[monsterIndex].maxHP;
                            monsterData[monsterIndex].mythicRecovery = false;
                            monsterData[monsterIndex].mythicRecoveryRound = roundIndex;
                            monsterData[monsterIndex].mythicTraitActive = true;
                            //TODO: Announce this somehow
                        } else {
                            monsterData[monsterIndex].currentHP = 0;
                        }
                    }
                }

                //Player HP
                //Single Target
                playerHPSingleTargetData[roundIndex] = currentPlayerHPSingleTarget;
                if (currentPlayerHPSingleTarget === 0) {
                    playerHPPointStylesSingleTarget[roundIndex] = deathPointStyle;
                    if (projectedPCDeathSingleTarget === -1) {
                        projectedPCDeathSingleTarget = roundIndex;
                    }
                } else {
                    playerHPPointStylesSingleTarget[roundIndex] = defaultPointStyle;
                }
                currentPlayerHPSingleTarget = (currentPlayerHPSingleTarget > cumulativeMonsterDamagePerRound[roundIndex]) ? currentPlayerHPSingleTarget - cumulativeMonsterDamagePerRound[roundIndex] : 0;
                
                //Multitarget Spread Damage
                playerHPSpreadDamageData[roundIndex] = currentPlayerHPSpreadDamage;
                if (currentPlayerHPSpreadDamage === 0) {
                    playerHPPointStylesSpreadDamage[roundIndex] = deathPointStyle;
                    if (projectedPCDeathSpreadDamage === -1) {
                        projectedPCDeathSpreadDamage = roundIndex;
                    }
                } else {
                    playerHPPointStylesSpreadDamage[roundIndex] = defaultPointStyle;
                }
                currentPlayerHPSpreadDamage = (currentPlayerHPSpreadDamage > cumulativeMonsterDamagePerRound[roundIndex] / this.playerCount) ? currentPlayerHPSpreadDamage - (cumulativeMonsterDamagePerRound[roundIndex] / this.playerCount) : 0;
            }

            return {
                monsterData: monsterData,
                playerHPSingleTargetData: playerHPSingleTargetData,
                playerHPSpreadDamageData: playerHPSpreadDamageData,
                labelsList: labelsList,
                defaultPointStyle: defaultPointStyle,
                playerHPPointStylesSingleTarget: playerHPPointStylesSingleTarget,
                playerHPPointStylesSpreadDamage: playerHPPointStylesSpreadDamage,
                projectedPCDeathSingleTarget: projectedPCDeathSingleTarget,
                projectedPCDeathSpreadDamage: projectedPCDeathSpreadDamage,
            }
        },

    },

    methods: {
        buildGraph: function () {
            const canvasId = 'encounter-graph';
            let graphInstance = Chart.getChart(canvasId);
            if (graphInstance) {
                console.log('buildGraph(): exists');
                this.graphInstance = graphInstance;
                this.updateGraph();
            } else {
                console.log('buildGraph(): instantiate');
                const ctx = document.getElementById(canvasId);
                this.graphInstance = new Chart(ctx, this.graphProperties());
                this.graphInstance.options.plugins.title.text = this.f5.misc.title_combat_projection;
            }
        },

        destroyGraph: function () {
            this.graphInstance.destroy();
        },

        updateGraph: function () {
            console.log('updateGraph()');
            console.log(this.encounterData);
            this.refreshToggle = !this.refreshToggle;
            if (!this.graphInstance) {
                this.buildGraph();
            }
            this.graphInstance.data = this.graphData();
            this.graphInstance.update();
        },

        graphData: function () {
            let formattedData = this.formattedData;

            console.log('formattedData');
            console.log(formattedData);

            let colorSet1 = this.randomColourSet('blue');
            let colorSet2 = this.randomColourSet('green');

            let data = {
                labels: formattedData.labelsList,
                datasets: [
                    {
                        label: this.f5.misc.graph_data_player_hp,
                        data: formattedData.playerHPSingleTargetData,
                        backgroundColor: colorSet1.half,
                        borderColor: colorSet1.full,
                        borderWidth: 3,
                        pointStyle: formattedData.playerHPPointStylesSingleTarget,
                        pointRadius: 5,
                        pointHoverRadius: 10
                    },
                    {
                        label: this.f5.misc.graph_data_player_hp_spread,
                        data: formattedData.playerHPSpreadDamageData,
                        backgroundColor: colorSet2.half,
                        borderColor: colorSet2.full,
                        borderWidth: 3,
                        pointStyle: formattedData.playerHPPointStylesSpreadDamage,
                        pointRadius: 5,
                        pointHoverRadius: 10
                    }
                ]
            };

            for(let monster of formattedData.monsterData) {
                console.log('monster');
                console.log(monster);
                let colorSet3 = this.randomColourSet('red');

                // data.datasets.push({
                //     label: this.f5.misc.graph_data_monster_damage.replace(':creature_name', monster.name),
                //     data: monster.damageData,
                //     backgroundColor: colorSet1.half,
                //     borderColor: colorSet1.full,
                //     borderWidth: 3,
                //     pointStyle: monster.defaultPointStyle,
                //     pointRadius: 5,
                //     pointHoverRadius: 10
                // });
                // data.datasets.push({
                //     label: this.f5.misc.graph_data_monster_max_damage.replace(':creature_name', monster.name),
                //     data: monster.maxDamageData,
                //     backgroundColor: colorSet2.half,
                //     borderColor: colorSet2.full,
                //     borderWidth: 3,
                //     pointStyle: monster.defaultPointStyle,
                //     pointRadius: 5,
                //     pointHoverRadius: 10
                // });
                data.datasets.push({
                    label: this.f5.misc.graph_data_monster_hp.replace(':creature_name', monster.name),
                    data: monster.hpData,
                    backgroundColor: colorSet3.half,
                    borderColor: colorSet3.full,
                    borderWidth: 3,
                    pointStyle: monster.hpPointStyles,
                    pointRadius: 5,
                    pointHoverRadius: 10
                });
            }

            console.log('graphData');
            console.log(data);

            return data;
        },

        graphProperties: function () {

            let data = {
                type: "line",
                data: this.graphData(),
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: this.f5.misc.title_combat_projection.replace(':creature_name', this.name)
                        }
                    }
                }
            };

            return data;
        },
        
        playerAverageDamage: function () {
            let levelData = this.f5.playerlevels[this.playerLevel];
            let playerDamage = this.playerCount * levelData.average_dpr;
            return playerDamage;; // * this.playerData.hit_chance; TODO: Add hit chance?? Maybe??
        },
        
        randomColourSet: function(defaultColor = null, alpha = 0.5) {
            let s = 255;
            let r = (defaultColor == 'red') ? s : Math.round(Math.random()*s);
            let g = (defaultColor == 'green') ? s : Math.round(Math.random()*s);
            let b = (defaultColor == 'blue') ? s : Math.round(Math.random()*s);

            let colorBase = 'rgba(' + r + ',' + g + ',' + b;
            let colourSet = {
                full: colorBase + ')',
                half: colorBase+', '+alpha+')',
            };
            return colourSet;
        },

        calcHitChance: function(ac) {
            let levelData = this.f5.playerlevels[this.playerLevel];
            let toHitModifier = levelData.proficiency + levelData.average_modifier;
            let hitChance = ( 21 - ( ac - (toHitModifier) )) / 20;
            return hitChance;
        },

    },
}