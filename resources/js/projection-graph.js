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
      console.log(this.data);

      let data = {
        type: "line",
        data: {
          labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
          datasets: [
            {
              label: "Number of Moons",
              data: [0, 0, 1, 2, 79, 82, 27, 14],
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 10
            },
            {
              label: "Planetary Mass (relative to the Sun x 10^-6)",
              data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3,
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 10
            }
          ]
        },
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
      const ctx = document.getElementById('projection-graph-'+this.$parent.value.id);
      if(ctx) {
        this.graphInstance = ctx.getContext("2d");
      } else {
        this.graphInstance = new Chart(ctx, this.graphData);  
      }
    },

    destroyGraph: function() {
      this.graphInstance.destroy();
    },
  
  },
}