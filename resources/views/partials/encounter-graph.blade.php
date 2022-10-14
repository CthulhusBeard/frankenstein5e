<script type="text/x-template" id="template-encounter-graph"> 
    <div class="graph">

        <button @click="updateGraph"> UPDATE GRAPH </button>

        <canvas id="encounter-graph"></canvas>

        <div class="turn-breakdown">
            <div v-for="round in combatRounds" class="turn-display" :data-turn-id="round-1">
                <label><strong>@{{ f5.misc.round_num.replace(':round_number', round) }}:</strong></label>
                <div v-if="round-1 === formattedData.projectedPCDeath">@{{f5.misc.expected_player_death}}</div>

                <div class="breakdown-monster" v-for="monster in formattedData.monsterData">
                    <label> @{{monster.name}} </label>

                    <div v-if="round-1 === monster.projectedDeath">@{{f5.misc.expected_monster_death.replace(':creature_name', monster.name)}}</div>
<!-- 
                    <div v-for="actionType in ['passive', 'action', 'bonus_action', 'reaction', 'legendary_action', 'lair_action']" v-if="turn.abilities[actionType]" class="turn-ability" :data-ability="actionType">
                        <label><strong>@{{ f5.featureactiontypes[actionType].name }}:</strong></label>
                        <ul>
                            <li v-for="(action, j) in turn.abilities[actionType]"> 
                                @{{ action.name }}: @{{ action.damage }}
                            </li>
                        </ul>
                    </div>
 -->
                    <div>
                        @{{f5.misc.title_average_damage}}: @{{monster.damageData[round-1]}}
                    </div>
                    <div>
                        @{{f5.misc.title_max_damage}}: @{{monster.maxDamageData[round-1]}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>