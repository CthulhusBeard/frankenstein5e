import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';

const template = require('../html/statblock-feature.html');

export default {
    props: [
        'initialType',
        'initialData',
        'playerData',
        'combatRounds',
        'f5',
    ],

    template: template,  

    components: {
        'Multiselect': Multiselect,
    },

    data: function() {
        return {
            trackingId: this.initialData.trackingId,
            value: {
                actionType: this.initialType,
                name:  (this.initialType == 'spellcasting' || this.initialType == 'multiattack' ) ? this.f5.misc['title_'+this.initialType] : this.f5.misc.title_feature_name,
                template: (this.initialType == 'spellcasting' || this.initialType == 'multiattack' ) ? this.initialType : 'custom', 
                passiveTrigger: 'start_of_turn',
                attackAbility: 'str',
                targetType: 'melee',
                targetLineWidth: 5,
                attackType: 'weapon',
                attackRange: {'low': 20, 'high': 60},
                attackReach: 5,
                attackDamage: [this.createDamageDie(true)],
                attackSavingThrow: false,
                attackTargets: 1,
                aoeRange: 30,
                savingThrowMonsterAbility: 'str',
                savingThrowSaveAbilities: ['str'],
                savingThrowDamage: [this.createDamageDie()],
                savingThrowHalfOnSuccess: true,
                savingThrowConditions: [],
                hasOngoingDamage: false,
                ongoingDamage: [this.createDamageDie()],
                ongoingDamageOccurs: 'start_of_turn',
                ongoingDamageOnFailedSave: true,
                ongoingDamageRepeatSave: false,
                ongoingDamageDuration: 'ongoing',
                recharge: {
                    type: 'none',
                    diceType: 6,
                    minRoll: 5,
                    uses: 1,
                },
                regenerate: {
                    type: 'none',
                    amount: [this.createDamageDie(false, false)],
                    customText: this.f5.regenerate['custom']['desc'],
                },
                
                spellcasting: {
                    ability: 'int',
                    innate: false,
                    class: '',
                    spellLevels: this.createDefaultSpellSlots(),
                    atWillSpells: {highestLevel: 0, spellList: ''},
                    useBeforeCombatSpell: false,
                },
                customDamage: [],
                customDescription: '',
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
            },
            referencedProjection: [], //TODO: do we need this??
        }
    },

    created() {
        let skipProps = ['number'];
        for(let prop in this.initialData) {
            if(skipProps.includes(prop)) {
                continue;
            }
            this.value[prop] = this.initialData[prop]; 
        }

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
            if(this.value.template == 'legendary_resistance') {
                return this.f5.featuretemplates.legendary_resistance.title.replace(':legendary_resistance_count', this.value.legendaryResistances);
            }

            let nameText = this.value.name;
            //anything that triggers brackets //Different forms?
            let brackets = this.bracketText; //separated by "sentence_list_separator_secondary"
            
            if(brackets) {
                nameText += ' ('+brackets+')';
            }

            nameText = nameText.trim();

            if(nameText.length > 0) {
                nameText += this.f5.misc.sentence_end;
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
                brackets += this.f5.misc.action_cost.replace(':cost', this.value.legendaryActionCost);
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
                    brackets += this.f5.recharge[this.value.recharge.type].desc.replace(':uses', this.value.recharge.uses);
                }
            }
            return brackets; 
        },

        hasRunOnSentence: function() {
            if(
                (
                    this.value.template == 'attack' && 
                    this.value.attackSavingThrow &&
                    (this.value.savingThrowConditions.length > 1 || this.value.attackDamage.length > 1)
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
                descText += this.value.customDescription;

            //Multiattack Description
            } else if(this.value.template == 'multiattack') {
                descText += this.multiattackDescription;

            //Spellcasting Description
            } else if(this.value.template == 'spellcasting') {
                descText += this.spellcastingDescription;
                
            //Attack Description
            } else if(this.value.template == 'attack') {
                descText += this.attackDescription;
                if(this.value.attackSavingThrow) {
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
                        feature = this.$parent.findFeatureById(featureRef.id);
                        if(!feature) {
                            continue;
                        }

                        if(feature.actionType === 'spellcasting') {
                            featDesc = this.$parent.pluralize(this.f5.misc.desc_multiattack_spell, featureRef.uses);
                        } else {
                            if(feature.template === 'attack') {
                                let attackString = this.$parent.pluralize(this.f5.misc.attack, featureRef.uses);
                                let attackSingular = this.$parent.pluralize(this.f5.misc.attack);
                                let attackPlural = this.$parent.pluralize(this.f5.misc.attack, 2);
                                featDesc = this.f5.misc.desc_multiattack_attack;
                                featDesc = featDesc.replace(':ability_name', feature.name);
                                
                                if(feature.name.toLowerCase().substr(-attackSingular.length) == attackSingular) {
                                    //Existing name matches singular "attack"
                                    featDesc = featDesc.replace(attackSingular.substr(1)+' :attack_text', attackString.substr(1));
                                } else if(feature.name.toLowerCase().substr(-attackPlural.length) == attackPlural) {
                                    //Existing name matches plural "attacks"
                                    featDesc = featDesc.replace(attackPlural.substr(1)+' :attack_text', attackString.substr(1));
                                } else {
                                    featDesc = featDesc.replace(':attack_text', attackString);
                                }
                            }
                        }

                        if(prevTemplate !== feature.template) {
                            featDesc = featDesc.replace(':can_use', this.f5.misc.desc_can_use);
                        } else {
                            featDesc = featDesc.replace(':can_use ', '');
                        }
                        featDesc = featDesc.replace(':use_count_semantics', this.$parent.numberOfTimesSemantics(featureRef.uses));
                        featDesc = featDesc.replace(':use_count', this.$parent.numberToWord(featureRef.uses));
                        featDesc = featDesc.replace(':ability_name', feature.name);

                        prevTemplate = feature.template;

                        maAbilityDescs[i].push(featDesc);
                    } 
                }
            }

            if(maAbilityDescs[0].length > 0) {
                maDesc = maDesc.replace(':multiattack_descriptions', this.$parent.$parent.createSentenceList(maAbilityDescs[0]));
                
                if(maAbilityDescs[1].length > 0) {
                    maAltDesc = maAltDesc.replace(':multiattack_descriptions', this.$parent.$parent.createSentenceList(maAbilityDescs[1]));
                    maDesc += ' '+maAltDesc;
                }
            } else {
                if(maAbilityDescs[1].length > 0) {
                    maDesc = maDesc.replace(':multiattack_descriptions', this.$parent.$parent.createSentenceList(maAbilityDescs[1]));
                } else {
                    maDesc = ' ';
                }
            }
            
            return maDesc;
        },

        referencedFeatureDescription: function() {
            let featureDesc = '';
            let feature = this.getReferencedFeature();

            if(feature !== null) {
                featureDesc = this.descriptionTextReplace(this.f5.misc.creature_uses_feature).replace(':feature_name', feature.name);
            }
            return featureDesc;
        },

        spellcastingDescription: function() {
            let spellDesc = this.f5.misc.desc_spellcasting;
            if(this.value.spellcasting.innate) { 
                spellDesc = this.f5.misc.desc_innate_spellcasting;
            } else if(this.value.spellcasting.class) {
                spellDesc = this.f5.misc.desc_prepared_spellcasting;
            }

            if(this.value.spellcasting.atWillSpells.spellList.length > 0) {
                spellDesc = spellDesc.replace(':at_will_spells', this.f5.misc.desc_at_will_spells);
                spellDesc = spellDesc.replace(':at_will_spell_list', '<i>'+this.value.spellcasting.atWillSpells.spellList.toLowerCase()+'</i>');
            } else {
                spellDesc = spellDesc.replace(':at_will_spells', '');
            }

            if(this.value.spellcasting.class) {
                spellDesc = spellDesc.replace(':spellcasting_class', ' '+this.value.spellcasting.class);
            } else {
                spellDesc = spellDesc.replace(':spellcasting_class', '');
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
                        spellDesc += this.f5.misc.spell_uses.replace(':slot_uses',level)+': ';
                    } else {
                        spellDesc += this.f5.spelllevels[level].name+' ('+this.$parent.pluralize(this.f5.misc.spell_slots, sortedSpellList[level].slots).replace(':slot_quantity',sortedSpellList[level].slots)+'): ';
                    }
                }
                
                spellDesc += '<i>'+spellSlotList.spellList+'</i><br/><br/>';
            }

            if(this.value.spellcasting.useBeforeCombatSpell) {
                spellDesc += this.f5.misc.casts_spells_before;
            }
            
            if(this.value.additionalDescription) {
                spellDesc += '<br/><br/>';
            }
            
            return spellDesc;
        },

        attackDescription: function() {
            let attackDesc = this.f5.misc.desc_attack;

            //Hit
            attackDesc += ' <i>'+this.f5.misc.desc_attack_hit+'</i> ';
            let damageList = [];
            for(let i in this.value.attackDamage) {
                damageList.push(this.$parent.createDamageText(this.value.attackDamage[i], this.value.attackAbility));
            }
            attackDesc += this.$parent.$parent.createSentenceList(damageList);

            if(!this.value.attackSavingThrow) {
                attackDesc += this.f5.misc.sentence_end;
            }

            return attackDesc;
        },

        savingThrowDescription: function() {
            let savingThrowText = '';
            if(this.value.savingThrowDamage.length >= 1 && this.value.savingThrowConditions.length >= 2) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_damage_condition;
            } else if(this.value.savingThrowDamage.length >= 1 && this.value.savingThrowConditions.length >= 1) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_damage_condition;
            } else if(this.value.savingThrowDamage.length >= 1) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_damage;
            } else if(this.value.savingThrowConditions.length >= 1) {
                savingThrowText = this.f5.misc.desc_attack_saving_throw_condition;
            }

            //Targets
            let stTargetCount = 2; //or more. 
            //TODO change to 1 for single saving throw target
            if(this.value.template == 'attack') {
                //TODO: override if saving throw area is different than attack targets
                stTargetCount = this.value.attackTargets;
            }

            if(this.value.template == 'attack') {
                savingThrowText = savingThrowText.replace(':target_text', this.$parent.pluralize(this.f5.misc.the_target, this.value.attackTargets));
            } else {

                let targetText = '';
                if(this.value.targetType == 'line') {
                    targetText = this.f5.misc.line_target.replace(':line_width', this.value.targetLineWidth+' '+this.$parent.$parent.editor.measure.measureUnit);
                } else if(this.value.targetType == 'cone') {
                    targetText = this.f5.misc.cone_target;
                } else if(this.value.targetType == 'cube') {
                    targetText = this.f5.misc.cube_target;
                } else if(this.value.targetType == 'sphere') {
                    targetText = this.f5.misc.sphere_target;
                } else if(this.value.targetType == 'range') {
                    targetText = this.$parent.pluralize(this.f5.misc.range_target, stTargetCount);
                    targetText = targetText.replace(':target_count', stTargetCount);
                } else if(this.value.targetType == 'touch') {
                    targetText = this.$parent.pluralize(this.f5.misc.touch_target, stTargetCount);
                    targetText = targetText.replace(':target_count', stTargetCount);
                }
                targetText = targetText.replace(':target_area', this.value.aoeRange+' '+this.$parent.$parent.editor.measure.measureUnit);
                savingThrowText = savingThrowText.replace(':target_text', targetText);

            }
            
            //Adjust for run-on sentences
            if(this.value.template == 'attack' && this.value.attackSavingThrow && this.value.attackDamage.length > 0) {
                if(this.hasRunOnSentence) {
                    savingThrowText = this.f5.misc.sentence_end+' '+this.f5.misc.additionally.replace(':addition', savingThrowText);
                } else {
                    savingThrowText = this.f5.misc.sentence_list_separator+' '+this.f5.misc.and+' '+savingThrowText;
                }
            } else {
                savingThrowText = this.$parent.capitalize(savingThrowText);
            }
            
            //Half as much
            if(this.value.savingThrowHalfOnSuccess) {
                savingThrowText = savingThrowText.replace(':half_as_much', this.f5.misc.desc_saving_throw_half_on_success);
            } else {
                savingThrowText = savingThrowText.replace(':half_as_much', '');
                savingThrowText = savingThrowText.replace(':not_condition', '');
            }

            //Add Saving Throw Damage
            if(this.value.savingThrowDamage.length) {
                let stDamageList = [];
                for(let i in this.value.savingThrowDamage) {
                    stDamageList.push(this.$parent.createDamageText(this.value.savingThrowDamage[i], this.value.savingThrowMonsterAbility));
                }
                savingThrowText = savingThrowText.replace(':damage', this.$parent.$parent.createSentenceList(stDamageList));
            }

            //Add Saving Throw Conditions
            if(this.value.savingThrowConditions.length) {
                let stConditionList = [];
                let stNotConditionList = [];
                for(let i in this.value.savingThrowConditions) {
                    stConditionList.push(
                        this.$parent.pluralize(this.f5.conditions[this.value.savingThrowConditions[i]].is, stTargetCount).replace(':condition', this.f5.conditions[this.value.savingThrowConditions[i]].name.toLowerCase()
                    ));
                    stNotConditionList.push(
                        this.$parent.pluralize(this.f5.conditions[this.value.savingThrowConditions[i]].not, stTargetCount).replace(':condition', this.f5.conditions[this.value.savingThrowConditions[i]].name.toLowerCase()
                    ));
                    //TODO replace distance for pushed
                }
                savingThrowText = savingThrowText.replace(':condition', this.$parent.createConditionSentenceList(stConditionList));
                savingThrowText = savingThrowText.replace(':not_condition', this.f5.misc.and + ' ' + this.$parent.createConditionSentenceList(stNotConditionList));
            }

            return savingThrowText;
        },

        regenerateDescription: function() {
            let regenObj = this.f5.regenerate[this.value.regenerate.type];
            let desc = regenObj.desc;
            let regenList = [];

            if(this.value.regenerate.type === 'custom') {
                desc = this.value.regenerate.customText;
            }

            if(!regenObj['requires_damage'] || this.value.regenerate.type === 'custom') {
                for(let i = 0; i < this.value.regenerate.amount.length; i++) {
                    regenList.push(this.$parent.createDamageText(this.value.regenerate.amount[i]));
                }
                desc = desc.replace(':regenerate_hit_point_amount', this.$parent.$parent.createSentenceList(regenList));
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
            if(this.value.savingThrowSaveAbilities.length === 0) {
                this.value.savingThrowSaveAbilities = ['str'];
            }
            return this.value.savingThrowSaveAbilities;
        },
    },

    methods: {

        createDefaultSpellSlots: function() {
            let spellSlots = {};
            for(let i = 0; i < 10; i++) {
                spellSlots[i] = {slots: 0, spellList: ''};
            } 
            return spellSlots;
        },

        createDamageDie: function(setAbilityBonus = false, requireDamageType = true) {
            let damageDie = {
                diceType: 4,
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

                
                // let maGroup = this.value.multiattackReferences[maGroupIndex];
                // //Loop through each feature
                // for(let featureRef of maGroup) {
                //     if(featureRef.index !== null) {
                //         if(featureRef.index === 'spellcasting') {
                //             //Merge in Spellcasting
                //             mergedProjections[maGroupIndex] = this.mergeMultiattackProjections(mergedProjections[maGroupIndex], this.$parent.value.features['spellcasting'][0].damageProjection, featureRef.uses);
                //         } else {
                //             //Merge in features
                //             mergedProjections[maGroupIndex] = this.mergeMultiattackProjections(mergedProjections[maGroupIndex], this.$parent.value.features['action'][featureRef.index].damageProjection, featureRef.uses);
                //         }
                //     }
                // }
            }
            return mergedProjections;

            // let finalMerge = [];
            // for(var i = 0; i < this.combatRounds; i++) {
            //     if(!mergedProjections[1][i] || mergedProjections[0][i].damage >= mergedProjections[1][i].damage) {
            //         finalMerge[i] = mergedProjections[0][i];
            //     } else if(!mergedProjections[0][i] || mergedProjections[1][i].damage > mergedProjections[0][i].damage) {
            //         finalMerge[i] = mergedProjections[1][i];
            //     } else {
            //         finalMerge[i] = null;
            //     }
            // }

            // return finalMerge;
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
                    for(let i in this.value.regenerate.amount) {
                        let regen = this.$parent.averageDamage(this.value.regenerate.amount[i]);
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

        addDamageDie: function(type) {
            let damageDie = this.createDamageDie(this.value[type].length > 0 ? false : true); //false for each damage set after the first
            this.value[type].push(damageDie);
        },

        removeDamageDie: function(type, i) {
            this.value[type].splice(i, 1);
        },

        addRegenDie: function() {
            let regenDie = this.createDamageDie(false, false); //false for each damage set after the first
            this.value.regenerate.amount.push(regenDie);
        },

        removeRegenDie: function(i) {
            this.value.regenerate.amount.splice(i, 1);
        },

        addSpell: function(spellLevel = 0) {
            this.value.spellList.push(
                {
                    'name': this.f5.misc.title_add_spell_name,
                    'level': spellLevel,
                    'cast_before': false,
                    'at_will': false,
                    'uses': 1,
                }
            );
        },

        removeSpell: function(spellIndex) {
            this.value.spellList.splice(spellIndex, 1);
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
            str = str.replace(':attack_range', this.f5.areaofeffect[this.value.targetType].name);
            str = str.replace(':attack_type', this.f5.attacktypes[this.value.attackType].name);
            str = str.replace(':attack_bonus', this.$parent.addPlus(this.$parent.getAbilityMod(this.value.attackAbility) + this.$parent.proficiency));
            if(this.value.targetType == 'melee') {
                str = str.replace(':range', this.f5.misc.reach);
            } else if(this.value.targetType == 'melee_or_ranged') {
                str = str.replace(':range', this.f5.misc.reach_or_range);
            } else if(this.value.targetType == 'ranged'){
                str = str.replace(':range', this.f5.misc.range);
            } else {
                str = str.replace(':range', '');
            }
            str = str.replace(':reach_distance', this.value.attackReach+' '+this.$parent.$parent.editor.measure.measureUnit);
            if(this.value.attackRange.low >= this.value.attackRange.high) {
                str = str.replace(':range_distance_low/:range_distance_high', this.value.attackRange.low+' '+this.$parent.$parent.editor.measure.measureUnit);
            } else {
                str = str.replace(':range_distance_low', this.value.attackRange.low);
                str = str.replace(':range_distance_high', this.value.attackRange.high+' '+this.$parent.$parent.editor.measure.measureUnit);
            }
            str = str.replace(':targets', this.$parent.pluralize(this.f5.misc.num_of_targets, this.value.attackTargets).replace(':target_count', this.value.attackTargets));

            //Saving Throw
            str = str.replace(':saving_throw_dc', this.$parent.makeSavingThrowDC(this.value.savingThrowMonsterAbility));
            let abilityList = [];
            for(let i in this.savingThrowSaveAbilities) {
                abilityList.push(this.f5.abilities[this.savingThrowSaveAbilities[i]].name);
            }
            str = str.replace(':saving_throw_ability', this.$parent.$parent.createSentenceList(abilityList, false));

            //Spells
            str = str.replace(':caster_level_article', this.$parent.determineIndefiniteArticle(this.$parent.casterLevel, true)); 
            str = str.replace(':caster_level', this.$parent.ordinalNumber(this.$parent.casterLevel)); 
            str = str.replace(':spellcasting_ability', this.f5.abilities[this.value.spellcasting.ability].name);
            str = str.replace(':spell_save_dc', this.$parent.makeSavingThrowDC(this.value.spellcasting.ability));
            str = str.replace(':spell_hit', this.$parent.addPlus(this.$parent.proficiency + this.$parent.getAbilityMod(this.value.spellcasting.ability)));

            //Damage
            let damageList = [];
            if(this.value.template == 'attack') {
                for(let i in this.value.attackDamage) {
                    damageList.push(this.$parent.createDamageText(this.value.attackDamage[i], this.value.attackAbility));
                }
                str = str.replace(':feature_damage', this.$parent.$parent.createSentenceList(damageList));
            } else if(this.value.template == 'saving_throw') {
                for(let i in this.value.savingThrowDamage) {
                    damageList.push(this.$parent.createDamageText(this.value.savingThrowDamage[i], this.value.savingThrowMonsterAbility));
                }
                str = str.replace(':feature_damage', this.$parent.$parent.createSentenceList(damageList));
            } else if(this.value.template == 'custom') {
                for(let i in this.value.customDamage) {
                    damageList.push(this.$parent.createDamageText(this.value.customDamage[i]));
                }
                str = str.replace(':feature_damage', this.$parent.$parent.createSentenceList(damageList));
            }

            //Regen
            if(this.value.regenerate.type !== 'none') {
                let regenObj = this.f5.regenerate[this.value.regenerate.type];
                let regenList = [];
                if(!regenObj['requires_damage'] || this.value.regenerate.type === 'custom') {
                    for(let i = 0; i < this.value.regenerate.amount.length; i++) {
                        regenList.push(this.$parent.createDamageText(this.value.regenerate.amount[i]));
                    }
                    str = str.replace(':feature_regen', this.$parent.$parent.createSentenceList(regenList));
                }
            }

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
                for(let i in this.value.attackDamage) {
                    avgDPR += this.$parent.averageDamage(this.value.attackDamage[i], this.value.attackAbility, useMax);
                }
                
                if(this.value.hasOngoingDamage) {
                    for(let i in this.value.ongoingDamage) {
                        avgDPR += this.$parent.averageDamage(this.value.ongoingDamage[i], 0, useMax);
                    }
                }
                
                if(this.value.attackSavingThrow) {
                    for(let i in this.value.savingThrowDamage) {
                        avgDPR += this.$parent.averageDamage(this.value.savingThrowDamage[i], 0, useMax);
                    }
                }

                avgTargets = this.value.attackTargets;

                //Include average AC and chance to hit?? Average ~16


            } else if(this.value.template === 'saving_throw') { 
                // Saving Throw Average DPR

                for(let i in this.value.savingThrowDamage) {
                    avgDPR += this.$parent.averageDamage(this.value.savingThrowDamage[i], 0, useMax);
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
                for(let i in this.value.customDamage) {
                    avgDPR += this.$parent.averageDamage(this.value.customDamage[i], 0, useMax);
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
                    maProj[i].name += ' '+this.f5.misc.times.replace(':number_of_times',uses);
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
                for(let action of actionsToCheck) {
                    for(let i in this.$parent.value.features[action]) {
                        if(this.value.existingFeatureReferenceId == this.$parent.value.features[action][i].trackingId) {
                            feature = this.$parent.value.features[action][i];
                        }
                    }
                }
            }
            return feature;
        },

        exportFeature: function() {
            let exportData = JSON.parse(JSON.stringify(this.value));
            exportData.trackingId = this.trackingId;
            delete exportData.number;

            console.log();

            //Remove projection from Multiattack
            for(let maRefGroup of exportData.multiattackReferences) {
                for(let maRef of maRefGroup) {
                    delete maRef.feature;
                }
            }

            console.log('Export feature');
            console.log(exportData);
            return exportData;
        },
    },       
};