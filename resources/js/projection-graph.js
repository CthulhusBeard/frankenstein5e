import Chart from 'chart.js/auto';

export {ProjectionGraph as default}

var ProjectionGraph = {
  props: [
    'id', 
    'name', 
    'monster_hp', 
    'monster_damage', 
    'player_data',
    'combat_rounds',
    'f5'
  ],

  template: '#template-projection-graph',

  data: function () {
    return {
      graphInstance: null,
    }
  },

  watch: {
    name(val) {
      this.updateGraph();
    },
    monster_hp(val) {
      this.updateGraph();
    },
    monster_damage: {
      handler(val) {
        this.updateGraph();
      },
      deep: true
    },
    player_data: {
      handler(val) {
        this.updateGraph();
      },
      deep: true
    },
  },

  mounted() {
    //console.log('mounted graphInstance '+this.id+ ' / '+this.name );
    this.buildGraph();
  },

  beforeDestroy() {
    this.destroyGraph();
  },

  computed: {
    graphId: function() {
      return this.id;
    },

    playerAverageDamage: function() {
        let levelData = this.f5.playerlevels[this.player_data.level];
        let playerDamage = this.player_data.number * levelData.average_dpr;
        return playerDamage * this.player_data.hit_chance;
    },

    formattedData: function() {

      console.log(this.monster_damage);

      let projectedPCDeath = -1;
      let projectedMonsterDeath = -1;

      //X-Axis Labels and Health Over Time
      let labelsList = [];
      let monsterHPData = [];
      let monsterHPPointStyles = [];
      let playerHPData = [];
      let playerHPPointStyles = [];
      let damageData = [];
      let maxDamageData = [];

      let defaultPointStyle = 'circle';
      let deathPointStyle = 'crossRot';

      let monsterHP = this.monster_hp;
      let playerDamage = this.playerAverageDamage;
      let playerHP = this.f5.playerlevels[this.player_data.level].average_hp;
      let cumulativeAverageDamage = 0;
      
      for(let i = 0; i < this.combat_rounds; i++) {
        labelsList.push(this.f5.misc.round_num.replace(':round_number', i+1));
        let roundDamage = (this.monster_damage[i]) ? this.monster_damage[i].damage : 0;
        damageData.push(roundDamage);
        cumulativeAverageDamage += roundDamage;
        maxDamageData.push((this.monster_damage[i]) ? this.monster_damage[i].maxDamage : 0);

        monsterHPData.push(monsterHP);
        if(monsterHP === 0) {
          monsterHPPointStyles.push(deathPointStyle);
          if(projectedMonsterDeath === -1) {
            projectedMonsterDeath = i;
          }
        } else {
          monsterHPPointStyles.push(defaultPointStyle);
        }
        monsterHP = (monsterHP > playerDamage) ? monsterHP - playerDamage : 0;

        playerHPData.push(playerHP);
        if(playerHP === 0) {
          playerHPPointStyles.push(deathPointStyle);
          if(projectedPCDeath === -1) {
            projectedPCDeath = i;
          }
        } else {
          playerHPPointStyles.push(defaultPointStyle);
        }
        playerHP = (playerHP > roundDamage) ? playerHP - roundDamage : 0;
      }

      return {
        damageData: damageData,
        maxDamageData: maxDamageData,
        cumulativeAverageDamage: cumulativeAverageDamage,
        playerHPData: playerHPData,
        monsterHPData: monsterHPData,
        labelsList: labelsList,
        defaultPointStyle: defaultPointStyle,
        monsterHPPointStyles: monsterHPPointStyles,
        playerHPPointStyles: playerHPPointStyles,
        projectedMonsterDeath: projectedMonsterDeath,
        projectedPCDeath: projectedPCDeath,
      }
    },

  },

  methods: {
    buildGraph: function() {
      const canvasId = 'projection-graph-'+this.id;
      console.log('Build graph: '+this.name+' - '+this.id);
      let graphInstance = Chart.getChart(canvasId);
      if(graphInstance) {
        this.graphInstance = graphInstance;
        this.updateGraph()
      } else {
        const ctx = document.getElementById(canvasId);
        this.graphInstance = new Chart(ctx, this.graphProperties());
      }
    },

    destroyGraph: function() {
      this.graphInstance.destroy();
    },

    updateGraph: function() {
      console.log('updateGraph '+this.id+ ' / '+this.name );
      if(!this.graphInstance) {
        this.buildGraph();
      }
      this.graphInstance.data = this.graphData();

      this.graphInstance.options.plugins.title.text = this.f5.misc.title_combat_projection.replace(':creature_name', this.name);
      this.graphInstance.update();
    },

    graphData: function() {
      let formattedData = this.formattedData;

      let data = {
        labels: formattedData.labelsList,
        datasets: [
          {
            label: this.f5.misc.graph_data_monster_damage.replace(':creature_name', this.name),
            data: formattedData.damageData,
            backgroundColor: "rgba(183,71,132,.5)",
            borderColor: "#b74784",
            borderWidth: 3,
            pointStyle: formattedData.defaultPointStyle,
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: this.f5.misc.graph_data_monster_max_damage.replace(':creature_name', this.name),
            data: formattedData.maxDamageData,
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
            pointStyle: formattedData.defaultPointStyle,
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: this.f5.misc.graph_data_monster_hp.replace(':creature_name', this.name),
            data: formattedData.monsterHPData,
            backgroundColor: "rgba(71,183,132,.5)",
            borderColor: "#47b784",
            borderWidth: 3,
            pointStyle: formattedData.monsterHPPointStyles,
            pointRadius: 5,
            pointHoverRadius: 10
          },
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

      return data;
    },

    graphProperties: function() {

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