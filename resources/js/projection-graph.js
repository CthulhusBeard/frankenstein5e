import Chart from 'chart.js/auto';

export {ProjectionGraph as default}

var ProjectionGraph = {
  props: ['id', 'data'],
  template: '#template-projection-graph',
  data: function () {
    return {
      graphInstance: null,
    }
  },

  mounted() {
    console.log('mounted graphInstance '+this.$parent.value.id+ ' / '+this.$parent.value.name );
    this.buildGraph();
  },

  beforeDestroy() {
    this.destroyGraph();
  },

  computed: {
    graphId: function() {
      return this.$parent.value.id;
    },
  },

  methods: {
    buildGraph: function() {
      const canvasId = 'projection-graph-'+this.$parent.value.id;
      console.log('Build graph: '+this.$parent.value.name+' - '+this.$parent.value.id);
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
      console.log('updateGraph '+this.$parent.value.id+ ' / '+this.$parent.value.name );
      if(!this.graphInstance) {
        this.buildGraph();
      }
      this.graphInstance.data = this.graphData();
      this.graphInstance.options.plugins.title.text = this.$parent.value.name+' Fight Projection';
      this.graphInstance.update();
    },

    graphData: function() {
      console.log('graphData '+this.$parent.value.id+ ' / '+this.$parent.value.name );
      console.log(this.data);

      //X-Axis Labels and Health Over Time
      let labelsList = [];
      let monsterHPData = [];
      let playerHPData = [];
      let damageData = [];

      let monsterHP = this.$parent.returnHP();
      let playerDamage = this.$parent.playerAverageDamage();
      let playerHP = this.$parent.$parent.f5.playerlevels[this.$parent.$parent.editor.player_characters.level].average_hp;
      
      for(let i = 0; i < this.$parent.$parent.editor.round_tracker; i++) {
        labelsList.push(this.$parent.$parent.f5.misc.round_num.replace(':round_number', i+1));
        let roundDamage = (this.data[i]) ? this.data[i].damage : 0;
        damageData.push(roundDamage);

        monsterHPData.push(monsterHP);
        monsterHP = (monsterHP > playerDamage) ? monsterHP - playerDamage : 0;

        playerHPData.push(playerHP);
        playerHP = (playerHP > roundDamage) ? playerHP - roundDamage : 0;
      }

      let data = {
        labels: labelsList,
        datasets: [
          {
            label: this.$parent.value.name+" Damage",
            data: damageData,
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: this.$parent.value.name+" Hit Points",
            data: monsterHPData,
            backgroundColor: "rgba(71,183,132,.5)",
            borderColor: "#47b784",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: "Player Hit Points",
            data: playerHPData,
            backgroundColor: "rgba(183,71,132,.5)",
            borderColor: "#b74784",
            borderWidth: 3,
            pointStyle: 'circle',
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
              text: this.$parent.value.name+' Fight Projection'
            }
          }
        }
      };

      return data;
    }
  
  },
}