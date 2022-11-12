<script type="text/x-template" id="template-statblockfeature"> 
    <div class="stat-block__feature focus-edit">
        <div class="feature__display">
            <span class="feature__title {{--display-field--}}">@{{displayName}}</span>
            <span class="feature__description {{--display-field--}}" v-html="descriptionText"></span>
            <div class="feature__remove" @click="$emit('remove-feature', value.actionType, value.id)">x</div>
        </div>

        <div class="edit-feature edit-field">
            <label v-if="value.template === 'spellcasting'" class="title-label">@{{f5.misc.title_spellcasting_feature_name}}:</label>
            <label v-if="value.template === 'legendary_resistance'" class="title-label">@{{f5.featuretemplates.legendary_resistance.name}}:</label>
            <label v-else class="title-label">@{{f5.misc.title_feature_name}}:</label>
            <input v-if="value.template !== 'legendary_resistance'" type="text" class="feature__title" v-model="value.name" />
            <!-- TODO: REMOVE THIS -->
            <span>Avg DPR: @{{averageDPR}} / Max DPR: @{{maxDPR}}</span>

            <div v-if="value.template !== 'spellcasting' && value.template !== 'multiattack'">
                <label class="title-label">@{{f5.misc.title_feature_template}}:</label>
                <select v-model="value.template">
                    <option v-for="(template, i) in getValidTemplateTypes" v-if="i != 'spellcasting'" :value="i">@{{template.name}}</option>
                </select>
            </div>
            <!--<label v-if="value.template !== 'custom'">@{{f5.misc.title_feature_options}}:</label>-->
            <div class="feature__description" v-if="value.template !== 'custom'" v-html="descriptionEditText"></div>

            <!--Legendary Resistances -->
            <div v-if="value.template === 'legendary_resistance'">
                <label class="title-label">@{{f5.featuretemplates.legendary_resistance.name}}:</label>
                <select v-model="value.legendaryResistances">
                    <option v-for="i in 5" :value="i">@{{i}}</option>
                </select>
            </div>


            <!-- Custom -->
            <div class="feature__options feature__option-custom" v-if="value.template === 'custom'">
                <textarea rows="5" class="feature__description-textarea" v-model="value.customDescription"></textarea>
                
                <!-- Damage Options -->
                <div>
                    <label class="title-label">@{{f5.misc.title_damage_dice}}:</label>
                    <div class="feature__damage indent-margin" v-for="(damage, index) in value.customDamage">
                        <div>
                            <label class="title-label">@{{f5.misc.dice_amount}}:</label>
                            <select id="feature__damage__dice-amount" name="feature__damage__dice-amount" v-model="damage.diceAmount">
                                <option value="0" >0</option>
                                <option v-for="i in 30" :value="i" >@{{i}}</option>
                            </select>
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.dice_type}}:</label>
                            <select id="feature__damage__dice-type" name="feature__damage__dice-type" v-model="damage.diceType">
                                <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                            </select>
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.title_ability_bonus}}</label>
                            <input type="checkbox" v-model="damage.abilityBonus">
                        </div>
                        <div>
                            <label :for="'feature__damage__hitpoints-additional__'+value.id" class="title-label">@{{f5.misc.additional}}:</label>
                            <input type="number" min="0" max="9999" :id="'feature__damage__hitpoints-additional'+value.id" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                        </div>
                        <br/>
                        <div>
                            <label :for="'feature__damage__damage-type__'+value.id" class="title-label">@{{f5.misc.title_damage_type}}:</label>
                            <select :id="'feature__damage__damage-type__'+value.id" name="feature__damage__damage-type" v-model="damage.type">
                                <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                            </select>
                        </div>

                        <div class="feature__remove-damage" @click="removeDamageDie('customDamage', index)">x</div>
                    </div>
                    <button @click="addDamageDie('customDamage')">@{{f5.misc.title_add_damage_die}}</button>
                    <br/>
                    <br/>
                </div>
            </div>

            <!-- Multiattack -->
            <div class="feature__options feature__option-multiattack" v-if="value.template === 'multiattack'">
                <div class="feature__multiattack__group" v-for="(group, i) of value.multiattackReferences">
                    <div class="feature__multiattack__featureRef" v-for="(feature, j) in group">
                        <label :for="'feature__multiattack__ability__'+value.id" class="title-label">@{{f5.misc.title_feature}}:</label>
                        <select :id="'feature__multiattack__ability__'+value.id" name="feature__multiattack__ability" v-model="feature.id">
                            <option value="null" disabled selected>@{{f5.misc.title_select_feature}}</option>
                            <option v-for="(featureRef, k) in $parent.value.features['action']" :value="featureRef.trackingId">@{{featureRef.name}}</option>
                            <option v-for="(featureRef, k) in $parent.value.features['bonus_action']" :value="featureRef.trackingId">@{{featureRef.name}}</option>
                            <option v-for="(featureRef, k) in $parent.value.features['spellcasting']" :value="featureRef.trackingId">@{{featureRef.name}}</option>
                        </select>
                        <label :for="'feature__multiattack__num-of-attacks__'+value.id" class="title-label">@{{f5.misc.title_multiattack_number_of_uses}}:</label>
                        <select :id="'feature__multiattack__num-of-attacks__'+value.id" name="feature__multiattack__num-of-attacks" v-model="feature.uses">
                            <option v-for="k in 5" :value="k" >@{{k}}</option>
                        </select>
                        <div class="feature__multiattack__remove" @click="removeMultiattack(i, j)">x</div>
                    </div>
                    <button @click="addMultiattack(i)">@{{f5.misc.title_add_feature}}</button>
                    <div v-if="i === 0">@{{f5.misc.or.toUpperCase()}}</div>
                </div>
            </div>

            <!-- Existing Feature Reference (for legendary / mythic actions) -->
            <div class="feature__options feature__option-reference" v-if="value.template === 'reference'">
                <label :for="'feature__reference__ability__'+value.id" class="title-label">@{{f5.misc.title_feature}}:</label>
                <select :id="'feature__reference__ability__'+value.id" name="feature__reference__ability" v-model="value.existingFeatureReferenceId">
                    <option value="null" disabled selected>@{{f5.misc.title_select_feature}}</option>
                    <option v-for="(featureRef, k) in $parent.value.features['spellcasting']" :value="featureRef.trackingId">@{{featureRef.name}}</option>
                    <option v-for="(featureRef, k) in $parent.value.features['action']" :value="featureRef.trackingId">@{{featureRef.name}}</option>
                    <option v-for="(featureRef, k) in $parent.value.features['bonus_action']" :value="featureRef.trackingId">@{{featureRef.name}}</option>
                </select>
            </div>

            <!-- Spellcasting -->
            <div class="feature__options feature__option-spellcasting" v-if="value.template === 'spellcasting'">
                <div class="feature__spells">
                    <div class="feature__spellGroup" v-for="(spellLevelList, spellLevel) in value.spellList" v-if="f5.spelllevels[spellLevel].display !== false && spellLevelList.length > 0">
                        <strong>@{{f5.spelllevels[spellLevel].name}}:</strong>
                        <span class="feature__spellGroup__item" v-for="(spell, i) in spellLevelList.spells">
                            <span class="feature__spellGroup__name">@{{spell.name}}</span>
                            <div class="feature__spells__remove" @click="removeSpell(spell.name, spell.level)">x</div>
                            <span v-if="i < spellLevelList.length-1" >@{{f5.misc.sentence_list_separator}}</span>
                        </span>
                    </div>
                </div>
                <div>
                    <label class="title-label">@{{f5.misc.title_spellcasting_ability}}:</label>
                    <select v-model="value.spellcastingAbility">
                        <option v-for="(ability, i) in f5.abilities" :value="i">@{{ability.name}}</option>
                    </select>
                </div>
                <div> 
                    <label class="title-label" for="feature__innate-spellcasting">@{{f5.misc.title_innate_spellcasting}}:</label>
                    <input type="checkbox" v-model="value.innateSpellcasting" />
                </div>
                <div v-if="!value.innateSpellcasting">
                    <label class="title-label" for="feature__prepared-spellcasting">@{{f5.misc.title_prepared_spellcasting_class}}:</label>
                    <select v-model="value.spellcastingClass">
                        <option value="">@{{f5.misc.none}}</option>
                        <option v-for="(playerclass, i) in f5.classes" v-if="playerclass.prepared_spellcasting" :value="i">@{{playerclass.name}}</option>
                    </select>
                </div>

                <div v-if="!value.innateSpellcasting">
                    <label class="title-label">@{{f5.misc.title_spell_slots}}:</label>
                    <div class="feature__spell-slots">
                        <div class="feature__spell-slots__group" v-for="(group, level) in f5.spelllevels" v-if="group.display !== false && level > 0">
                            <label class="title-label" for="feature__spell-slots">@{{group.name}}:</label>
                            <select id="feature__spell-slots-" name="feature__add-spell-level" v-model="value.spellSlots[level]">
                                <option v-for="i in 5" :value="i-1" >@{{i-1}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <label class="title-label" for="feature__spell-list">@{{f5.misc.title_spell_list}}:</label>
                <div v-for="(spell, i) in value.spellList" class="feature__edit-spell">
                    <label class="title-label" for="feature__spell-name">@{{f5.misc.title_add_spell_name}}:</label>
                    <input type="text" v-model="spell.name">
                    <div>
                        <label class="title-label" for="feature__add-spell-level">@{{f5.misc.title_spell_level}}:</label>
                        <select id="feature__add-spell-level" name="feature__add-spell-level" v-model="spell.level">
                            <option v-for="(level, i) in f5.spelllevels" :value="i" v-if="level.display !== false">@{{level.name}}</option>
                        </select>
                    </div>
                    <div v-if="value.innateSpellcasting && spell.level >= 1 && !spell.at_will">
                        <label class="title-label" for="feature__add-spell-level">@{{f5.misc.title_spell_uses}}:</label>
                        <select id="feature__add-spell-level" name="feature__add-spell-level" v-model="spell.uses">
                            <option v-for="i in 4" :value="i" >@{{i}}</option>
                        </select>
                    </div>
                    <div>
                        <label class="title-label" for="feature__add-spell-before-combat">@{{f5.misc.title_casts_before_combat}}:</label>
                        <input type="checkbox" v-model="spell.before_combat">
                        <label class="title-label" for="feature__add-spell-at-will">@{{f5.misc.title_cast_at_will}}:</label>
                        <input type="checkbox" v-model="spell.at_will">
                    </div>
                    <div class="feature__spells__remove" @click="removeSpell(i)">x</div>
                </div>
                <button @click="addSpell()">@{{f5.misc.title_add_spell}}</button>
                
            </div>

            <!-- Legendary or Mythic -->
            <div class="feature__options feature__options-legendary" v-if="value.actionType === 'legendary_action' || value.actionType === 'mythic_action'">
                <label class="title-label">@{{f5.misc.title_legendary_action_cost}}:</label>
                <select id="feature__legendary-cost" name="feature__recharge__legendary-cost" v-model="value.legendaryActionCost">
                    <option v-for="i in $parent.value.legendaryActions" :value="i" >@{{i}}</option>
                </select>
            </div>

            
            <div v-if="value.template === 'saving_throw' || value.template === 'attack'"">
                <label class="title-label">@{{f5.misc.title_target_type}}:</label>
                <select v-model="value.targetType">
                    <option v-for="(aoe, i) in f5.areaofeffect" v-if="aoe.types.includes(value.template)" :value="i">@{{aoe.name}}</option>
                </select>
                
                <div v-if="value.targetType === 'melee' || value.targetType === 'melee_or_ranged'">
                    <label class="title-label">@{{f5.misc.title_reach_distance}}:</label>
                    <select v-model="value.attackReach">
                        <option v-for="i in f5.areaofeffect['melee'].range" :value="i">@{{i}}</option>
                    </select>
                </div>
                <div v-if="value.targetType === 'ranged' || value.targetType === 'melee_or_ranged'">
                    <label class="title-label">@{{f5.misc.title_range_distance}}:</label>
                    <select v-model="value.attackRange.low">
                        <option v-for="i in f5.areaofeffect['ranged'].range" :value="i">@{{i}}</option>
                    </select>
                    /
                    <select v-model="value.attackRange.high">
                        <option v-for="i in f5.areaofeffect['ranged'].range" :value="i">@{{i}}</option>
                    </select>
                </div>
                <div v-if="value.targetType === 'line' || value.targetType === 'cone' || value.targetType === 'sphere' || value.targetType === 'cube'">
                    <label class="title-label">@{{f5.misc.title_range_distance}}:</label>
                    <select v-model="value.aoeRange">
                        <option v-for="i in f5.areaofeffect[value.targetType].range" :value="i">@{{i}}</option>
                    </select>
                </div>
            </div>

            <!-- Attack -->
            <div class="feature__options feature__options-attack" v-if="value.template === 'attack'">

                <div>
                    <label class="title-label">@{{f5.misc.title_attack_type}}:</label>
                    <span v-for="(attackType, i) in f5.attacktypes">
                        <input type="radio" :id="'aoe_'+i+'_'+value.id" :value="i" v-model="value.attackType">
                        <label :for="'aoe_'+i+'_'+value.id">@{{attackType.name}}</label>
                    </span>
                </div>
                <label class="title-label">@{{f5.misc.title_attack_ability}}:</label>
                <select v-model="value.attackAbility">
                    <option v-for="(ability, i) in f5.abilities" :value="i">@{{ability.name}}</option>
                </select>
                <div>
                    <label class="title-label">@{{f5.misc.title_targets}}:</label>
                    <select v-model="value.attackTargets">
                        <option v-for="i in 5" :value="i">@{{i}}</option>
                    </select>
                </div>

                <!-- Damage Options -->
                <div>
                    <label class="title-label">@{{f5.misc.title_damage_dice}}:</label>
                    <div class="feature__damage indent-margin" v-for="(damage, index) in value.attackDamage">
                        <div>
                            <label class="title-label">@{{f5.misc.dice_amount}}:</label>
                            <select id="feature__damage__dice-amount" name="feature__damage__dice-amount" v-model="damage.diceAmount">
                                <option value="0" >0</option>
                                <option v-for="i in 30" :value="i" >@{{i}}</option>
                            </select>
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.dice_type}}:</label>
                            <select id="feature__damage__dice-type" name="feature__damage__dice-type" v-model="damage.diceType">
                                <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                            </select>
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.title_ability_bonus}}</label>
                            <input type="checkbox" v-model="damage.abilityBonus">
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.additional}}:</label>
                            <input type="number" min="0" max="9999" id="feature__damage__hitpoints-additional" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.title_damage_type}}:</label>
                            <select id="feature__damage__damage-type" name="feature__damage__damage-type" v-model="damage.type">
                                <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                            </select>
                        </div>
                        <div class="feature__remove-damage" @click="removeDamageDie('attackDamage', index)">x</div>
                    </div>
                    <button @click="addDamageDie('attackDamage')">@{{f5.misc.title_add_damage_die}}</button>
                    <br/>
                    <br/>
                </div>

            </div>

            <!-- Saving Throw (Can also be added to "Attack") -->
            <div class="feature__options feature__options-saving-throw" v-if="value.template === 'saving_throw' || value.template === 'attack'">
                <label class="title-label" v-if="value.template === 'attack'">@{{f5.misc.title_additional_saving_throw}}</label>
                <input type="checkbox" v-model="value.attackSavingThrow" v-if="value.template === 'attack'">

                <div v-if="(value.template === 'attack' && value.attackSavingThrow) || value.template === 'saving_throw'" :class="{'attack-border' : value.template === 'attack'}">
                    <label class="title-label">@{{f5.misc.title_saving_throw_monster_ability}}:</label>
                    <select v-model="value.savingThrowMonsterAbility">
                        <option v-for="(ability, i) in f5.abilities" :value="i">@{{ability.name}}</option>
                    </select>
                    <br/>

                    <label class="title-label">@{{f5.misc.title_saving_throw_ability}}:</label>
                    <Multiselect class="edit-field edit-field--flex"
                        :placeholder="f5.misc.choose_abilities"
                        v-model="value.savingThrowSaveAbilities" 
                        :options="f5.abilities" 
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

                    <label class="title-label">@{{f5.misc.title_saving_throw_conditions}}:</label>
                    <Multiselect class="edit-field edit-field--flex"
                        :placeholder="f5.misc.choose_conditions"
                        v-model="value.savingThrowConditions" 
                        :options="f5.conditions" 
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

                    <label class="title-label">@{{f5.misc.title_half_on_success}}:</label>
                    <input type="checkbox" v-model="value.savingThrowHalfOnSuccess">
                    <br/>
                    

                    <!-- Saving Throw Damage Options -->
                    <label class="title-label">@{{f5.misc.title_damage_dice}}:</label>
                    <div class="feature__damage" v-for="(damage, index) in value.savingThrowDamage">
                        <label class="title-label">@{{f5.misc.dice_amount}}:</label>
                        <select id="feature__damage__dice-amount" name="feature__damage__dice-amount" v-model="damage.diceAmount">
                            <option value="0" >0</option>
                            <option v-for="i in 30" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label class="title-label">@{{f5.misc.dice_type}}:</label>
                        <select id="feature__damage__dice-type" name="feature__damage__dice-type" v-model="damage.diceType">
                            <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label class="title-label">@{{f5.misc.title_ability_bonus}}</label>
                        <input type="checkbox" v-model="damage.abilityBonus">
                        <br/>
                        <label class="title-label">@{{f5.misc.additional}}:</label>
                        <input type="number" min="0" max="9999" id="feature__damage__hitpoints-additional" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                        <br/>
                        <label class="title-label">@{{f5.misc.title_damage_type}}:</label>
                        <select id="feature__damage__damage-type" name="feature__damage__damage-type" v-model="damage.type">
                            <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                        </select>

                        <div class="feature__remove-damage" @click="removeDamageDie('savingThrowDamage', index)">x</div>
                    </div>
                    <button @click="addDamageDie('savingThrowDamage')">@{{f5.misc.title_add_damage_die}}</button>
                    <br/>
                    <br/>
                </div>
            </div>

            <!-- Ongoing Damage Options -->
            <div class="feature__options feature__option-ongoing" v-if="value.template === 'saving_throw' || value.template === 'attack'">
                <label class="title-label">@{{f5.misc.title_ongoing_damage}}</label>
                <input type="checkbox" v-model="value.hasOngoingDamage">
                <div class="feature__ongoing-damage indent-margin attack-border" v-if="value.hasOngoingDamage">
                    <div>
                        <label class="title-label">@{{f5.misc.title_damage_occurance}}:</label>
                        <input :id="'ongoing-occurs_start-'+value.id" type="radio" value="start" v-model="value.ongoingDamageOccurs">
                        <label :for="'ongoing-occurs_start-'+value.id">@{{f5.timepoints.start_of_turn.name}}</label>
                        <input :id="'ongoing-occurs_end-'+value.id" type="radio" value="end" v-model="value.ongoingDamageOccurs">
                        <label :for="'ongoing-occurs_end-'+value.id">@{{f5.timepoints.end_of_turn.name}}</label>
                    </div>
                    
                    <label class="title-label">@{{f5.misc.title_damage_duration}}:</label>
                    <div class="three-flex-columns">
                        <div v-for="(duration, i) in f5.durations">
                            <input :id="'duration_'+i+'_'+value.id" type="radio" :value="i" v-model="value.ongoingDamageDuration">
                            <label :for="'duration_'+i+'_'+value.id">@{{duration.name}}</label>
                        </div>
                    </div>

                    <div v-if="value.template === 'saving_throw'">
                        <label class="title-label">@{{f5.misc.title_on_failed_save}}:</label>
                        <input type="checkbox" v-model="value.ongoingDamageOnFailedSave">
                    </div>

                    <div v-if="value.template === 'saving_throw'">
                        <label class="title-label">@{{f5.misc.title_repeat_save}}:</label>
                        <input type="checkbox" v-model="value.ongoingDamageRepeatSave">
                    </div>

                    <label class="title-label">@{{f5.misc.title_damage_dice}}:</label>
                    <div class="feature__damage" v-for="(damage, index) in value.ongoingDamage">
                        <div>
                            <label class="title-label">@{{f5.misc.dice_amount}}:</label>
                            <select id="feature__damage__dice-amount" name="feature__damage__dice-amount" v-model="damage.diceAmount">
                                <option value="0" >0</option>
                                <option v-for="i in 30" :value="i" >@{{i}}</option>
                            </select>
                        </div>

                        <div>
                            <label class="title-label">@{{f5.misc.dice_type}}:</label>
                            <select id="feature__damage__dice-type" name="feature__damage__dice-type" v-model="damage.diceType">
                                <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                            </select>
                        </div>

                        <div>
                            <label class="title-label">@{{f5.misc.title_ability_bonus}}</label>
                            <input type="checkbox" v-model="damage.abilityBonus">
                        </div>

                        <div>
                            <label class="title-label">@{{f5.misc.additional}}:</label>
                            <input type="number" min="0" max="9999" id="feature__damage__hitpoints-additional" name="feature__damage__hitpoints-additional" v-model="damage.additional" value="0" />
                        </div>

                        <div>
                            <label class="title-label">@{{f5.misc.title_damage_type}}:</label>
                            <select id="feature__damage__damage-type" name="feature__damage__damage-type" v-model="damage.type">
                                <option v-for="(type, i) in $parent.dealableDamageTypes" :value="type.value" >@{{type.label}}</option>
                            </select>
                        </div>

                        <div class="feature__remove-damage" @click="removeDamageDie('ongoingDamage', index)">x</div>
                    </div>

                    <button @click="addDamageDie('ongoingDamage')">@{{f5.misc.title_add_damage_die}}</button>
                    <br/>
                    <br/>
                </div>
            </div>

            <div class="feature__options feature__options-global">
                <div class="feature__passiveTrigger" v-if="value.actionType === 'passive' && value.template !== 'custom' && value.template !== 'legendary_resistance'">
                    <label class="title-label">@{{ this.f5.misc.title_passive_trigger }}: </label>
                    <select v-model="value.passiveTrigger">
                        <option value="start_of_turn">@{{this.f5.durations.start_of_turn.name}}</option>
                        <option value="end_of_turn">@{{this.f5.durations.end_of_turn.name}}</option>
                    </select>
                </div>

                <div class="feature__regenerate" v-if="value.template !== 'custom' && value.template !== 'spellcasting' && value.template !== 'multiattack' && value.template !== 'reference' && value.template !== 'legendary_resistance'">
                    <label class="title-label">@{{ f5.misc.title_regenerate }}:</label>
                    <select class="feature__regenerate__options" name="feature__regenerate__options" v-model="value.regenerate.type">
                        <option v-for="(type, i) in f5.regenerate" v-if="value.actionType !== 'passive' || !(i == 'damage_dealt' || i == 'half_damage_dealt')" :value="i" >@{{type.name}}</option>
                    </select>
                    

                    <div class="indent-margin" v-if="value.regenerate.type == 'custom' || value.regenerate.type == 'automatic'">
                        <!-- Regeneration Options -->
                        
                        <div v-if="value.regenerate.type == 'custom'">
                            <label class="title-label">@{{f5.regenerate.custom.name}}:</label>
                            </br>
                            <textarea rows="3" class="feature__description-textarea" v-model="value.regenerate.customText"></textarea>
                        </div>
                        <div>
                            <label class="title-label">@{{f5.misc.title_regeneration_dice}}:</label>
                            <div class="feature__regen indent-margin" v-for="(regen, index) in value.regenerate.amount">
                                <div>
                                    <label class="title-label">@{{f5.misc.dice_amount}}:</label>
                                    <select id="feature__regen__dice-amount" name="feature__regen__dice-amount" v-model="regen.diceAmount">
                                        <option value="0" >0</option>
                                        <option v-for="i in 30" :value="i" >@{{i}}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="title-label">@{{f5.misc.dice_type}}:</label>
                                    <select id="feature__regen__dice-type" name="feature__regen__dice-type" v-model="regen.diceType">
                                        <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                                    </select>
                                </div>
                                <div>
                                    <label :for="'feature__regen__hitpoints-additional__'+value.id" class="title-label">@{{f5.misc.additional}}:</label>
                                    <input type="number" min="0" max="9999" :id="'feature__regen__hitpoints-additional'+value.id" name="feature__regen__hitpoints-additional" v-model="regen.additional" value="0" />
                                </div>

                                <div class="feature__remove-regen" @click="removeRegenDie(index)">x</div>
                            </div>
                            <button @click="addRegenDie()">@{{f5.misc.title_add_regeneration_die}}</button>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
                
                <div class="feature__recharge" v-if="value.template !== 'spellcasting' && value.template !== 'multiattack' && value.template !== 'reference' && value.template !== 'legendary_resistance'">
                    <div>
                        <label class="title-label" for="feature__recharge">@{{f5.misc.title_recharge}}:</label>
                        <select id="feature__recharge" name="feature__recharge" v-model="value.recharge.type">
                            <option v-for="(recharge, i) in f5.recharge" :value="i" >@{{recharge.name}}</option>
                        </select>
                    </div>
                    <div class="indent-margin" v-if="value.recharge.type === 'dice_roll'">
                        <label class="title-label">@{{f5.misc.title_recharge_min_roll}}:</label>
                        <select id="feature__recharge__hitdice-amount" name="feature__recharge__dice-amount" v-model="value.recharge.minRoll">
                            <option v-for="i in value.recharge.diceType" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label class="title-label">@{{f5.misc.dice_type}}:</label>
                        <select id="feature__recharge__dice-type" name="feature__recharge__dice-type" v-model="value.recharge.diceType">
                            <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                        </select>
                    </div>
                    <div class="indent-margin" v-if="value.recharge.type === 'limited_use'">
                        <label class="title-label">@{{f5.misc.title_recharge_limited_use}}:</label>
                        <select id="feature__recharge__limited-use" name="feature__recharge__limited-use" v-model="value.recharge.uses">
                            <option v-for="i in 5" :value="i" >@{{i}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="value.template !== 'custom'">
                <label class="title-label">@{{f5.misc.title_additional_description}}:</label>
                <textarea rows="3" class="feature__description-textarea" v-model="value.additionalDescription"></textarea>
            </div>

            <button class="feature__save">@{{f5.misc.title_save}}</button>
        </div>
    </div>
</script>
