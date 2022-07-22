<script type="text/x-template" id="template-encounter-graph"> 
    <div class="graph">
        <canvas id="encounter-graph"></canvas>

        <button @click="updateGraph">FORCE UPDATE</button>
        
        <div class="turn-breakdown">
            <div v-for="(turn, i) in monster_damage" class="turn-display" :data-turn-id="i">
                <label><strong>@{{ f5.misc.round_num.replace(':round_number', i+1) }}:</strong></label>

                <div v-if="i === formattedData.projectedPCDeath">@{{f5.misc.expected_player_death}}</div>
                <div v-if="i === formattedData.projectedMonsterDeath">@{{f5.misc.expected_monster_death.replace(':creature_name', name)}}</div>

                <div v-for="actionType in ['passive', 'action', 'bonus_action', 'reaction', 'legendary_action', 'lair_action']" v-if="turn.abilities[actionType]" class="turn-ability" :data-ability="actionType">
                    <label><strong>@{{ f5.featureactiontypes[actionType].name }}:</strong></label>
                    <ul>
                        <li v-for="(action, j) in turn.abilities[actionType]"> 
                            @{{ action.name }}: @{{ action.damage }}
                        </li>
                    </ul>
                </div>

                <div>
                    @{{f5.misc.title_average_damage}}: @{{turn.damage}}
                </div>
                <div>
                @{{f5.misc.title_max_damage}}: @{{turn.maxDamage}}
                </div>
            </div>
        </div>
    </div>
</script>