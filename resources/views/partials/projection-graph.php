<script type="text/x-template" id="template-projection-graph"> 
    <div class="graph">
        <canvas :id="'projection-graph-'+graphId"></canvas>

        <button @click="updateGraph">FORCE UPDATE</button>
        
        <div class="raw">
            <div id="option options__damage-projection" name="options__damage-projection" v-html="data">
            </div>
        </div>
    </div>
</script>