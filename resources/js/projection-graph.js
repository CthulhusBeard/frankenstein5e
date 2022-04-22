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
      console.log('watch name');
      this.updateGraph();
    },
    monster_damage: {
      handler(val) {
        console.log('watch data');
        this.updateGraph();
      },
      deep: true
    },
    player_data: {
      handler(val) {
        console.log('watch player_data');
        this.updateGraph();
      },
      deep: true
    },
  },

  mounted() {
    console.log('mounted graphInstance '+this.id+ ' / '+this.name );
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
      console.log('graphData '+this.id+ ' / '+this.name );
      console.log(this.monster_damage);

      //X-Axis Labels and Health Over Time
      let labelsList = [];
      let monsterHPData = [];
      let monsterHPPointStyles = [];
      let playerHPData = [];
      let playerHPPointStyles = [];
      let damageData = [];

      let defaultPointStyle = 'circle';
      let deathPointStyle = 'crossRot';

      let monsterHP = this.monster_hp;
      let playerDamage = this.playerAverageDamage;
      let playerHP = this.f5.playerlevels[this.player_data.level].average_hp;
      
      for(let i = 0; i < this.combat_rounds; i++) {
        labelsList.push(this.f5.misc.round_num.replace(':round_number', i+1));
        let roundDamage = (this.monster_damage[i]) ? this.monster_damage[i].damage : 0;
        damageData.push(roundDamage);

        monsterHPData.push(monsterHP);
        if(monsterHP === 0) {
          monsterHPPointStyles.push(deathPointStyle);
        } else {
          monsterHPPointStyles.push(defaultPointStyle);
        }
        monsterHP = (monsterHP > playerDamage) ? monsterHP - playerDamage : 0;

        playerHPData.push(playerHP);
        if(playerHP === 0) {
          playerHPPointStyles.push(deathPointStyle);
        } else {
          playerHPPointStyles.push(defaultPointStyle);
        }
        playerHP = (playerHP > roundDamage) ? playerHP - roundDamage : 0;
      }

      let data = {
        labels: labelsList,
        datasets: [
          {
            label: this.f5.misc.graph_data_monster_damage.replace(':creature_name', this.name),
            data: damageData,
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
            pointStyle: defaultPointStyle,
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: this.f5.misc.graph_data_monster_hp.replace(':creature_name', this.name),
            data: monsterHPData,
            backgroundColor: "rgba(71,183,132,.5)",
            borderColor: "#47b784",
            borderWidth: 3,
            pointStyle: monsterHPPointStyles,
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: this.f5.misc.graph_data_player_hp,
            data: playerHPData,
            backgroundColor: "rgba(183,71,132,.5)",
            borderColor: "#b74784",
            borderWidth: 3,
            pointStyle: playerHPPointStyles,
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