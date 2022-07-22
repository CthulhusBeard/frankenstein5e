<script type="text/x-template" id="template-statblock"> 
    <div>
        <div class="stat-block-container">
            <div class="stat-block" v-bind:class="[{'edit-mode': $parent.editor.edit_mode}, statblockColumns]">
                <div class="stat-block__section">
                    <div class="stat-block__title focus-edit">
                        <span class="display-field">@{{value.name}}</span>
                        <input type="text" class="edit-field" v-model="value.name" />
                        <label for="is_proper_noun" class="edit-field edit-field--inlineBlock proper-noun">@{{ f5.misc.title_proper_noun }}</label>
                        <input id="is_proper_noun" type="checkbox" class="edit-field edit-field--inlineBlock" v-model="value.isNameProperNoun" />
                    </div>

                    <div class="stat-block__size-alignment focus-edit">
                        <span>@{{descriptionText}}</span>
                        <div class="option options__sizes edit-field">
                            @{{ f5.misc.title_size }}:
                            <select id="options__size" name="options__size" v-model="value.size">
                                <option v-for="(item, index) in f5.creaturesizes" :value="index">@{{item.name}}</option>
                            </select>
                        </div>

                        <div class="option options__types edit-field">
                            @{{ f5.misc.title_type }}:
                            <select id="options__type" name="options__type" v-model="value.type">
                                <option disabled value="">@{{f5.misc.please_select_one}}</option>
                                <option v-for="(item, index) in f5.creaturetypes" :value="index">@{{item.name}}</option>
                            </select>
                        </div>

                        <div class="option options__subtypes edit-field">
                            @{{ f5.misc.title_subtype }}:
                            <select id="options__subtype" name="options__subtype" v-model="value.subtype">
                                <option selected value="">@{{f5.misc.none}}</option>
                                <option v-for="(item, index) in f5.creaturesubtypes" :value="index">@{{item.name}}</option>
                            <!--<option v-for="item in orderedSubtypes" :value="item.id">@{{item.name}}</option>-->
                            </select>
                        </div>

                        <div class="option options__type-option edit-field" v-if="typeCategoryList.length > 0">
                            @{{ f5.misc.title_category }}:
                            <select id="options__type-option" name="options__typeCategory" v-model="value.typeCategory">
                                <option value="">@{{f5.misc.none}}</option>
                                <option v-for="item in typeCategoryList" :value="item.id">@{{item.name}}</option>
                            </select>
                        </div>

                        <div class="option options__alignments edit-field">
                            @{{ f5.misc.title_alignments }}:
                            <select id="options__alignment" name="options__alignment" v-model="value.alignment">
                                <option value="">@{{f5.misc.none}}</option>
                                <option v-for="(item, index) in f5.alignments" :value="index">@{{item.name}}</option>
                            </select>
                            @{{f5.misc.title_alignments_typically}}<input type="checkbox" v-model="value.showTypicalAlignment">
                        </div>
                        <div class="stat-block__line-break"></div>
                    </div>

                    <div class="stat-block__attributes">
                        <div class="stat-block__attribute focus-edit">
                            <span class="title">@{{f5.misc.title_armor_class}}:</span>
                            <span>@{{acText}}</span>
                            <div class="option options__hitpoints edit-field">
                                <select id="options__armorclass" name="options__armorclass" v-model="value.armorClass.type">
                                    <option v-for="(item, index) in f5.armor" :value="index" >@{{generateArmourText(item, f5.misc.max)}}</option>
                                </select>
                                <div v-if="value.armorClass.type === 'custom'" >
                                    @{{f5.misc.title_armor_name}}: <input v-model='value.armorClass.name'/><br/>
                                    <!--Disadvantage on Stealth: <input type="checkbox" v-model="value.armorClass.stealthDis">-->
                                </div>
                                <span v-if="allowAcSelector">
                                    @{{f5.misc.title_armor_class}}: <select name="options__armorclass_range" v-model="value.armorClass.manual">
                                        <option v-for="(val, i) in getAcRange" :value="val" >@{{val}}</option>
                                    </select>
                                </span>
                                <span v-if="allowAcBonus">
                                    @{{f5.misc.title_magical_bonus}}: +<select name="options__armorclass_range" v-model="value.armorClass.bonus" >
                                        <option v-for="i in 6" :value="i-1" >@{{i-1}}</option>
                                    </select>     
                                </span>
                                <div>
                                    @{{f5.misc.title_shield}}: <input name="options__shield" v-model="value.armorClass.shield" type="checkbox" />
                                    @{{f5.misc.title_mage_armor}}: <input name="options__mage-armor" v-model="value.armorClass.mageArmor" type="checkbox" /> 
                                </div>       
                            </div>
                        </div>

                        <div class="stat-block__attribute focus-edit">
                            <span class="title">@{{f5.misc.title_hit_points}}:</span>
                            <span>@{{hitPointsText}}</span>
                            <div class="option options__hitpoints edit-field">
                                <label>@{{f5.misc.hit_dice_amount}}:</label>
                                <input type="number" min="0" max="500" id="options__hitpoints-amount" name="options__hitpoints-amount" v-model="value.hitPoints.diceAmount" value="1" />
                                <br/>
                                <label>@{{f5.misc.hit_dice_type}}:</label>
                                <select id="options__hitdice-type" name="options__hitdice-type" v-model="value.hitPoints.diceType">
                                    <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                                </select>
                                <br/>
                                <label>@{{f5.misc.additional}}:</label>
                                <input type="number" min="0" max="9999" id="options__hitpoints-additional" name="options__hitpoints-additional" v-model="value.hitPoints.additional" value="0" />
                            </div>
                        </div>

                        <div class="stat-block__attribute focus-edit">
                            <span class="title">@{{f5.misc.title_speed}}:</span>
                            <span>@{{speedText}}</span>
                            <div class="option options-row options__speeds edit-field">
                                <div :class="'options__speed option-box '+index" v-for="(item, index) in f5.speeds">
                                    <label :for="index">@{{item.name}}</label>
                                    <select :name="'options__speed_'+index" v-model="value.speeds[index]">
                                        <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+$parent.editor.measure.measureUnit}}</option>
                                    </select>
                                    <span v-if="index === 'fly' && value.speeds['fly'] > 0">
                                        @{{f5.misc.hover}}: <input type="checkbox" v-model="value.hover">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="stat-block__line-break"></div>
                    </div>

                    <div class="stat-block__ability-scores">
                        <div class="stat-block__ability-scores__holder">
                            <div class="stat-block__ability focus-edit" v-for="(item, index) in f5.abilities" @click="setFocusOnChild($event, 'stat-block__ability-score-'+index.toLowerCase())" >
                                <div class="stat-block__ability-name">
                                    @{{index.toUpperCase()}}
                                </div>
                                <div class="stat-block__ability-score display-field">
                                    @{{value.abilities[index]}} (@{{addPlus(calcAbilityMod(value.abilities[index]))}})
                                </div>
                                <div :class="'edit-field options__ability option-box '+index">
                                    Score: 
                                    <select :class="'stat-block__ability-score-'+index.toLowerCase()" :name="'options__ability_'+index" v-model="value.abilities[index]">
                                        <option v-for="i in 31" :value="i-1" >@{{i-1}}</option>
                                    </select>
                                    <br/>
                                    Save: <input :name="'options__saving-throws_'+index" v-model="value.savingThrows[index]" type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div class="stat-block__line-break"></div>
                    </div>

                    <div class="stat-block__attributes hidden-holder">
                        <div v-if="savingThrowText" class="stat-block__attribute">
                            <span class="title">@{{f5.misc.title_saving_throws}}:</span>
                            <span class="display-field">@{{savingThrowText}}</span>
                        </div>
                        <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !skillText}">
                            <span v-if="skillText" class="title">@{{f5.misc.title_skills}}:</span>
                            <span v-else class="title">+ @{{f5.misc.title_skills}}</span>
                            <span>@{{skillText}}</span>
                            <multiselect class="edit-field edit-field--flex"
                                :placeholder="f5.misc.choose_skill"
                                v-model="value.skills" 
                                :options="f5.skills" 
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
                            </multiselect>
                        </div>

                        <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !damageResistanceText}">
                            <span v-if="damageResistanceText" class="title">@{{f5.misc.title_damage_resistances}}:</span>
                            <span v-else class="title">+ @{{f5.misc.title_damage_resistances}}</span>
                            <span>@{{damageResistanceText}}</span>
                            <multiselect class="edit-field edit-field--flex"
                                v-model="value.damageResistances" 
                                :placeholder="f5.misc.choose_a.replace(':choice', 'damage type')"
                                :options="eligableDamageTypes" 
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :create-option="true"
                            >
                                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                        <div class="multiselect-tag">
                                            @{{ option.label }}
                                            <span v-if="!disabled" class="multiselect-tag-remove" @mousedown.prevent="handleTagRemove(option, $event)">
                                                <span class="multiselect-tag-remove-icon"></span>
                                            </span>
                                        </div>
                                    </template>

                                    <template v-slot:option="{ option }">
                                        @{{ option.label }}
                                    </template>
                            </multiselect>
                        </div>

                        <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !damageImmunitiesText}">
                            <span v-if="damageImmunitiesText" class="title">@{{f5.misc.title_damage_immunities}}:</span>
                            <span v-else class="title">+ @{{f5.misc.title_damage_immunities}}</span>
                            <span>@{{damageImmunitiesText}}</span>
                            <multiselect class="edit-field edit-field--flex"
                                v-model="value.damageImmunities" 
                                :placeholder="f5.misc.choose_a.replace(':choice', 'damage type')"
                                :options="eligableDamageTypes" 
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :create-option="true"
                            >
                                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                        <div class="multiselect-tag">
                                            @{{ option.label }}
                                            <span v-if="!disabled" class="multiselect-tag-remove" @mousedown.prevent="handleTagRemove(option, $event)">
                                                <span class="multiselect-tag-remove-icon"></span>
                                            </span>
                                        </div>
                                    </template>

                                    <template v-slot:option="{ option }">
                                        @{{ option.label }}
                                    </template>
                            </multiselect>
                        </div>

                        <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !damageVulnerabilitiesText}">
                            <span v-if="damageVulnerabilitiesText" class="title">@{{f5.misc.title_damage_vulnerabilities}}:</span>
                            <span v-else class="title">+ @{{f5.misc.title_damage_vulnerabilities}}</span>
                            <span>@{{damageVulnerabilitiesText}}</span>
                            <multiselect class="edit-field edit-field--flex"
                                v-model="value.damageVulnerabilites" 
                                :placeholder="f5.misc.choose_a.replace(':choice', 'damage type')"
                                :options="eligableDamageTypes" 
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :create-option="true"
                            >
                                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                        <div class="multiselect-tag">
                                            @{{ option.label }}
                                            <span v-if="!disabled" class="multiselect-tag-remove" @mousedown.prevent="handleTagRemove(option, $event)">
                                                <span class="multiselect-tag-remove-icon"></span>
                                            </span>
                                        </div>
                                    </template>

                                    <template v-slot:option="{ option }">
                                        @{{ option.label }}
                                    </template>
                            </multiselect>
                        </div>

                        <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !conditionImmunitiesText}">
                            <span v-if="conditionImmunitiesText" class="title">@{{f5.misc.title_condition_immunities}}:</span>
                            <span v-else class="title">+ @{{f5.misc.title_condition_immunities}}</span>
                            <span>@{{conditionImmunitiesText}}</span>
                            <multiselect class="edit-field edit-field--flex"
                                v-model="value.conditionImmunities" 
                                :placeholder="f5.misc.choose_a.replace(':choice', 'condition')"
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
                            </multiselect>
                        </div>

                        <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !sensesText}">
                            <span v-if="sensesText" class="title">@{{f5.misc.title_senses}}:</span>
                            <span v-else class="title">+ @{{f5.misc.title_senses}}</span>
                            <span>@{{sensesText}}</span>
                            <div class="option options-row options__senses edit-field">
                                <div :class="'options__senses option-box '+index" v-for="(item, index) in f5.senses">
                                    <label :for="'sense_'+index">@{{item.name}}</label>
                                    <select :name="'options__sense_'+index" v-model="value.senses[index].distance">
                                        <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+$parent.editor.measure.measureUnit}}</option>
                                    </select>
                                    <span v-if="item.modifier_name">
                                        <label :for="'sense_'+index+'_modifier'">@{{item.modifier_name}}</label>
                                        <input type="checkbox" v-model="value.senses[index].modifier" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="stat-block__attribute focus-edit">
                            <span class="title">@{{f5.misc.title_languages}}:</span>
                            <span>@{{languageText}}</span>
                            <multiselect class="edit-field edit-field--flex"
                                v-model="value.languages.spokenWritten" 
                                :options="f5.languages" 
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
                            </multiselect>
                            
                            <span for="languages__telepathy" class="edit-field edit-field--inlineBlock">@{{f5.misc.telepathy}}</span>
                            <select name="languages__telepathy" v-model="value.languages.telepathy" class="edit-field">
                                <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+$parent.editor.measure.measureUnit}}</option>
                            </select>
                        </div>

                        <div class="stat-block__attribute no-edit">
                            <span class="title">@{{f5.misc.title_challenge_rating}}:</span>
                            <span class="display-field">@{{crText}}</span>
                        </div>

                        <div class="stat-block__attribute focus-edit">
                            <span class="title">@{{f5.misc.title_proficiency}}:</span>
                            <span class="display-field">@{{proficiencyText}}</span>
                            <select class="edit-field" name="options__proficiency" v-model="value.manualOverride.proficiency">
                                <option value="0">@{{f5.misc.title_use_automatic}}</option>
                                <option v-for="i in 8" :value="i+1" >@{{i+1}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="stat-block__line-break"></div>
                </div>

                <div class="stat-block__passives">
                    <div class="stat-block__add-feature-button" @click="createFeature('passive')">
                        @{{f5.misc.title_add_passive}}
                    </div>
                    <statblock-feature 
                        v-for="passive in value.features.passive"
                        v-bind:value="passive"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>

                <div class="stat-block__spellcasting">
                    <div v-if="!value.features.spellcasting.length" class="stat-block__add-feature-button" @click="createFeature('spellcasting')">
                        @{{f5.misc.title_add_spellcasting}}
                    </div>
                    <statblock-feature 
                        v-for="spellcasting in value.features.spellcasting"
                        v-bind:value="spellcasting"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>

                <div class="stat-block__multiattack">
                    <div v-if="value.features.action.length || value.features.multiattack.length" class="stat-block__subtitle">
                        <div class="header">@{{f5.misc.title_action}}</div>
                    </div>
                    <div v-if="!value.features.multiattack.length" class="stat-block__add-feature-button" @click="createFeature('multiattack')">
                        @{{f5.misc.title_add_multiattack}}
                    </div>
                    <statblock-feature 
                        v-for="multiattack in value.features.multiattack"
                        v-bind:value="multiattack"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                        ref="multiattack_features"
                    ></statblock-feature>
                </div>

                <div class="stat-block__section stat-block__actions">
                    <div class="stat-block__add-feature-button" @click="createFeature('action')">
                        @{{f5.misc.title_add_action}}
                    </div>
                    <statblock-feature 
                        v-for="action in value.features.action"
                        v-bind:value="action"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>

                <div class="stat-block__section stat-block__bonus-actions">
                    <div v-if="value.features.bonus_action.length" class="stat-block__subtitle">
                        <div class="header">@{{f5.misc.title_bonus_action}}</div>
                    </div>
                    <div class="stat-block__add-feature-button" @click="createFeature('bonus_action')">
                        @{{f5.misc.title_add_bonus_action}}
                    </div>
                    <statblock-feature 
                        v-for="bonusAction in value.features.bonus_action"
                        v-bind:value="bonusAction"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>

                <div class="stat-block__section stat-block__reactions">
                    <div v-if="value.features.reaction.length" class="stat-block__subtitle">
                        <div class="header">@{{f5.misc.title_reaction}}</div>
                    </div>
                    <div class="stat-block__add-feature-button" @click="createFeature('reaction')">
                        @{{f5.misc.title_add_reaction}}
                    </div>
                    <statblock-feature 
                        v-for="reaction in value.features.reaction"
                        v-bind:value="reaction"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>

                <div class="stat-block__section stat-block__legendary-actions">
                    <div v-if="value.features.legendary_action.length" class="stat-block__subtitle">
                        <div class="header">@{{f5.misc.title_legendary_action}}</div>
                        <div>@{{f5.misc.legendary_action_desc}}</div>
                    </div>
                    <div class="stat-block__add-feature-button" @click="createFeature('legendary_action')">
                        @{{f5.misc.title_add_legendary_action}}
                    </div>
                    <statblock-feature 
                        v-for="legendaryAction in value.features.legendary_action"
                        v-bind:value="legendaryAction"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>

                <div class="stat-block__section stat-block__mythic-actions">
                    <div v-if="value.features.mythic_action.length" class="stat-block__subtitle">
                        <div class="header">@{{f5.misc.title_mythic_action}}</div>
                        <div>@{{f5.misc.mythic_action_desc}}</div>
                    </div>
                    <div class="stat-block__add-feature-button" @click="createFeature('mythic_action')">
                        @{{f5.misc.title_add_mythic_action}}
                    </div>
                    <statblock-feature 
                        v-for="mythicAction in value.features.mythic_action"
                        v-bind:value="mythicAction"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>
                
                <div class="stat-block__section stat-block__lair-actions">
                    <div v-if="value.features.lair_action.length" class="stat-block__subtitle">
                        <div class="header">@{{f5.misc.title_lair_action}}</div>
                        <div>@{{f5.misc.lair_action_desc}}</div>
                    </div>
                    <div class="stat-block__add-feature-button" @click="createFeature('lair_action')">
                        @{{f5.misc.title_add_lair_action}}
                    </div>
                    <statblock-feature 
                        v-for="lairAction in value.features.lair_action"
                        v-bind:value="lairAction"
                        v-bind:combat_rounds="combat_rounds"
                        v-bind:f5="f5"
                        ref="features"
                        @hook:mounted="featureIsMounted"
                        @remove-feature="removeFeature"
                    ></statblock-feature>
                </div>
            </div>
            
            <div class="statblock__remove" @click="$emit('remove-statblock', value.id)">x</div>
        </div>

        <div class="statblock-data">
            <div class="cr-controller popup-overlay">
                <div>
                    <div>
                        <label class="control-label" for="controls__columns">@{{f5.misc.title_columns}}: </label>
                        <select v-model="value.display.columns">
                                <option v-for="i in 3" :value="i">@{{i}}</option>
                        </select>
                    </div>
                    <button @click="exportMonster()">@{{f5.misc.title_export}}</button>
                </div>
                
                <strong>@{{f5.misc.title_cr_manager}}</strong>
                <div>
                    @{{f5.misc.title_approx_dpr}}: @{{averageDPR}}<br/>
                    @{{f5.misc.title_offensive_cr}}: @{{damageCr}}<br/>
                    @{{f5.misc.title_hp_cr}}: @{{healthCr}}<br/>
                    @{{f5.misc.title_ac_cr}}: @{{armorCr}}
                </div>
                {{--
                <div> 
                    <label class="option-label" for="options__set-cr">@{{f5.misc.title_set_cr}}: </label>
                    <select id="option options__set-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-o-cr">@{{f5.misc.title_set_offensive_cr}}: </label>
                    <select id="option options__set-o-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-hp-cr">@{{f5.misc.title_set_hp_cr}}: </label>
                    <select id="option options__set-hp-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-ac-cr">@{{f5.misc.title_set_ac_cr}}: </label>
                    <select id="option options__set-ac-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                --}}
            </div>
            
            {{--
            <div class="dpr-controller popup-overlay">
                <projection-graph
                    v-bind:id="value.id"
                    v-bind:name="value.name"
                    v-bind:monster_hp="getHP"
                    v-bind:monster_damage="damageProjection"
                    v-bind:player_data="statblockPlayerData"
                    v-bind:combat_rounds="combat_rounds"
                    v-bind:f5="f5"
                    ref="graph"
                ></projection-graph>
            </div>
            --}}

        </div>

    </div>
</script>