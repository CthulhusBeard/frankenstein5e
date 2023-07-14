import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';

const template = require('../html/statblock-feature.html');

export default {
    props: [
        'initialType',
        'initialData',
        'featureMap',
        'playerData',
        'combatRounds',
        'f5',
    ],

    template: template,  

    components: {
        'Multiselect': Multiselect,
    },

    data: function() {
        return this.featureDataSetup();
    },

    watch: {
        value: {
            handler(val) {
                //TODO: Can these be optimized to not be "deep"

                //If AOE target area doesn't apply to this template, change it 
                //TODO: make AOE target type?
                if(!this.f5.areaofeffect[this.value.targetType].types.includes(this.value.template)) {
                    for(const key in this.f5.areaofeffect) {
                        let element = this.f5.areaofeffect[key];
                        if(element.types.includes(this.value.template)) {
                            this.value.targetType = key;
                            break;
                        }
                    }
                }
            }, 
            deep: true
        }
    },

    computed: {

        averageDPR: function() {
            if(this.value.template == 'reference') {
                if(this.referencedProjection[0] && this.referencedProjection[0].hasOwnProperty('damage')) {
                    return this.referencedProjection[0].damage;
                } else {  
                    return 0;
                }
            }

            if(this.damageProjection && this.damageProjection.hasOwnProperty('damage')) {
                return this.damageProjection.damage;
            } 
            return 0;
        },

        maxDPR: function() {
            if(this.value.template == 'reference') {
                if(this.referencedProjection[0] && this.referencedProjection[0].hasOwnProperty('maxDamage')) {
                    return this.referencedProjection[0].maxDamage;
                } else {  
                    return 0;
                }
            }
            
            if(this.damageProjection && this.damageProjection.hasOwnProperty('maxDamage')) {
                return this.damageProjection.maxDamage;
            } 
            return 0;
        },

        displayName: function() {
            let nameText;

            if(this.value.template == 'legendary_resistance') {
                nameText = this.f5.featuretemplates.legendary_resistance.title.locReplace(':legendary_resistance_count', this.value.legendaryResistances);
            } else {

                nameText = this.value.name;
                //anything that triggers brackets //Different forms?
                let brackets = this.bracketText; //separated by "sentence_list_separator_secondary"
                
                if(brackets) {
                    nameText += ' ('+brackets+')';
                }

                nameText = nameText.trim();

                if(nameText.length > 0) {
                    nameText += this.f5.misc.sentence_end;
                }
            }

            this.$emit('update-feature-name', this.value.actionType, this.trackingId, this.value.name, nameText);
            return nameText;
        },

        bracketText: function() {
            let brackets = '';
            
            //Legendary action cost
            if(
                (
                    this.value.actionType === 'legendary_action' || 
                    (
                        this.$parent.value.hasMythicActions && 
                        this.value.actionType === 'mythic_action'
                    )
                ) &&
                this.value.legendaryActionCost > 1
            ) {
                brackets += this.f5.misc.action_cost.locReplace(':cost', this.value.legendaryActionCost);
            }

            //Recharge rate
            if(this.value.recharge.type !== 'none' && this.template !== 'reference') {
                if(brackets) {
                    brackets += this.f5.misc.sentence_list_separator_secondary+' ';
                }
                if(this.value.recharge.type === 'dice_roll') {
                    brackets += this.f5.misc.title_recharge+' '+this.value.recharge.minRoll;
                    if(this.value.recharge.minRoll !== this.value.recharge.diceType) {
                        brackets += '-'+this.value.recharge.diceType;
                    }
                } else if(this.f5.recharge[this.value.recharge.type].desc) {
                    brackets += this.f5.recharge[this.value.recharge.type].desc.locReplace(':uses', this.value.recharge.uses);
                }
            }
            return brackets; 
        },

        hasRunOnSentence: function() {
            if(
                (
                    this.value.template == 'attack' && 
                    this.value.attack.savingThrow &&
                    (this.value.savingThrow.conditions.length > 1 || this.value.attack.damage.length > 1)
                )
            ) {
                return true;
            }
            // TODO make this work
            return false;
        },

        getValidTemplateTypes: function() {
            let options = {};
            for(let i in this.f5.featuretemplates) {
                if(
                    this.f5.featuretemplates[i].action_options && 
                    this.f5.featuretemplates[i].action_options.includes(this.value.actionType)
                ) {

                    options[i] = this.f5.featuretemplates[i];
                }
            }
            return options;
        },

        highestCastableSpell:function() {
            let highestSlot = -1;
            
            for(const level in this.value.spellList) {
                let spell = this.value.spellList[level];
                if(
                    level > highestSlot && //this spell is higher than a previously found spell
                    (
                        spell.at_will || //if it can be cast at will or 
                        level === 0 || //is a cantrip or 
                        (!this.value.spellcasting.innate && this.value.spellcasting.spellLevels[level].slots > 0) || //with spell slots
                        (this.value.spellcasting.innate && spell.uses > 0) // or with spell uses
                    )
                ) {
                    highestSlot = level;
                }
            }

            return highestSlot;
        },

        spellsSlotsSorted: function() {
            let spellsSorted = [];
            for(const level in this.value.spellList) {
                let spell = this.value.spellList[level];
                if(!spell.at_will && this.value.spellcasting.spellLevels[level].slots >= 0) {
                    if(!spellsSorted[level]) {
                        spellsSorted[level] = [];
                    }
                    spellsSorted[level].push(spell);
                } 
            }
            return spellsSorted;
        },

        spellsUsesSorted: function() {
            let spellsSorted = [];
            for(const level in this.value.spellList) {
                let spell = this.value.spellList[level];
                if(!spell.at_will && (spell.uses > 0 || level === 0)) {
                    let newIndex = spell.uses;
                    if(level === 0) {
                        newIndex = 0;
                    }
                    if(!spellsSorted[newIndex]) {
                        spellsSorted[newIndex] = [];
                    }
                    spellsSorted[newIndex].push(spell);
                }
            }
            return spellsSorted;
        },

        descriptionEditText: function() {
            let brackets = this.bracketText; //separated by "sentence_list_separator_secondary"
            if(brackets) {
                brackets = '<strong>('+brackets+')</strong> ';
            }
            return brackets + this.descriptionText;
        },

        descriptionText: function() {
            let descText = '';
            let prefixText = '';
            let forceEmpty = false;

            if(this.value.actionType === 'passive' && !this.f5.featuretemplates[this.value.template].no_trigger) {
                prefixText += this.f5.durations[this.value.passiveTrigger]['desc'];
            }


            //Custom Description
            if(this.value.template == 'custom') {
                descText += this.value.custom.description;

                let damageList = [];
                for(let i in this.value.custom.damage) {
                    damageList.push(this.createDamageText(this.value.custom.damage[i], this.value.custom.ability));
                }
                descText = descText.replace(':custom_damage_text', this.createSentenceList(damageList));

            //Multiattack Description
            } else if(this.value.template == 'multiattack') {
                descText += this.multiattackDescription;

            //Spellcasting Description
            } else if(this.value.template == 'spellcasting') {
                descText += this.spellcastingDescription;
                
            //Attack Description
            } else if(this.value.template == 'attack') {
                descText += this.attackDescription;
                if(this.value.attack.savingThrow) {
                    //Add Saving Throw
                    descText += this.savingThrowDescription;
                }
                if(this.value.regenerate.type !== 'none') {
                    //Add Regen
                    descText += this.regenerateDescription;
                }

            //Saving Throw Description
            } else if(this.value.template == 'saving_throw') {
                descText += this.savingThrowDescription;
                
            //Existing Feature Description
            } else if(this.value.template == 'reference') {
                descText += this.referencedFeatureDescription;
                
            //Regeneration Feature Description
            } else if(this.value.template == 'regenerate') {
                if(this.value.regenerate.type === 'none') {
                    forceEmpty = true;
                } else {
                    descText += this.regenerateDescription;
                }
                
            //Legendary Resistance Feature Description
            } else if(this.value.template == 'legendary_resistance') {
                descText += this.legendaryResistanceDescription;

            //Magic Resistance Feature Description
            } else if(this.value.template == 'magic_resistance') {
                descText += this.f5.featuretemplates.magic_resistance.desc;
            }

            //Additional Text
            if(this.value.additionalDescription) {
                descText += ' '+this.value.additionalDescription;
            }            

            descText = this.descriptionTextReplace(descText);

            if(prefixText.length) {
                descText = prefixText + descText.charAt(0).toLowerCase() + descText.slice(1);
            }

            //Something negates the other text and should be returned as empty
            if(forceEmpty) {
                descText = '';
            }

            this.$emit('update-feature-description', this.value.actionType, this.trackingId, descText);
            
            return descText;
        },

        multiattackDescription: function() {
            if(this.value.template !== 'multiattack') {
                return '';
            }
            let featureMap = this.featureMap;
            let maDesc = this.f5.misc.desc_multiattack;
            let maAltDesc = this.f5.misc.desc_multiattack_alternative;
            let maAbilityDescs = [
                [],[]
            ]; // Multiattacks will only have 2 options

            for(let i in this.value.multiattackReferences) {
                let group = this.value.multiattackReferences[i];
                let prevTemplate = '';
                for(let j in group) {
                    let featureRef = group[j];

                    let featDesc = this.f5.misc.desc_multiattack_ability;
                    let feature;
                    if(featureRef.id !== null) {

                        //Get Feature from map
                        for(let actionType in featureMap) {
                            for(let featureInMap of featureMap[actionType]) {
                                if(featureInMap.trackingId === featureRef.id) {
                                    feature = featureInMap;
                                    break;
                                }
                            }
                        }

                        if(!feature) {
                            continue;
                        }

                        if(feature.actionType === 'spellcasting') {
                            featDesc = this.pluralize(this.f5.misc.desc_multiattack_spell, featureRef.uses);
                        } else {
                            if(feature.template === 'attack') {
                                let attackString = this.pluralize(this.f5.misc.attack, featureRef.uses);
                                let attackSingular = this.pluralize(this.f5.misc.attack);
                                let attackPlural = this.pluralize(this.f5.misc.attack, 2);
                                featDesc = this.f5.misc.desc_multiattack_attack;
                                featDesc = featDesc.locReplace(':ability_name', feature.name);
                                
                                if(feature.name.toLowerCase().substr(-attackSingular.length) == attackSingular) {
                                    //Existing name matches singular "attack"
                                    featDesc = featDesc.replace(attackSingular.substr(1)+' :attack_text', attackString.substr(1));
                                } else if(feature.name.toLowerCase().substr(-attackPlural.length) == attackPlural) {
                                    //Existing name matches plural "attacks"
                                    featDesc = featDesc.replace(attackPlural.substr(1)+' :attack_text', attackString.substr(1));
                                } else {
                                    featDesc = featDesc.locReplace(':attack_text', attackString);
                                }
                            }
                        }

                        if(prevTemplate !== feature.template) {
                            featDesc = featDesc.locReplace(':can_use', this.f5.misc.desc_can_use);
                        } else {
                            featDesc = featDesc.locReplace(':can_use ', '');
                        }
                        featDesc = featDesc.locReplace(':use_count_semantics', this.numberOfTimesSemantics(featureRef.uses));
                        featDesc = featDesc.locReplace(':use_count', this.numberToWord(featureRef.uses));
                        featDesc = featDesc.locReplace(':ability_name', feature.name);

                        prevTemplate = feature.template;

                        maAbilityDescs[i].push(featDesc);
                    } 
                }
            }

            if(maAbilityDescs[0].length > 0) {
                maDesc = maDesc.locReplace(':multiattack_descriptions', this.createSentenceList(maAbilityDescs[0]));
                
                if(maAbilityDescs[1].length > 0) {
                    maAltDesc = maAltDesc.locReplace(':multiattack_descriptions', this.createSentenceList(maAbilityDescs[1]));
                    maDesc += ' '+maAltDesc;
                }
            } else {
                if(maAbilityDescs[1].length > 0) {
                    maDesc = maDesc.locReplace(':multiattack_descriptions', this.createSentenceList(maAbilityDescs[1]));
                } else {
                    maDesc = ' ';
                }
            }
            
            return maDesc;
        },

        referencedFeatureDescription: function() {
            if(this.value.template !== 'reference') {
                return '';
            }
            let featureDesc = '';
            let feature = this.getReferencedFeature();

            if(feature !== null) {
                featureDesc = this.descriptionTextReplace(this.f5.misc.creature_uses_feature).locReplace(':feature_name', feature.name);
            }
            return featureDesc;
        },

        spellcastingDescription: function() {
            if(this.value.template !== 'spellcasting') {
                return '';
            }

            let spellDesc = this.f5.misc.desc_spellcasting;
            if(this.value.spellcasting.innate) { 
                spellDesc = this.f5.misc.desc_innate_spellcasting;
            } else if(this.value.spellcasting.class) {
                spellDesc = this.f5.misc.desc_prepared_spellcasting;
            }

            if(this.value.spellcasting.atWillSpells.spellList.length > 0) {
                spellDesc = spellDesc.locReplace(':at_will_spells', this.f5.misc.desc_at_will_spells);
                spellDesc = spellDesc.locReplace(':at_will_spell_list', '<i>'+this.value.spellcasting.atWillSpells.spellList.toLowerCase()+'</i>');
            } else {
                spellDesc = spellDesc.locReplace(':at_will_spells', '');
            }

            if(this.value.spellcasting.class) {
                spellDesc = spellDesc.locReplace(':spellcasting_class', ' '+this.value.spellcasting.class);
            } else {
                spellDesc = spellDesc.locReplace(':spellcasting_class', '');
            }
            

            //Spells
            spellDesc += '<br/><br/>';

            let sortedSpellList;
            if(this.value.spellcasting.innate) { //merge spell lists with the same use count
                sortedSpellList = [];
                for(const level in this.value.spellcasting.spellLevels) {
                    if(
                        (level == 0 || this.value.spellcasting.spellLevels[level].slots > 0) &&
                        this.value.spellcasting.spellLevels[level].spellList.length > 0
                    ) {
                        if(sortedSpellList[this.value.spellcasting.spellLevels[level].slots]) {
                            sortedSpellList[this.value.spellcasting.spellLevels[level].slots].spellList += this.f5.misc.sentence_list_separator + ' ' + this.value.spellcasting.spellLevels[level].spellList;
                        } else {
                            sortedSpellList[this.value.spellcasting.spellLevels[level].slots] = {spellList: this.value.spellcasting.spellLevels[level].spellList}
                        }
                    }
                }
            } else {
                sortedSpellList = this.value.spellcasting.spellLevels;
            }

            for(const level in sortedSpellList) {
                let spellSlotList = sortedSpellList[level];
                if(spellSlotList.spellList.length === 0) { //there are no spells at this level
                    continue;
                }

                if(sortedSpellList[level].slots <= 0 && level != 0) { //there are no spell slots for this level
                    continue;
                }
                
                if(level == 0) {
                    if(this.value.spellcasting.innate) {
                        spellDesc += this.$parent.capitalize(this.f5.misc.at_will)+': ';
                    } else {
                        spellDesc += this.f5.spelllevels[level].name+' ('+this.f5.misc.at_will+'): ';
                    }
                } else {
                    if(this.value.spellcasting.innate) {
                        spellDesc += this.f5.misc.spell_uses.locReplace(':slot_uses',level)+': ';
                    } else {
                        spellDesc += this.f5.spelllevels[level].name+' ('+this.pluralize(this.f5.misc.spell_slots, sortedSpellList[level].slots).locReplace(':slot_quantity',sortedSpellList[level].slots)+'): ';
                    }
                }
                
                spellDesc += '<i>'+spellSlotList.spellList+'</i><br/><br/>';
            }

            if(this.value.spellcasting.useBeforeCombatSpell) {
                spellDesc += this.f5.misc.casts_spells_before;
            }
            
            return spellDesc;
        },

        attackDescription: function() {
            if(this.value.template !== 'attack') {
                return '';
            }
            let attackDesc = this.f5.misc.desc_attack;

            //Hit
            attackDesc += ' <i>'+this.f5.misc.desc_attack_hit+'</i> ';
            let damageList = [];
            for(let i in this.value.attack.damage) {
                damageList.push(this.createDamageText(this.value.attack.damage[i], this.value.attack.ability));
            }
            attackDesc += this.createSentenceList(damageList);

            if(!this.value.attack.savingThrow) {
                attackDesc += this.f5.misc.sentence_end;
            }

            return attackDesc;
        },

        savingThrowDescription: function() {
            if(this.value.template !== 'saving_throw' && !(this.value.template == 'attack' && this.value.attack.savingThrow) ) {
                return '';
            }
            let savingThrowText = '';
            // if(this.value.savingThrow.damage.length >= 1 && this.value.savingThrow.conditions.length >= 2) {
            //     savingThrowText = this.f5.misc.desc_attack_saving_throw_damage_condition;
            // } else 
            if(this.value.savingThrow.damage.length >= 1 && this.value.savingThrow.conditions.length >= 1) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_damage_condition;
            } else if(this.value.savingThrow.damage.length >= 1) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_damage;
            } else if(this.value.savingThrow.conditions.length >= 1) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_condition;
            }

            //Targets
            let stTargetCount = 2; //or more. 
            if(this.value.template == 'attack') {
                stTargetCount = this.value.attack.targets;
            }

            if(this.value.template == 'attack') {
                savingThrowText = savingThrowText.locReplace(':target_text', this.pluralize(this.f5.misc.the_target, this.value.attack.targets));
            } else {

                let targetData = this.f5.areaofeffect[this.value.targetType];
                let targetText = targetData['desc'];

                if(targetData.target_type == 'aoe') {
                    targetText = this.pluralize(targetText, (this.value.aoeRange > 0) ? 2 : 1);
                    targetText = targetText.locReplace(':target_area', this.value.targetAreaWidth+' '+this.$parent.$parent.editor.measure.measureUnit);
                } 
                if(targetData.limited_targets) {
                    stTargetCount = this.value.attack.targets;
                    targetText = this.pluralize(targetText, stTargetCount);
                    targetText = targetText.locReplace(':target_count', stTargetCount);
                }

                if(this.value.aoeFriendlyFire === 'hostile') {
                    targetText = targetText.locReplace(':friendly_hostile', ' '+this.f5.misc.target_hostile);
                } else if(this.value.aoeFriendlyFire === 'friendly') {
                    targetText = targetText.locReplace(':friendly_hostile', ' '+this.f5.misc.target_friendly);
                } else {
                    targetText = targetText.locReplace(':friendly_hostile', '');
                }

                targetText = targetText.locReplace(':target_range', this.value.aoeRange+' '+this.$parent.$parent.editor.measure.measureUnit);
                savingThrowText = savingThrowText.locReplace(':target_text', targetText);

            }
            
            //Adjust for run-on sentences
            if(this.value.template == 'attack' && this.value.attack.savingThrow && this.value.attack.damage.length > 0) {
                if(this.hasRunOnSentence) {
                    savingThrowText = this.f5.misc.sentence_end+' '+this.f5.misc.additionally.locReplace(':addition', savingThrowText);
                } else {
                    savingThrowText = this.f5.misc.sentence_list_separator+' '+this.f5.misc.and+' '+savingThrowText;
                }
            } else {
                savingThrowText = this.$parent.capitalize(savingThrowText);
            }
            
            //Half as much
            if(this.value.savingThrow.halfOnSuccess) {
                savingThrowText = savingThrowText.locReplace(':half_as_much', this.f5.misc.desc_saving_throw_half_on_success);
            } else {
                savingThrowText = savingThrowText.locReplace(':half_as_much', '');
                savingThrowText = savingThrowText.locReplace(':not_condition', '');
            }

            //Add Saving Throw Damage
            if(this.value.savingThrow.damage.length) {
                let stDamageList = [];
                for(let i in this.value.savingThrow.damage) {
                    let damageText = this.createDamageText(this.value.savingThrow.damage[i], this.value.savingThrow.monsterAbility);
                    stDamageList.push(damageText);
                }
                savingThrowText = savingThrowText.locReplace(':damage', this.createSentenceList(stDamageList));
            }

            //Add Saving Throw Conditions
            if(this.value.savingThrow.conditions.length) {
                let stConditionList = [];
                let stNotConditionList = [];
                for(let i in this.value.savingThrow.conditions) {
                    let conditionText = this.f5.conditions[this.value.savingThrow.conditions[i]].name.toLowerCase();

                    let conditionPhrasing = this.f5.conditions[this.value.savingThrow.conditions[i]].is;
                    if(i > 0) {
                        conditionPhrasing = this.f5.conditions[this.value.savingThrow.conditions[i]].past_tense.toLowerCase();
                    }
                    stConditionList.push(
                        this.pluralize(conditionPhrasing, stTargetCount).locReplace(':condition', conditionText)
                    );

                    let notConditionPhrasing = this.f5.conditions[this.value.savingThrow.conditions[i]].not;
                    if(i > 0) {
                        notConditionPhrasing = this.f5.conditions[this.value.savingThrow.conditions[i]].past_tense.toLowerCase();
                    }
                    stNotConditionList.push(
                        this.pluralize(notConditionPhrasing, stTargetCount).locReplace(':condition', conditionText)
                    );
                }
                savingThrowText = savingThrowText.locReplace(':condition', this.createConditionSentenceList(stConditionList));
                savingThrowText = savingThrowText.locReplace(':not_condition', ' '+this.f5.misc.and + ' ' + this.createConditionSentenceList(stNotConditionList, false));
            
            
                //Condition Durations
                let durationData = this.f5.durations[this.value.savingThrow.conditionDuration];
                let conditionsWithDuration = 0;
                for(let i in this.value.savingThrow.conditions) {
                    let conditionData = this.f5.conditions[this.value.savingThrow.conditions[i]];
                    if(conditionData.has_duration) {
                        conditionsWithDuration++;
                    }
                }   

                let durationText = '';
                if(conditionsWithDuration > 0) {
                    if(this.value.savingThrow.conditionDuration === 'specified_timeframe') {
                        durationText = ' '+durationData['desc'].locReplace(':duration', this.pluralize(this.f5.timeunits[this.value.savingThrow.conditionDurationUnit].desc, this.value.savingThrow.conditionDurationAmount).locReplace(':value', this.value.savingThrow.conditionDurationAmount));
                    } else if(durationData.hasOwnProperty('desc')) {
                        durationText = ' '+durationData['desc'];
                    }
                }
                savingThrowText = savingThrowText.locReplace(':condition_duration', durationText);
                
                //Repeat Condition Save
                let repeatSaveText = '';
                if(durationData.force_repeat_save === true || this.value.savingThrow.conditionRepeatSave) {
                    repeatSaveText = this.f5.misc.repeat_condition_saving_throw_text;

                    let pastTenseConditionList = [];
                    for(let i in this.value.savingThrow.conditions) {
                        let conditionData = this.f5.conditions[this.value.savingThrow.conditions[i]];
                        if(conditionData.has_duration) {
                            pastTenseConditionList.push(conditionData.past_tense.toLowerCase().replace(':condition', conditionData.name));
                        }
                    }   
                    if(pastTenseConditionList.length > 0) {
                        repeatSaveText = repeatSaveText.locReplace(':condition', this.createConditionSentenceList(pastTenseConditionList, false));
                    }

                }
                savingThrowText = savingThrowText.locReplace(':repeat_condition_save', ' '+repeatSaveText);

                let immuneToConditionText = '';
                if(this.value.savingThrow.conditionImmuneAfterSave) {
                    immuneToConditionText = this.f5.misc.immune_to_condition_after_save;
                }
                savingThrowText = savingThrowText.locReplace(':immune_to_condition', ' '+immuneToConditionText);
            }

            return savingThrowText;
        },

        regenerateDescription: function() {
            if(this.value.template !== 'regenerate') {
                return '';
            }
            let regenObj = this.f5.regenerate[this.value.regenerate.type];
            let desc = regenObj.desc;
            let regenList = [];

            if(this.value.regenerate.type === 'custom') {
                desc = this.value.regenerate.customText;
            }

            if(!regenObj['requires_damage'] || this.value.regenerate.type === 'custom') {
                for(let i = 0; i < this.value.regenerate.damage.length; i++) {
                    regenList.push(this.createDamageText(this.value.regenerate.damage[i]));
                }
                desc = desc.locReplace(':regenerate_hit_point_amount', this.createSentenceList(regenList));
            }
            
            return desc;
        },

        legendaryResistanceDescription: function() {
            return this.f5.featuretemplates.legendary_resistance.desc;
        },

        damageProjection: function() {
            let projection;

            if(this.value.template === 'spellcasting') {
                projection = this.createSpellcastingProjection();
            } else if(this.value.template === 'multiattack') {
                projection = this.createMultiattackProjection();
            } else if(this.value.template == 'reference') {
                let refFeature = this.getReferencedFeature();
                if(refFeature) {
                    //TODO: This is not as reactive as I'd like it to be. 
                    projection = refFeature.damageProjection;
                } else {
                    //TODO: Should this be something else?? TEST having standard stuff in it then switch to existing
                    projection = this.createStandardProjection();
                }
            } else {
                projection = this.createStandardProjection();
            }

            this.$emit('update-feature-projection', this.value.actionType, this.value.template, this.trackingId, projection);

            return projection;
        },

        multiattackMatches: function() {
            let maMatches = [];
            let maUnique = [];
            this.value.multiattackReferences.forEach(function (group, i) {
                group.forEach(function (feature, j) {
                    if(maUnique[j] !== undefined) {
                        maMatches.push(feature.id);
                    } else {
                        maUnique[j] = feature.id;
                    }
                });
            });
            return maMatches;
        },

        savingThrowSaveAbilities: function() {
            //Force one to always exist. you must always have a save ability for a saving throw
            if(this.value.savingThrow.saveAbilities.length === 0) {
                this.value.savingThrow.saveAbilities = ['str'];
            }
            return this.value.savingThrow.saveAbilities;
        },
    },

    methods: {

        createDamageDie: function(setAbilityBonus = false, requireDamageType = true) {
            let damageDie = {
                diceType: 6,
                diceAmount: 1,
                additional: 0,
                abilityBonus: setAbilityBonus,
            };
            if(requireDamageType) {
                damageDie.type = 'slashing';
            }
            return damageDie;
        },

        createMultiattackProjection: function() {
            //Multiattack Projections
            let mergedProjections = [];

            //Loop both Multiattack Group Options
            for(let maGroupIndex in this.value.multiattackReferences) {                
                mergedProjections.push({
                    id: this.trackingId,
                    actionCost: 1,
                    references: this.value.multiattackReferences[maGroupIndex],
                    multiattack: true,
                });
            }
            return mergedProjections;
        },

        createSpellcastingProjection: function() {
            //Spellcasting projections come in an array because it's 1 feature with multiple options
            let spellProjections = [];
            let spellSlotsTracker = [];

            for(const level in this.value.spellcasting.spellLevels) {
                let spellData = this.value.spellcasting.spellLevels[level];

                let projectionObj = {
                    id: this.trackingId,
                    name: this.f5.misc.title_spellcasting+': '+this.f5.spelllevels[level].name,
                    damage: this.$parent.averageDamage(this.f5.spelllevels[level].damage_single_target),
                    maxDamage: this.$parent.averageDamage(this.f5.spelllevels[level].damage_single_target, true),
                    actionCost: 1,
                };

                //Get number of castings
                if(parseInt(level) > 0) {
                    if(this.value.spellcasting.innate) {
                        projectionObj.totalUses = spellData.slots;
                    } else if(!spellSlotsTracker[level] && spellData.slots > 0) {
                        projectionObj.totalUses = spellData.slots;
                        projectionObj.name = this.f5.misc.title_spellcasting+': '+this.f5.spelllevels[level].name;
                        spellSlotsTracker[level] = true;
                    } else {
                        //Doesn't have slots or uses
                        continue;
                    }
                }

                //Cantrips scale with caster level
                if(parseInt(level) === 0) {
                    let cantripScalingData = this.f5.spelllevels[0]['level_scaling'];
                    let casterLevel = parseInt(this.$parent.casterLevel);
                    let matchingLevel = 1;
                    for(let i in cantripScalingData) {
                        if(parseInt(i) <= casterLevel && parseInt(i) >= matchingLevel) {
                            matchingLevel = parseInt(i);
                        }
                    }
                    let cantripMultiplier = cantripScalingData[matchingLevel];
                    projectionObj.damage = projectionObj.damage * cantripMultiplier;
                    projectionObj.maxDamage = projectionObj.maxDamage * cantripMultiplier;
                }

                spellProjections.push(projectionObj);
            }

            //At will spells
            if(this.value.spellcasting.atWillSpells.spellList.length > 0) {
                spellProjections.push({
                    id: this.trackingId,
                    name: this.f5.misc.title_spellcasting+': '+this.f5.spelllevels['at_will'].name,
                    damage: this.$parent.averageDamage(this.f5.spelllevels[this.value.spellcasting.atWillSpells.highestLevel].damage_single_target),
                    maxDamage: this.$parent.averageDamage(this.f5.spelllevels[this.value.spellcasting.atWillSpells.highestLevel].damage_single_target, true),
                    actionCost: 1,
                });
            }

            return spellProjections;
        },

        createStandardProjection: function() {
            //Not Spellcasting or Multiattack
            let actionCost = (['legendary_action', 'mythic_action'].includes(this.value.type)) ? legendaryActionCost : 1;
            let averageDamage = this.dprCalculator();
            let maxDamage = this.dprCalculator(true);

            let projectionObj = {
                id: this.trackingId,
                name: this.value.name,
                damage: averageDamage,
                maxDamage: maxDamage,
                actionCost: actionCost,
            };
            if(this.value.template === 'reference') {
                projectionObj.references = [{
                    id: this.existingFeatureReferenceId,
                }];
            }

            //Use/Recharge options
            if(this.value.recharge.type === 'long_rest' || this.value.recharge.type === 'short_rest') {
                projectionObj.totalUses = 1;
            } else if(this.value.recharge.type === 'limited_use') {       
                projectionObj.totalUses = this.value.recharge.uses;
            } else if(this.value.recharge.type === 'dice_roll') {
                projectionObj.rechargeTurns = Math.round(1 / ((this.value.recharge.diceType - this.value.recharge.minRoll + 1) / this.value.recharge.diceType));
            }

            //HP Regeneration
            if(this.value.regenerate.type !== 'none') {
                projectionObj.regenerate = 0; //Fix this
                
                if(this.value.regenerate.type === 'custom' || this.value.regenerate.type === 'automatic') {
                    for(let i in this.value.regenerate.damage) {
                        let regen = this.$parent.averageDamage(this.value.regenerate.damage[i]);
                        projectionObj.regenerate += regen; //Fix this
                    }
                } else if(this.value.regenerate.type === 'damage_dealt') {
                    projectionObj.regenerate = projectionObj.damage;
                } else if(this.value.regenerate.type === 'half_damage_dealt') {
                    projectionObj.regenerate = projectionObj.damage / 2;
                }
            }

            return projectionObj
        },

        addDamageDie: function(type, applyModifier = null, targetObj = null) {
            if(!targetObj) {
                targetObj = this.value;
            }

            if(applyModifier === null) {
                if(targetObj[type].damage.length > 0) {  //false for each damage set after the first
                    applyModifier = false;
                } else {
                    applyModifier = true;
                }
            }

            let damageDie = this.createDamageDie(applyModifier);
            targetObj[type].damage.push(damageDie);
        },      

        createDamageText: function(damageObj, ability = 0) {
            let descText = '';
            if(damageObj.diceAmount > 0) {
                descText += this.$parent.averageDamage(damageObj, ability);
                descText += ' ('+this.f5.misc.die_structure.locReplace(':die_amount', damageObj.diceAmount).locReplace(':die_type', damageObj.diceType);
            }

            let additionalDamage = Number(damageObj.additional);
            if(ability !== 0 && damageObj.abilityBonus) {
                additionalDamage += this.$parent.getAbilityMod(ability);
            }
            if(additionalDamage != 0) {
                descText += ' '+this.addPlus(additionalDamage, true);
            }

            if(damageObj.diceAmount > 0) {
                descText += ')';
            }

            if(damageObj.diceAmount == 0 && additionalDamage === 0) {
                descText += '0';
            }

            if(damageObj.hasOwnProperty('type')) {
                descText += ' '+this.f5.misc.damage.locReplace(':type', this.f5.damagetypes[damageObj.type].name.toLowerCase());
            }
            return descText;
        },

        removeDamageDie: function(type, i) {
            this.value[type].damage.splice(i, 1);
        },

        addRegenDie: function() {
            this.addDamageDie('regenerate', false);
        },

        unsetManualDPR: function() {
            this.value.manualDPR = -1;
        },

        addMultiattack: function(index) {
            this.value.multiattackReferences[index].push({
                id: null,
                uses: 1
            });
        },

        removeMultiattack: function(index, insideIndex) {
            this.value.multiattackReferences[index].splice(insideIndex, 1);
        },

        descriptionTextReplace: function(str) {

            //Attacks
            str = str.locReplace(':attack_range', this.f5.areaofeffect[this.value.targetType].name);
            str = str.locReplace(':attack_type', this.f5.attacktypes[this.value.attack.type].name);
            str = str.locReplace(':attack_bonus', this.addPlus(this.$parent.getAbilityMod(this.value.attack.ability) + this.$parent.proficiency));
            if(this.value.targetType == 'melee') {
                str = str.locReplace(':range', this.f5.misc.reach);
            } else if(this.value.targetType == 'melee_or_ranged') {
                str = str.locReplace(':range', this.f5.misc.reach_or_range);
            } else if(this.value.targetType == 'ranged'){
                str = str.locReplace(':range', this.f5.misc.range);
            } else {
                str = str.locReplace(':range', '');
            }
            str = str.locReplace(':reach_distance', this.value.attack.reach+' '+this.$parent.$parent.editor.measure.measureUnit);
            if(this.value.attack.range.low >= this.value.attack.range.high) {
                str = str.locReplace(':range_distance_low/:range_distance_high', this.value.attack.range.low+' '+this.$parent.$parent.editor.measure.measureUnit);
            } else {
                str = str.locReplace(':range_distance_low', this.value.attack.range.low);
                str = str.locReplace(':range_distance_high', this.value.attack.range.high+' '+this.$parent.$parent.editor.measure.measureUnit);
            }
            str = str.locReplace(':targets', this.pluralize(this.f5.misc.num_of_targets, this.value.attack.targets).locReplace(':target_count', this.value.attack.targets));

            //Saving Throw
            str = str.locReplace(':saving_throw_dc', this.$parent.makeSavingThrowDC(this.value.savingThrow.monsterAbility));
            let abilityList = [];
            for(let i in this.savingThrowSaveAbilities) {
                abilityList.push(this.f5.abilities[this.savingThrowSaveAbilities[i]].name);
            }
            str = str.locReplace(':saving_throw_ability', this.createSentenceList(abilityList, false));

            //Spells
            str = str.locReplace(':caster_level_article', this.determineIndefiniteArticle(this.$parent.casterLevel, true)); 
            str = str.locReplace(':caster_level', this.ordinalNumber(this.$parent.casterLevel)); 
            str = str.locReplace(':spellcasting_ability', this.f5.abilities[this.value.spellcasting.ability].name);
            str = str.locReplace(':spell_save_dc', this.$parent.makeSavingThrowDC(this.value.spellcasting.ability));
            str = str.locReplace(':spell_hit', this.addPlus(this.$parent.proficiency + this.$parent.getAbilityMod(this.value.spellcasting.ability)));

            //Damage
            let damageList = [];
            if(this.value.template == 'attack') {
                for(let i in this.value.attack.damage) {
                    damageList.push(this.createDamageText(this.value.attack.damage[i], this.value.attack.ability));
                }
                str = str.locReplace(':feature_damage', this.createSentenceList(damageList));
            } else if(this.value.template == 'saving_throw') {
                for(let i in this.value.savingThrow.damage) {
                    damageList.push(this.createDamageText(this.value.savingThrow.damage[i], this.value.savingThrow.monsterAbility));
                }
                str = str.locReplace(':feature_damage', this.createSentenceList(damageList));
            } else if(this.value.template == 'custom') {
                for(let i in this.value.custom.damage) {
                    damageList.push(this.createDamageText(this.value.custom.damage[i]));
                }
                str = str.locReplace(':feature_damage', this.createSentenceList(damageList));
            }

            //Regen
            if(this.value.regenerate.type !== 'none') {
                let regenObj = this.f5.regenerate[this.value.regenerate.type];
                let regenList = [];
                if(!regenObj['requires_damage'] || this.value.regenerate.type === 'custom') {
                    for(let i = 0; i < this.value.regenerate.damage.length; i++) {
                        regenList.push(this.createDamageText(this.value.regenerate.damage[i]));
                    }
                    str = str.locReplace(':feature_regen', this.createSentenceList(regenList));
                }
            }

            //Ability Mods
            str = str.locReplace(':ability_mod_str', this.$parent.getAbilityMod('str'));
            str = str.locReplace(':ability_mod_dex', this.$parent.getAbilityMod('dex'));
            str = str.locReplace(':ability_mod_con', this.$parent.getAbilityMod('con'));
            str = str.locReplace(':ability_mod_int', this.$parent.getAbilityMod('int'));
            str = str.locReplace(':ability_mod_wis', this.$parent.getAbilityMod('wis'));
            str = str.locReplace(':ability_mod_cha', this.$parent.getAbilityMod('cha'));

            //Saving Throws
            str = str.locReplace(':saving_throw_str', this.$parent.makeSavingThrowDC('str'));
            str = str.locReplace(':saving_throw_dex', this.$parent.makeSavingThrowDC('dex'));
            str = str.locReplace(':saving_throw_con', this.$parent.makeSavingThrowDC('con'));
            str = str.locReplace(':saving_throw_int', this.$parent.makeSavingThrowDC('int'));
            str = str.locReplace(':saving_throw_wis', this.$parent.makeSavingThrowDC('wis'));
            str = str.locReplace(':saving_throw_cha', this.$parent.makeSavingThrowDC('cha'));

            //Extras
            str = str.locReplace(':proficiency', this.$parent.proficiency);
            str = str.locReplace(':feature_name', this.value.name);


            //Key word replace
            str = this.$parent.keyWordReplace(str);
            return str;
        },

        compareIdToMultiattackFeatures: function(obj) {
            if(!(obj.actionType === 'spellcasting' || obj.actionType === 'action')) {
                return;
            }
            
            for(let maGroup of this.value.multiattackReferences) {
                for(let featureRef of maGroup) {
                    if(featureRef.index !== null) {
                        if(
                            featureRef.index === 'spellcasting' && 
                            this.$parent.value.features['spellcasting'][0].id === obj.id
                        ) {
                            //this.forceProjectionUpdate(); //Forces a projection update 
                            return;
                        } else if(this.$parent.value.features['action'][featureRef.index].id === obj.id) {
                            //this.forceProjectionUpdate(); //Forces a projection update 
                            return;
                        }
                    }
                }
            }
        },

        dprCalculator: function(useMax = false) {
            //TODO: Does "Max" consider crits?!?!? Should it??
            //TODO: Does "Max" consider recharging?

            let avgDPR = 0;
            let avgTargets = 1;
            if(this.value.manualDPR >= 0) {
                return this.value.manualDPR;
            } else if(this.value.template === 'spellcasting') { 
                // Spellcasting Average DPR
                if(this.f5.spelllevels[this.highestCastableSpell]) { 
                    //Target count should already be considered in average damage of spells
                    return this.$parent.averageDamage(this.f5.spelllevels[this.highestCastableSpell].damage_single_target, 0, useMax);
                }

            } else if(this.value.template === 'attack') { 
                // Attack Average DPR
                for(let i in this.value.attack.damage) {
                    avgDPR += this.$parent.averageDamage(this.value.attack.damage[i], this.value.attack.ability, useMax);
                }
                
                if(this.value.ongoingDamage.active) {
                    for(let i in this.value.ongoingDamage.damage) {
                        avgDPR += this.$parent.averageDamage(this.value.ongoingDamage.damage[i], 0, useMax);
                    }
                }
                
                if(this.value.attack.savingThrow) {
                    for(let i in this.value.savingThrow.damage) {
                        avgDPR += this.$parent.averageDamage(this.value.savingThrow.damage[i], 0, useMax);
                    }
                }

                avgTargets = this.value.attack.targets;

                //Include average AC and chance to hit?? Average ~16


            } else if(this.value.template === 'saving_throw') { 
                // Saving Throw Average DPR

                for(let i in this.value.savingThrow.damage) {
                    avgDPR += this.$parent.averageDamage(this.value.savingThrow.damage[i], 0, useMax);
                }

                let distanceBaseline = 30;
                avgTargets = this.f5.areaofeffect[this.value.targetType].targets_at_30;
                if(avgTargets > 1) {
                    avgTargets = (avgTargets/(distanceBaseline*2)) * (distanceBaseline + this.value.aoeRange); //basic formula to assume average number of targets hit
                }

            } else if(this.value.template === 'multiattack') { 
                // Multiattack DPR
                let multiDPR = 0;
                for(let maGroup of this.value.multiattackReferences) {
                    let groupDPR = 0;
                    for(let featureRef of maGroup) {
                        if(featureRef.index !== null) {
                            let abilityDPR = 0;
                            if(featureRef.index === 'spellcasting') {
                                //TODO adjust to use projections instead of DPR
                                if(useMax) {
                                    abilityDPR = this.$parent.value.features['spellcasting'][0].maxDPR * featureRef.uses;
                                } else { 
                                    abilityDPR = this.$parent.value.features['spellcasting'][0].averageDPR * featureRef.uses;
                                }
                            } else {
                                if(useMax) {
                                    abilityDPR = this.$parent.value.features['action'][featureRef.index].maxDPR * featureRef.uses;
                                } else { 
                                    abilityDPR = this.$parent.value.features['action'][featureRef.index].averageDPR * featureRef.uses;
                                }
                            }
                            groupDPR += (!isNaN(abilityDPR) && abilityDPR > 0) ? abilityDPR : 0;
                        }
                    }
                    if(groupDPR > multiDPR) {
                        multiDPR = groupDPR;
                    }
                }
                avgDPR = multiDPR;
            } else if(this.value.template === 'custom') { 
                // Custom Ability Average DPR
                for(let i in this.value.custom.damage) {
                    avgDPR += this.$parent.averageDamage(this.value.custom.damage[i], 0, useMax);
                }
            }

            //Limit targets to number of players
            if(avgTargets > this.playerData.number) {
                avgTargets = this.playerData.number;
            }

            let dpr = avgDPR * avgTargets;

            return dpr;
        },

        mergeMultiattackProjections: function(maProj, newProj, uses) {
            if(!newProj) {
                return maProj;
            }

            for(var i = 0; i < this.combatRounds; i++) {
                if(!newProj[i]) {
                    continue;
                }
                if(maProj[i].name !== this.f5.misc.title_multiattack+': ') {
                    maProj[i].name += ', ';
                }
                maProj[i].name += newProj[i].name;
                if(uses > 1) {
                    maProj[i].name += ' '+this.f5.misc.times.locReplace(':number_of_times',uses);
                }
                maProj[i].damage += newProj[i].damage * uses;
                maProj[i].maxDamage += newProj[i].maxDamage * uses;
            }

            return maProj;
        },
        
        getReferencedFeature: function() {
            let actionsToCheck = ['action', 'bonus_action', 'spellcasting'];
            let feature = null;
            if(this.value.existingFeatureReferenceId !== null) {
                actionOptionLoop: for(let action of actionsToCheck) {
                    featureLoop: for(let i in this.$parent.value.features[action]) {
                        if(this.value.existingFeatureReferenceId == this.$parent.value.features[action][i].trackingId) {
                            feature = this.$parent.value.features[action][i];
                            break actionOptionLoop;
                        }
                    }
                }
            }
            return feature;
        },

        addTextToInput: function(id, text) {
            let targetEl = this.$el.querySelector("#"+id);
            let currentTextValue = targetEl.value;
            targetEl.value = currentTextValue.substring(0, targetEl.selectionStart)+text+currentTextValue.substring(targetEl.selectionStart);
            targetEl.focus();
        },

        createDefaultSpellcastingObject: function() {
            return {
                ability: 'int',
                innate: false,
                class: '',
                spellLevels: this.createDefaultSpellSlots(),
                atWillSpells: {highestLevel: 0, spellList: ''},
                useBeforeCombatSpell: false,
            };
        },

        exportFeature: function() {
            let exportData = this.clone(this.value);
            //console.log('----------exportFeature----------');

            exportData = this.intersectObjectsRecursive(exportData, this.defaultFeatureValues());            
            exportData.trackingId = (this.hasOwnProperty('trackingId')) ? this.trackingId : (this.initialData.hasOwnProperty('trackingId')) ? this.initialData.trackingId : this.randChars(15);

            if(exportData.hasOwnProperty('multiattackReferences')) {
                for(let maRefArray of exportData.multiattackReferences) {
                    for(let maRef of maRefArray) {
                        delete maRef.feature;
                    }
                }
            }

            //console.log(exportData);
            return exportData;
        },

        defaultFeatureValues: function() {
            return {
                actionType: 'custom',
                name: this.f5.misc.title_feature_name,
                template: 'custom', 
                passiveTrigger: 'start_of_turn',
                targetType: 'melee',
                targetAreaWidth: 30,
                aoeRange: 30,
                aoeFriendlyFire: 'all', //'friendly', 'all', 'hostile' //TODO

                attack: {
                    ability: 'str',
                    type: 'weapon',
                    range: {'low': 20, 'high': 60},
                    reach: 5,
                    damage: [this.createDamageDie(true)],
                    savingThrow: false,
                    targets: 1,
                },

                savingThrow: {
                    monsterAbility: 'str',
                    saveAbilities: ['str'],
                    damage: [this.createDamageDie()],
                    halfOnSuccess: true,
                    conditions: [],
                    conditionDuration: 'specified_timeframe',
                    conditionRepeatSave: true,
                    conditionImmuneAfterSave: false,
                    conditionDurationUnit: 'minute',
                    conditionDurationAmount: 1,
                },

                ongoingDamage: {
                    active: false,
                    damage: [this.createDamageDie()],
                    occurs: 'start_of_turn',
                    onFailedSave: true,
                    repeatSave: false,
                    duration: 'ongoing',
                },

                recharge: {
                    type: 'none',
                    diceType: 6,
                    minRoll: 5,
                    uses: 1,
                },
                regenerate: {
                    type: 'none',
                    damage: [this.createDamageDie(false, false)],
                    customText: this.f5.regenerate['custom']['desc'],
                },
                
                spellcasting: this.createDefaultSpellcastingObject(),

                custom: {
                    damage: [],
                    description: '',
                    ability: 'str',
                },

                additionalDescription: '',
                multiattackReferences: [
                    [],
                    []
                ],
                existingFeatureReferenceId: null,
                legendaryActionCost: 1,
                legendaryResistances: 3,
                manualDPR: -1,
                manualMaxDPR: -1,
            };
        },

        featureDataSetup: function() {

            let defaultValue = {
                trackingId: (this.initialData.trackingId) ? this.initialData.trackingId : this.randChars(15),
                value: this.defaultFeatureValues(),
                referencedProjection: [], //TODO: do we need this??
            }

            defaultValue.value.actionType = this.initialType;
            defaultValue.value.name = (this.initialType == 'spellcasting' || this.initialType == 'multiattack' ) ? this.f5.misc['title_'+this.initialType] : this.f5.misc.title_feature_name;
            defaultValue.value.template = (this.initialType == 'spellcasting' || this.initialType == 'multiattack' ) ? this.initialType : 'custom';
    
            for(let prop in this.initialData.value) {
    
                if(typeof this.initialData.value[prop] === 'object') {
                    for(let innerProp in this.initialData.value[prop]) {
                        if(innerProp === 'damage') {
                            for(let i in this.initialData.value[prop]['damage']) { //array of damage dice
                                if(!defaultValue.value[prop]['damage'].hasOwnProperty(i)) {
                                    this.addDamageDie(prop, null, defaultValue.value);
                                }
                                for(let damageProp in this.initialData.value[prop]['damage'][i]) {
                                    defaultValue.value[prop]['damage'][i][damageProp] = this.initialData.value[prop]['damage'][i][damageProp];
                                }
                            }
                        } else if(innerProp === 'spellLevels') {
                            for(let i in this.initialData.value[prop]['spellLevels']) {
                                if(this.initialData.value[prop]['spellLevels'][i].hasOwnProperty('slots')) {
                                    defaultValue.value[prop]['spellLevels'][i].slots = this.initialData.value[prop]['spellLevels'][i].slots;
                                }
                                if(this.initialData.value[prop]['spellLevels'][i].hasOwnProperty('spellList')) {
                                    defaultValue.value[prop]['spellLevels'][i].spellList = this.initialData.value[prop]['spellLevels'][i].spellList;
                                }
                            }

                        } else if(defaultValue.value.hasOwnProperty(prop)) {
                            defaultValue.value[prop][innerProp] = this.initialData.value[prop][innerProp];
                        }
                    }
                } else {
                    defaultValue.value[prop] = this.initialData.value[prop]; 
                }
            }    

            return defaultValue;
        },
    },       
};