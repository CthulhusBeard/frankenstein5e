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

    graphData: function() {

      let labelsList = [];
      for(let i = 0; i < this.$parent.$parent.editor.round_tracker; i++) {
        labelsList.push('[PH] Turn '+(i+1));
      }

      let data = {
        labels: labelsList,
        datasets: [
          {
            label: "Actions: "+this.$parent.value.name,
            data: [0, 0, 1, 2, 79, 82, 27, 14],
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: "Bonus Actions: ",
            data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
            backgroundColor: "rgba(71, 183,132,.5)",
            borderColor: "#47b784",
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
      console.log('graphData');
      console.log(this.data);

      let data = {
        type: "line",
        data: this.graphData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        }
      };

      return data;
    }
  },

  methods: {
    buildGraph: function() {
      const canvasId = 'projection-graph-'+this.$parent.value.id;
      console.log('Build graph: '+this.$parent.value.name+' - '+this.$parent.value.id);
      let graphInstance = Chart.getChart(canvasId);
      if(graphInstance) {
        this.graphInstance = graphInstance;
      } else {
        const ctx = document.getElementById(canvasId);
        this.graphInstance = new Chart(ctx, this.graphProperties);
      }
    },

    destroyGraph: function() {
      this.graphInstance.destroy();
    },

    updateGraph: function() {
      console.log('updateGraph '+this.$parent.value.id);
      if(!this.graphInstance) {
        this.buildGraph();
      }
      this.graphInstance.data = this.graphData;
      this.graphInstance.update();
    },
  
  },
}