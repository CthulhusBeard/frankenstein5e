<div class="stat-block-container">
    <div class="stat-block">
        <div class="stat-block__column">
            <div class="stat-block__title focusEdit">
                <span class="displayField">@{{options.name}}</span>
                <input type="text" class="editField" v-model="options.name" />
            </div>
            <div class="stat-block__size-alignment focusEdit">
                <span>@{{descriptionText}}</span>
                <div class="option options__sizes editField">
                    <br/>
                    @{{ f5.misc.title_size }}:
                    <select id="options__size" name="options__size" v-model="options.size">
                        <option v-for="(item, index) in f5.creaturesizes" :value="index">@{{item.name}}</option>
                    </select>
                </div>
                <div class="option options__types editField">
                    <br/>
                    @{{ f5.misc.title_type }}:
                    <select id="options__type" name="options__type" v-model="options.type">
                        <option disabled value="">Please select one</option>
                        <option v-for="(item, index) in f5.creaturetypes" :value="index">@{{item.name}}</option>
                    </select>
                </div>
                <div class="option options__subtypes editField">
                    <br/>
                    @{{ f5.misc.title_subtype }}:
                    <select id="options__subtype" name="options__subtype" v-model="options.subtype">
                        <option selected value="">None</option>
                        <option v-for="(item, index) in f5.creaturesubtypes" :value="index">@{{item.name}}</option>
                    <!--<option v-for="item in orderedSubtypes" :value="item.id">@{{item.name}}</option>-->
                    </select>
                </div>
                <div class="option options__type-option editField" v-if="typeCategoryList.length > 0">
                    <br/>
                    @{{ f5.misc.title_category }}:
                    <select id="options__type-option" name="options__typeCategory" v-model="options.typeCategory">
                        <option value="">None</option>
                        <option v-for="item in typeCategoryList" :value="item.id">@{{item.name}}</option>
                    </select>
                </div>
                <div class="option options__alignments editField">
                    <br/>
                    @{{ f5.misc.title_alignments }}:
                    <select id="options__alignment" name="options__alignment" v-model="options.alignment">
                        <option value="">None</option>
                        <option v-for="(item, index) in f5.alignments" :value="index">@{{item.name}}</option>
                    </select>
                    @{{f5.misc.title_alignments_typically}}<input type="checkbox" v-model="options.showTypicalAlignment">
                </div>
            </div>
            <div class="stat-block__line-break"></div>
            <div class="stat-block__attributes">
                <div class="stat-block__attribute focusEdit">
                    <span class="title">@{{f5.misc.title_armor_class}}:</span>
                    <span class="displayField">@{{acText}}</span>
                    <div class="option options__hitpoints editField">
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
                    </div>
                </div>
                <div class="stat-block__attribute focusEdit">
                    <span class="title">@{{f5.misc.title_hit_points}}:</span>
                    <span>@{{hitPointsText}}</span>
                    <div class="option options__hitpoints editField">
                        <br/>
                        <label>@{{f5.misc.hit_dice_amount}}:</label>
                        <select id="options__hitdice-amount" name="options__hitdice-amount" v-model="options.hitPoints.diceAmount">
                            <option v-for="i in 30" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{f5.misc.hit_dice_type}}:</label>
                        <select id="options__hitdice-type" name="options__hitdice-type" v-model="options.hitPoints.diceType">
                            <option v-for="i in f5.hitdice" :value="i" >@{{i}}</option>
                        </select>
                        <br/>
                        <label>@{{f5.misc.additional}}:</label>
                        <input type="number" min="0" max="9999" id="options__hitpoints-additional" name="options__hitpoints-additional" v-model="options.hitPoints.additional" value="0" />
                    </div>
                </div>
                <div class="stat-block__attribute focusEdit">
                    <span class="title">@{{f5.misc.title_speed}}:</span>
                    <span>@{{speedText}}</span>
                    <div class="option options-row options__speeds editField">
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
                <div class="stat-block__ability focusEdit" v-for="(item, index) in f5.abilities" >
                    <div class="stat-block__ability-name">
                        @{{index.toUpperCase()}}
                    </div>
                    <div class="stat-block__ability-score displayField">
                        @{{options.abilities[index]}} (@{{calcAbilityMod(options.abilities[index], true)}})
                    </div>
                    <div :class="'editField options__ability option-box '+index">
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
            <div class="stat-block__attributes">
                <div v-if="savingThrowText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_saving_throws}}:</span>
                    <span class="displayField">@{{savingThrowText}}</span>
                </div>
                <div v-if="skillText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_skills}}:</span>
                    <span class="displayField">@{{skillText}}</span>
                </div>
                <div v-if="damageResistanceText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_damage_resistances}}:</span>
                    <span class="displayField">@{{damageResistanceText}}</span>
                </div>
                <div v-if="damageImmunitiesText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_damage_immunities}}:</span>
                    <span class="displayField">@{{damageImmunitiesText}}</span>
                </div>
                <div v-if="damageVulnerabilitiesText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_damage_vulnerabilities}}:</span>
                    <span class="displayField">@{{damageVulnerabilitiesText}}</span>
                </div>
                <div v-if="conditionImmunitiesText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_condition_immunities}}:</span>
                    <span class="displayField">@{{conditionImmunitiesText}}</span>
                </div>
                <div v-if="sensesText" class="stat-block__attribute">
                    <span class="title">@{{f5.misc.title_senses}}:</span>
                    <span class="displayField">@{{sensesText}}</span>
                </div>
                <div class="stat-block__attribute focusEdit">
                    <span class="title">@{{f5.misc.title_languages}}:</span>
                    <span>@{{languageText}}</span>
                    <Multiselect class="editField editField--flex"
                        v-model="options.languages" 
                        mode="tags"
                        :options="f5.languages" 
                        mode="multiple"
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
                <div class="stat-block__attribute noEdit">
                    <span class="title">@{{f5.misc.title_challenge_rating}}:</span>
                    <span class="displayField">@{{crText}}</span>
                </div>
                <div class="stat-block__attribute noEdit">
                    <span class="title">@{{f5.misc.title_proficiency}}:</span>
                    <span class="displayField">@{{proficiencyText}}</span>
                </div>
            </div>
            <div class="stat-block__line-break"></div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
            <div class="stat-block__subtitle"><span>A</span>ctions</div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
        </div>
        
        <div class="stat-block__column">
            <div class="stat-block__subtitle"><span>L</span>egendary <span>A</span>ctions</div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
        </div>
    </div>
</div>
