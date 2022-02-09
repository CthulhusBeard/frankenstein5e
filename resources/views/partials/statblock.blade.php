<div class="stat-block-container">
    <div class="stat-block" v-bind:class="{'edit-mode': editor.edit_mode}">
        <div class="stat-block__column">
            <div class="stat-block__title focus-edit">
                <span class="display-field">@{{options.name}}</span>
                <input type="text" class="edit-field" v-model="options.name" />
            </div>

            <div class="stat-block__size-alignment focus-edit">
                <span>@{{descriptionText}}</span>
                <div class="option options__sizes edit-field">
                    @{{ f5.misc.title_size }}:
                    <select id="options__size" name="options__size" v-model="options.size">
                        <option v-for="(item, index) in f5.creaturesizes" :value="index">@{{item.name}}</option>
                    </select>
                </div>

                <div class="option options__types edit-field">
                    @{{ f5.misc.title_type }}:
                    <select id="options__type" name="options__type" v-model="options.type">
                        <option disabled value="">@{{f5.misc.please_select_one}}</option>
                        <option v-for="(item, index) in f5.creaturetypes" :value="index">@{{item.name}}</option>
                    </select>
                </div>

                <div class="option options__subtypes edit-field">
                    @{{ f5.misc.title_subtype }}:
                    <select id="options__subtype" name="options__subtype" v-model="options.subtype">
                        <option selected value="">@{{f5.misc.none}}</option>
                        <option v-for="(item, index) in f5.creaturesubtypes" :value="index">@{{item.name}}</option>
                    <!--<option v-for="item in orderedSubtypes" :value="item.id">@{{item.name}}</option>-->
                    </select>
                </div>

                <div class="option options__type-option edit-field" v-if="typeCategoryList.length > 0">
                    @{{ f5.misc.title_category }}:
                    <select id="options__type-option" name="options__typeCategory" v-model="options.typeCategory">
                        <option value="">@{{f5.misc.none}}</option>
                        <option v-for="item in typeCategoryList" :value="item.id">@{{item.name}}</option>
                    </select>
                </div>

                <div class="option options__alignments edit-field">
                    @{{ f5.misc.title_alignments }}:
                    <select id="options__alignment" name="options__alignment" v-model="options.alignment">
                        <option value="">@{{f5.misc.none}}</option>
                        <option v-for="(item, index) in f5.alignments" :value="index">@{{item.name}}</option>
                    </select>
                    @{{f5.misc.title_alignments_typically}}<input type="checkbox" v-model="options.showTypicalAlignment">
                </div>
            </div>
            <div class="stat-block__line-break"></div>

            <div class="stat-block__attributes">
                <div class="stat-block__attribute focus-edit">
                    <span class="title">@{{f5.misc.title_armor_class}}:</span>
                    <span>@{{acText}}</span>
                    <div class="option options__hitpoints edit-field">
                        <select id="options__armorclass" name="options__armorclass" v-model="options.armorClass.type">
                            <option disabled value="">Please select one</option>
                            <option v-for="(item, index) in f5.armor" :value="index" >@{{generateArmourText(item, f5.misc.max)}}</option>
                        </select>
                        <div v-if="options.armorClass.type === 'custom'" >
                            Armor Name: <input v-model='options.armorClass.name'/><br/>
                            <!--Disadvantage on Stealth: <input type="checkbox" v-model="options.armorClass.stealthDis">-->
                        </div>
                        <span v-if="allowAcSelector">
                            @{{f5.misc.title_armor_class}}: <select name="options__armorclass_range" v-model="options.armorClass.manual">
                                <option v-for="(val, i) in getAcRange" :value="val" >@{{val}}</option>
                            </select>
                        </span>
                        <span v-if="allowAcBonus">
                            Magical Bonus: +<select name="options__armorclass_range" v-model="options.armorClass.bonus" >
                                <option v-for="i in 6" :value="i-1" >@{{i-1}}</option>
                            </select>     
                        </span>  
                        Shield: <input name="options__shield" v-model="options.armorClass.shield" type="checkbox" />        
                    </div>
                </div>

                <div class="stat-block__attribute focus-edit">
                    <span class="title">@{{f5.misc.title_hit_points}}:</span>
                    <span>@{{hitPointsText}}</span>
                    <div class="option options__hitpoints edit-field">
                        <label>@{{f5.misc.hit_dice_amount}}:</label>
                        <select id="options__hitdice-amount" name="options__hitdice-amount" v-model="options.hitPoints.diceAmount">
                            <option v-for="i in 30" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{f5.misc.hit_dice_type}}:</label>
                        <select id="options__hitdice-type" name="options__hitdice-type" v-model="options.hitPoints.diceType">
                            <option v-for="i in f5.dicetypes" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{f5.misc.additional}}:</label>
                        <input type="number" min="0" max="9999" id="options__hitpoints-additional" name="options__hitpoints-additional" v-model="options.hitPoints.additional" value="0" />
                    </div>
                </div>

                <div class="stat-block__attribute focus-edit">
                    <span class="title">@{{f5.misc.title_speed}}:</span>
                    <span>@{{speedText}}</span>
                    <div class="option options-row options__speeds edit-field">
                        <div :class="'options__speed option-box '+index" v-for="(item, index) in f5.speeds">
                            <label :for="index">@{{item.name}}</label>
                            <select :name="'options__speed_'+index" v-model="options.speeds[index]">
                                <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+options.measure.measureUnit}}</option>
                            </select>
                            <span v-if="index === 'fly' && options.speeds['fly'] > 0">
                                @{{f5.misc.hover}}: <input type="checkbox" v-model="options.hover">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stat-block__line-break"></div>

            <div class="stat-block__ability-scores">
                <div class="stat-block__ability focus-edit" v-for="(item, index) in f5.abilities" >
                    <div class="stat-block__ability-name">
                        @{{index.toUpperCase()}}
                    </div>
                    <div class="stat-block__ability-score display-field">
                        @{{options.abilities[index]}} (@{{addPlus(calcAbilityMod(options.abilities[index]))}})
                    </div>
                    <div :class="'edit-field options__ability option-box '+index">
                        Score: 
                        <select :name="'options__ability_'+index" v-model="options.abilities[index]">
                            <option v-for="i in 31" :value="i-1" >@{{i-1}}</option>
                        </select>
                        <br/>
                        Save: <input :name="'options__saving-throws_'+index" v-model="options.savingThrows[index]" type="checkbox" />
                    </div>
                </div>
            </div>
            <div class="stat-block__line-break"></div>

            <div class="stat-block__attributes hidden-holder">
                <div v-if="savingThrowText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_saving_throws}}:</span>
                    <span class="display-field">@{{savingThrowText}}</span>
                </div>
                <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !skillText}">
                    <span v-if="skillText" class="title">@{{f5.misc.title_skills}}:</span>
                    <span v-else class="title">+ @{{f5.misc.title_skills}}</span>
                    <span>@{{skillText}}</span>
                    <Multiselect class="edit-field edit-field--flex"
                        :placeholder="f5.misc.choose_skill"
                        v-model="options.skills" 
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
                    </Multiselect>
                </div>

                <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !damageResistanceText}">
                    <span v-if="damageResistanceText" class="title">@{{f5.misc.title_damage_resistances}}:</span>
                    <span v-else class="title">+ @{{f5.misc.title_damage_resistances}}</span>
                    <span>@{{damageResistanceText}}</span>
                    <Multiselect class="edit-field edit-field--flex"
                        v-model="options.damageResistances" 
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
                    </Multiselect>
                </div>

                <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !damageImmunitiesText}">
                    <span v-if="damageImmunitiesText" class="title">@{{f5.misc.title_damage_immunities}}:</span>
                    <span v-else class="title">+ @{{f5.misc.title_damage_immunities}}</span>
                    <span>@{{damageImmunitiesText}}</span>
                    <Multiselect class="edit-field edit-field--flex"
                        v-model="options.damageImmunities" 
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
                    </Multiselect>
                </div>

                <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !damageVulnerabilitiesText}">
                    <span v-if="damageVulnerabilitiesText" class="title">@{{f5.misc.title_damage_vulnerabilities}}:</span>
                    <span v-else class="title">+ @{{f5.misc.title_damage_vulnerabilities}}</span>
                    <span>@{{damageVulnerabilitiesText}}</span>
                    <Multiselect class="edit-field edit-field--flex"
                        v-model="options.damageVulnerabilites" 
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
                    </Multiselect>
                </div>

                <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !conditionImmunitiesText}">
                    <span v-if="conditionImmunitiesText" class="title">@{{f5.misc.title_condition_immunities}}:</span>
                    <span v-else class="title">+ @{{f5.misc.title_condition_immunities}}</span>
                    <span>@{{conditionImmunitiesText}}</span>
                    <Multiselect class="edit-field edit-field--flex"
                        v-model="options.conditionImmunities" 
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
                    </Multiselect>
                </div>

                <div class="stat-block__attribute focus-edit" v-bind:class="{'edit-show': !sensesText}">
                    <span v-if="sensesText" class="title">@{{f5.misc.title_senses}}:</span>
                    <span v-else class="title">+ @{{f5.misc.title_senses}}</span>
                    <span>@{{sensesText}}</span>
                    <div class="option options-row options__senses edit-field">
                        <div :class="'options__senses option-box '+index" v-for="(item, index) in f5.senses">
                            <label :for="'sense_'+index">@{{item.name}}</label>
                            <select :name="'options__sense_'+index" v-model="options.senses[index]">
                                <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+options.measure.measureUnit}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="stat-block__attribute focus-edit">
                    <span class="title">@{{f5.misc.title_languages}}:</span>
                    <span>@{{languageText}}</span>
                    <Multiselect class="edit-field edit-field--flex"
                        v-model="options.languages.spokenWritten" 
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
                    </Multiselect>
                </div>
                <div class="stat-block__attribute no-edit">
                    <span class="title">@{{f5.misc.title_challenge_rating}}:</span>
                    <span class="display-field">@{{crText}}</span>
                </div>
                <div class="stat-block__attribute no-edit">
                    <span class="title">@{{f5.misc.title_proficiency}}:</span>
                    <span class="display-field">@{{proficiencyText}}</span>
                </div>
            </div>

            <div class="stat-block__line-break"></div>

            <div class="stat-block__passives">
                <div class="stat-block__add-feature-button" @click="createFeature('passives')">
                    @{{f5.misc.title_add_passive}}
                </div>
                <statblock-feature 
                    v-for="passive in options.features.passives"
                    v-model="passive"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>
            <div class="stat-block__actions">
                <div v-if="options.features.actions.length" class="stat-block__subtitle">
                    @{{f5.misc.title_action}}
                </div>
                <div class="stat-block__add-feature-button" @click="createFeature('actions')">
                    @{{f5.misc.title_add_action}}
                </div>
                <statblock-feature 
                    v-for="action in options.features.actions"
                    v-model="action"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>
            <div class="stat-block__bonus-actions">
                <div v-if="options.features.bonusActions.length" class="stat-block__subtitle">
                    @{{f5.misc.title_bonus_action}}
                </div>
                <div class="stat-block__add-feature-button" @click="createFeature('bonusActions')">
                    @{{f5.misc.title_add_bonus_action}}
                </div>
                <statblock-feature 
                    v-for="bonusAction in options.features.bonusActions"
                    v-model="bonusAction"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>

        </div>

        <div class="stat-block__column">
            <div class="stat-block__reactions">
                <div v-if="options.features.reactions.length" class="stat-block__subtitle">
                    @{{f5.misc.title_reaction}}
                </div>
                <div class="stat-block__add-feature-button" @click="createFeature('reactions')">
                    @{{f5.misc.title_add_reaction}}
                </div>
                <statblock-feature 
                    v-for="reaction in options.features.reactions"
                    v-model="reaction"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>
            <div class="stat-block__legendary-actions">
                <div v-if="options.features.legendaryActions.length" class="stat-block__subtitle">
                    @{{f5.misc.title_legendary_action}}
                </div>
                <div class="stat-block__add-feature-button" @click="createFeature('legendaryActions')">
                    @{{f5.misc.title_add_legendary_action}}
                </div>
                <statblock-feature 
                    v-for="legendaryAction in options.features.legendaryActions"
                    v-model="legendaryAction"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>
            <div class="stat-block__mythic-actions">
                <div v-if="options.features.mythicActions.length" class="stat-block__subtitle">
                    @{{f5.misc.title_mythic_action}}
                </div>
                <div class="stat-block__add-feature-button" @click="createFeature('mythicActions')">
                    @{{f5.misc.title_add_mythic_action}}
                </div>
                <statblock-feature 
                    v-for="mythicAction in options.features.mythicActions"
                    v-model="mythicAction"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>
            <div class="stat-block__lair-actions">
                <div v-if="options.features.lairActions.length" class="stat-block__subtitle">
                    @{{f5.misc.title_lair_action}}
                </div>
                <div class="stat-block__add-feature-button" @click="createFeature('lairActions')">
                    @{{f5.misc.title_add_lair_action}}
                </div>
                <statblock-feature 
                    v-for="lairAction in options.features.lairActions"
                    v-model="lairAction"
                    v-on:remove-feature="removeFeature"
                ></statblock-feature>
            </div>
        </div>
    </div>
</div>