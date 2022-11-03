import Chart from 'chart.js/auto';

export default {
    props: [
        'encounterData',
        'playerData',
        'combatRounds',
        'f5'
    ],

    template: '#template-encounter-graph',

    data: function () {
        return {
            graphInstance: null,
            refreshToggle: true, //TODO Make this not necessary
        }
    },

    watch: { //TODO: Remove this and update when a user switches to the graph tab
        playerData: {
            handler(val) {
                this.updateGraph();
            },
            deep: true
        },
        encounterData: {
            handler(val) {
                this.updateGraph();
            },
            deep: true
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
            console.log(this.encounterData);
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

            let currentPlayerHPSingleTarget = this.f5.playerlevels[this.playerData.level].average_hp;
            let currentPlayerHPSpreadDamage = this.f5.playerlevels[this.playerData.level].average_hp;
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
                            projectedDeath: -1,
                            currentHP: monster.hp,
                            maxHP: monster.hp,
                            regenerate: 0,
                            mythicRecovery: false,
                        };
                    }

                    //TODO: Assumes monster goes first (damage is cumulated before checking HP). Does that need to change?
                    console.log('monster.projections');
                    console.log(monster.projections);

                    let roundDamage = (monster.hasOwnProperty('projections') && monster.projections[roundIndex]) ? monster.projections[roundIndex].damage : 0;
                    let roundRegen = (monster.hasOwnProperty('projections') && monster.projections[roundIndex] && monster.projections[roundIndex].regenerate > 0) ? monster.projections[roundIndex].regenerate : 0;
                    monsterData[monsterIndex].damageData[roundIndex] = roundDamage;
                    cumulativeMonsterDamagePerRound[roundIndex] += roundDamage;
                    monsterData[monsterIndex].maxDamageData[roundIndex] = (monster.hasOwnProperty('projections') && monster.projections[roundIndex]) ? monster.projections[roundIndex].maxDamage : 0;
                    monsterData[monsterIndex].hpData[roundIndex] = monsterData[monsterIndex].currentHP;

                    //Reduce Monster Current HP
                    if (monsterData[monsterIndex].currentHP === 0) {
                        monsterData[monsterIndex].hpPointStyles[roundIndex] = deathPointStyle;
                        if (monsterData[monsterIndex].projectedDeath === -1) {
                            monsterData[monsterIndex].projectedDeath = roundIndex;
                        }
                    } else {
                        monsterData[monsterIndex].hpPointStyles[roundIndex] = defaultPointStyle;
                    }

                    console.log(monsterData[monsterIndex].currentHP +' / '+ monsterData[monsterIndex].regenerate + ' / ' + roundRegen +' > '+ playerDamageThisRound);
                    if (monsterData[monsterIndex].currentHP + monsterData[monsterIndex].regenerate + roundRegen > playerDamageThisRound) {
                        //Player damage less than Monster HP / regenerate: Monster lives
                        console.log('change monster health');
                        console.log('was '+monsterData[monsterIndex].currentHP);
                        monsterData[monsterIndex].currentHP = monsterData[monsterIndex].currentHP + monsterData[monsterIndex].regenerate + roundRegen - playerDamageThisRound;
                        playerDamageThisRound = 0;
                        if(monsterData[monsterIndex].currentHP > monsterData[monsterIndex].maxHP) {
                            monsterData[monsterIndex].currentHP = monsterData[monsterIndex].maxHP;
                        }
                        console.log('was '+monsterData[monsterIndex].currentHP);
                    } else {
                        console.log('monster should die');
                        //Player damage greater than Monster HP: Monster dies
                        playerDamageThisRound = playerDamageThisRound - monsterData[monsterIndex].currentHP;
                        if(monsterData[monsterIndex].mythicRecovery) {
                            monsterData[monsterIndex].currentHP = monsterData[monsterIndex].maxHP;
                            monsterData[monsterIndex].mythicRecovery = false;
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
                currentPlayerHPSpreadDamage = (currentPlayerHPSpreadDamage > cumulativeMonsterDamagePerRound[roundIndex] / this.playerData.number) ? currentPlayerHPSpreadDamage - (cumulativeMonsterDamagePerRound[roundIndex] / this.playerData.number) : 0;
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

            let colorSet1 = this.randomColourSet();
            let colorSet2 = this.randomColourSet();

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
                let colorSet1 = this.randomColourSet();
                let colorSet2 = this.randomColourSet();
                let colorSet3 = this.randomColourSet();

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
            let levelData = this.f5.playerlevels[this.playerData.level];
            let playerDamage = this.playerData.number * levelData.average_dpr;
            return playerDamage;; // * this.playerData.hit_chance; TODO: Add hit chance?? Maybe??
        },
        
        randomColourSet: function(a = 0.5) {
            let o = Math.round, r = Math.random, s = 255;
            let colorBase = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
            let colourSet = {
                full: colorBase + ')',
                half: colorBase+', '+a+')',
            };
            console.log(colourSet);
            return colourSet;
        },

        calcHitChance: function(ac) {
            let levelData = this.f5.playerlevels[this.playerData.level];
            let toHitModifier = levelData.proficiency + levelData.average_modifier;
            let hitChance = ( 21 - ( ac - (toHitModifier) )) / 20;
            return hitChance;
        },

    },
}