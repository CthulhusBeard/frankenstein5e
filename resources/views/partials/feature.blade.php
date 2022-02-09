<script type="text/x-template" id="stat-block__feature">
    <div class="stat-block__feature focus-edit">
        <span class="feature__title display-field">@{{displayName}}</span>
        <span class="feature__description display-field" v-html="descriptionText"></span>
        <div class="edit-field">
            <input type="text" class="feature__title" v-model="value.name" />
            <br/>
            <label>@{{$parent.f5.misc.title_feature_template}}</label>
            <select v-model="value.template">
                <option v-for="(template, i) in getValidTemplateTypes" :value="i">@{{template.name}}</option>
            </select>
            <br/>
            <!-- Attack -->
            <div class="feature__options" v-if="value.template == 'attack'">
                <div class="feature__description" v-html="descriptionText"></div>

                <label>@{{$parent.f5.misc.title_target_type}}:</label>
                <select v-model="value.targetType">
                    <option v-for="(aoe, i) in $parent.f5.areaofeffect" :value="i">@{{aoe.name}}</option>
                </select>
                <br/>
                <label>@{{$parent.f5.misc.title_attack_type}}:</label>
                <div v-for="(attackType, i) in $parent.f5.attacktypes">
                    <input type="radio" :id="'aoe_'+i" :value="i" v-model="value.attackType">
                    <label :for="'aoe_'+i">@{{attackType.name}}</label>
                </div>
                <label>@{{$parent.f5.misc.title_attack_ability}}:</label>
                <select v-model="value.attackAbility">
                    <option v-for="(ability, i) in $parent.f5.abilities" :value="i">@{{ability.name}}</option>
                </select>
                <div v-if="value.targetType == 'melee' || value.targetType == 'melee_or_ranged'">
                    <label>@{{$parent.f5.misc.title_reach_distance}}:</label>
                    <select v-model="value.attackReach">
                        <option v-for="i in $parent.f5.areaofeffect['melee'].range" :value="i">@{{i}}</option>
                    </select>
                </div>
                <div v-if="value.targetType == 'ranged' || value.targetType == 'melee_or_ranged'">
                    <label>@{{$parent.f5.misc.title_range_distance}}:</label>
                    <select v-model="value.attackRange.low">
                        <option v-for="i in $parent.f5.areaofeffect['ranged'].range" :value="i">@{{i}}</option>
                    </select>
                    /
                    <select v-model="value.attackRange.high">
                        <option v-for="i in $parent.f5.areaofeffect['ranged'].range" :value="i">@{{i}}</option>
                    </select>
                </div>
                <div>
                    <label>@{{$parent.f5.misc.title_targets}}:</label>
                    <select v-model="value.attackTargets">
                        <option v-for="i in 5" :value="i">@{{i}}</option>
                    </select>
                </div>

                <!-- Damage Options -->
                <label>@{{$parent.f5.misc.title_damage_dice}}:</label>
                <div class="feature__damage" v-for="(damage, index) in value.attackDamage">
                    <label>@{{$parent.f5.misc.dice_amount}}:</label>
                    <select id="feature__damage__hitdice-amount" name="feature__damage__hitdice-amount" v-model="damage.diceAmount">
                        <option value="0" >0</option>
                        <option v-for="i in 30" :value="i" >@{{i}}</option>
                    </select>
                    <br/>
                    <label>@{{$parent.f5.misc.dice_type}}:</label>
                    <select id="feature__damage__hitdice-type" name="feature__damage__hitdice-type" v-model="damage.diceType">
                        <option v-for="i in $parent.f5.dicetypes" :value="i" >@{{i}}</option>
                    </select>
                    <br/>
                    <label>@{{$parent.f5.misc.title_ability_bonus}}</label>
                    <input type="checkbox" v-model="damage.abilityBonus">
                    <br/>
                    <label>@{{$parent.f5.misc.additional}}:</label>
                    <input type="number" min="0" max="9999" id="feature__damage__hitpoints-additional" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                    <br/>
                    <label>@{{$parent.f5.misc.title_damage_type}}:</label>
                    <select id="feature__damage__damage-type" name="feature__damage__damage-type" v-model="damage.type">
                        <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                    </select>

                    <div class="feature__remove-damage" @click="removeDamageDie('attackDamage', index)">x</div>
                </div>
                <button @click="addDamageDie('attackDamage')">+ Damage Die</button>

                <br/>
                <br/>


                <!-- Ongoing Damage Options -->
                <label>@{{$parent.f5.misc.title_ongoing_damage}}</label>
                <input type="checkbox" v-model="value.hasOngoingDamage">
                <div v-if="value.hasOngoingDamage">
                    
                    <div>
                        <input name="occurs_start" type="radio" value="start" v-model="value.ongoingDamageOccurs">
                        <label for="occurs_start">@{{$parent.f5.timepoints.start_of_turn.name}}</label>
                        <input name="occurs_end" type="radio" value="end" v-model="value.ongoingDamageOccurs">
                        <label for="occurs_end">@{{$parent.f5.timepoints.end_of_turn.name}}</label>
                    </div>
                    
                    <div v-for="(duration, i) in $parent.durations">
                        <input type="radio" value="start" v-model="value.ongoingDamageDuration">
                        <label :for="'duration_'+i">@{{duration.name}}</label>
                    </div>

                    <label>@{{$parent.f5.misc.title_repeat_save}}:</label>
                    <input type="checkbox" v-model="value.ongoingDamageRepeatSave">
                    <br/>

                    <label>@{{$parent.f5.misc.title_damage_dice}}:</label>
                    <div class="feature__damage" v-for="(damage, index) in value.ongoingDamage">
                        <label>@{{$parent.f5.misc.dice_amount}}:</label>
                        <select id="feature__damage__hitdice-amount" name="feature__damage__hitdice-amount" v-model="damage.diceAmount">
                            <option value="0" >0</option>
                            <option v-for="i in 30" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{$parent.f5.misc.dice_type}}:</label>
                        <select id="feature__damage__hitdice-type" name="feature__damage__hitdice-type" v-model="damage.diceType">
                            <option v-for="i in $parent.f5.dicetypes" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{$parent.f5.misc.title_ability_bonus}}</label>
                        <input type="checkbox" v-model="damage.abilityBonus">
                        <br/>
                        <label>@{{$parent.f5.misc.additional}}:</label>
                        <input type="number" min="0" max="9999" id="feature__damage__hitpoints-additional" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                        <br/>
                        <label>@{{$parent.f5.misc.title_damage_type}}:</label>
                        <select id="feature__damage__damage-type" name="feature__damage__damage-type" v-model="damage.type">
                            <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                        </select>

                        <div class="feature__remove-damage" @click="removeDamageDie('attackDamage', index)">x</div>
                    </div>
                    <button @click="addDamageDie('attackDamage')">+ Damage Die</button>
                </div>

                <br/>


                <label>@{{$parent.f5.misc.title_additional_saving_throw}}</label>
                <input type="checkbox" v-model="value.attackSavingThrow">


                <div v-if="(value.template == 'attack' && value.attackSavingThrow) || value.template == 'saving_throw'" v-bind:class="{attackBorder : value.template == 'attack'}">
                    <label>@{{$parent.f5.misc.title_saving_throw_monster_ability}}:</label>
                    <select v-model="value.savingThrowMonsterAbility">
                        <option v-for="(ability, i) in $parent.f5.abilities" :value="i">@{{ability.name}}</option>
                    </select>
                    <br/>

                    <label>@{{$parent.f5.misc.title_saving_throw_ability}}:</label>
                    <Multiselect class="edit-field edit-field--flex"
                        :placeholder="$parent.f5.misc.choose_abilities"
                        v-model="value.savingThrowSaveAbilities" 
                        :options="$parent.f5.abilities" 
                        mode="tags"
                        :close-on-select="false"
                        :searchable="true"
                        :create-option="true"
                    >
                        <template v-slot:tag="{ option, handleTagRemove, disabled }">
                            <div class="multiselect-tag">
                                @{{ option.label.name }}
                                <span v-if="!disabled" class="multiselect-tag-remove" @mousedown.prevent="handleTagRemove(option, $event)">
                                    <span class="multiselect-tag-remove-icon"></span>
                                </span>
                            </div>
                        </template>

                        <template v-slot:option="{ option }">
                            @{{ option.label.name }}
                        </template>
                    </Multiselect>
                    <br/>

                    <label>@{{$parent.f5.misc.title_saving_throw_conditions}}:</label>
                    <Multiselect class="edit-field edit-field--flex"
                        :placeholder="$parent.f5.misc.choose_conditions"
                        v-model="value.savingThrowConditions" 
                        :options="$parent.f5.conditions" 
                        mode="tags"
                        :close-on-select="false"
                        :searchable="true"
                        :create-option="true"
                    >
                        <template v-slot:tag="{ option, handleTagRemove, disabled }">
                            <div class="multiselect-tag">
                                @{{ option.label.name }}
                                <span v-if="!disabled" class="multiselect-tag-remove" @mousedown.prevent="handleTagRemove(option, $event)">
                                    <span class="multiselect-tag-remove-icon"></span>
                                </span>
                            </div>
                        </template>

                        <template v-slot:option="{ option }">
                            @{{ option.label.name }}
                        </template>
                    </Multiselect>
                    <br/>

                    <label>@{{$parent.f5.misc.title_half_on_success}}:</label>
                    <input type="checkbox" v-model="value.savingThrowHalfOnSuccess">
                    <br/>
                    

                    <!-- Saving Throw Damage Options -->
                    <label>@{{$parent.f5.misc.title_damage_dice}}:</label>
                    <div class="feature__damage" v-for="(damage, index) in value.savingThrowDamage">
                        <label>@{{$parent.f5.misc.dice_amount}}:</label>
                        <select id="feature__damage__hitdice-amount" name="feature__damage__hitdice-amount" v-model="damage.diceAmount">
                            <option value="0" >0</option>
                            <option v-for="i in 30" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{$parent.f5.misc.dice_type}}:</label>
                        <select id="feature__damage__hitdice-type" name="feature__damage__hitdice-type" v-model="damage.diceType">
                            <option v-for="i in $parent.f5.dicetypes" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{$parent.f5.misc.title_ability_bonus}}</label>
                        <input type="checkbox" v-model="damage.abilityBonus">
                        <br/>
                        <label>@{{$parent.f5.misc.additional}}:</label>
                        <input type="number" min="0" max="9999" id="feature__damage__hitpoints-additional" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                        <br/>
                        <label>@{{$parent.f5.misc.title_damage_type}}:</label>
                        <select id="feature__damage__damage-type" name="feature__damage__damage-type" v-model="damage.type">
                            <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                        </select>

                        <div class="feature__remove-damage" @click="removeDamageDie('savingThrowDamage', index)">x</div>
                    </div>
                    <button @click="addDamageDie('savingThrowDamage')">+ Damage Die</button>
                </div>
            </div>

            <!-- Saving Throw -->


            <!-- Custom -->
            <div class="feature__options" v-if="value.template == 'custom'">
                <textarea rows="5" class="feature__description" v-model="value.customDescription"></textarea>
            </div>
        </div>
        <div class="feature__remove" @click="$emit('remove-feature', value.actionType, value.id)">x</div>
    </div>
</script>
