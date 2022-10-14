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
        }
    },

    watch: {
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
        playerAverageDamage: function () {
            let levelData = this.f5.playerlevels[this.playerData.level];
            let playerDamage = this.playerData.number * levelData.average_dpr;
            return playerDamage * this.playerData.hit_chance;
        },

        formattedData: function () {

            let projectedPCDeath = -1;

            //X-Axis Labels and Health Over Time
            let labelsList = [];
            let playerHPData = [];
            let playerHPPointStyles = [];
            let monsterData = [];

            let defaultPointStyle = 'circle';
            let deathPointStyle = 'crossRot';

            let playerHP = this.f5.playerlevels[this.playerData.level].average_hp;
            let cumulativeMonsterDamagePerRound = [];

            //Loop through turns
            for (let roundIndex = 0; roundIndex < this.combatRounds; roundIndex++) {
                let playerDamageThisRound = this.playerAverageDamage;
                cumulativeMonsterDamagePerRound[roundIndex] = 0;

                labelsList[roundIndex] = this.f5.misc.round_num.replace(':round_number', roundIndex + 1);

                //Loop through all monsters in the encounter
                for (let monsterIndex = 0; monsterIndex < this.encounterData.length; monsterIndex++) {
                    let monster = this.encounterData[monsterIndex];
                    
                    //Initialize monster data if it doesn't exist
                    if(!monsterData[monsterIndex]) {
                        monsterData[monsterIndex] = {
                            name: monster.name,
                            damageData: [],
                            maxDamageData: [],
                            hpData: [],
                            hpPointStyles: [],
                            projectedDeath: -1,
                            currentHP: monster.hp,
                        };
                    }

                    //TODO: Assumes monster goes first (damage is cumulated before checking HP). Does that need to change?
                    let roundDamage = (monster.hasOwnProperty('projections') && monster.projections[roundIndex]) ? monster.projections[roundIndex].damage : 0;
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
                    if (monsterData[monsterIndex].currentHP > playerDamageThisRound) {
                        //Monster lives
                        monsterData[monsterIndex].currentHP = monsterData[monsterIndex].currentHP - playerDamageThisRound;
                        playerDamageThisRound = 0;
                    } else {
                        //Monster dies
                        playerDamageThisRound -= monsterData[monsterIndex].currentHP;
                        monsterData[monsterIndex].currentHP = 0
                    }
                }

                //Player HP
                playerHPData[roundIndex] = playerHP;
                if (playerHP === 0) {
                    playerHPPointStyles[roundIndex] = deathPointStyle;
                    if (projectedPCDeath === -1) {
                        projectedPCDeath = i;
                    }
                } else {
                    playerHPPointStyles[roundIndex] = defaultPointStyle;
                }
                playerHP = (playerHP > cumulativeMonsterDamagePerRound[roundIndex]) ? playerHP - cumulativeMonsterDamagePerRound[roundIndex] : 0;
            }

            return {
                monsterData: monsterData,
                playerHPData: playerHPData,
                labelsList: labelsList,
                defaultPointStyle: defaultPointStyle,
                playerHPPointStyles: playerHPPointStyles,
                projectedPCDeath: projectedPCDeath,
            }
        },

    },

    methods: {
        buildGraph: function () {
            const canvasId = 'encounter-graph';
            console.log('Build graph');
            let graphInstance = Chart.getChart(canvasId);
            if (graphInstance) {
                this.graphInstance = graphInstance;
                this.updateGraph();
            } else {
                const ctx = document.getElementById(canvasId);
                this.graphInstance = new Chart(ctx, this.graphProperties());
            }
        },

        destroyGraph: function () {
            this.graphInstance.destroy();
        },

        updateGraph: function () {
            console.log('updateGraph');
            if (!this.graphInstance) {
                this.buildGraph();
            }
            this.graphInstance.data = this.graphData();

            this.graphInstance.options.plugins.title.text = this.f5.misc.title_combat_projection.replace(':creature_name', this.name);
            this.graphInstance.update();
        },

        graphData: function () {
            let formattedData = this.formattedData;

            console.log('formattedData');
            console.log(formattedData);

            let data = {
                labels: formattedData.labelsList,
                datasets: [
                    {
                        label: this.f5.misc.graph_data_player_hp,
                        data: formattedData.playerHPData,
                        backgroundColor: "rgba(71,132,183,.5)",
                        borderColor: "#4784b7",
                        borderWidth: 3,
                        pointStyle: formattedData.playerHPPointStyles,
                        pointRadius: 5,
                        pointHoverRadius: 10
                    }
                ]
            };

            for(let monster of formattedData.monsterData) {
                data.datasets.push({
                    label: this.f5.misc.graph_data_monster_damage.replace(':creature_name', monster.name),
                    data: monster.damageData,
                    backgroundColor: "rgba(183,71,132,.5)",
                    borderColor: "#b74784",
                    borderWidth: 3,
                    pointStyle: monster.defaultPointStyle,
                    pointRadius: 5,
                    pointHoverRadius: 10
                });
                data.datasets.push({
                    label: this.f5.misc.graph_data_monster_max_damage.replace(':creature_name', monster.name),
                    data: monster.maxDamageData,
                    backgroundColor: "rgba(54,73,93,.5)",
                    borderColor: "#36495d",
                    borderWidth: 3,
                    pointStyle: monster.defaultPointStyle,
                    pointRadius: 5,
                    pointHoverRadius: 10
                });
                data.datasets.push({
                    label: this.f5.misc.graph_data_monster_hp.replace(':creature_name', monster.name),
                    data: monster.monstersHPData,
                    backgroundColor: "rgba(71,183,132,.5)",
                    borderColor: "#47b784",
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
        }

    },
}