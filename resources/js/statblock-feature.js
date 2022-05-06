import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';

export {StatBlockFeature as default}

let StatBlockFeature = {
    props: [
        'value',
        'combat_rounds',
        'f5',
    ],
    template: '#template-statblockfeature',  
    components: {
        'multiselect': Multiselect,
    },

    data: function() {
        return {
            damageUpdateIncrementer: 0
        }
    },

    created() {
        this.updateDamageProperties();
    },

    mounted() {
        console.log('--Mount Feature: '+this.value.name+' --');
        if(this.value.actionType === 'multiattack') {
            this.forceProjectionUpdate();
            //this.$parent.$on('feature-projection-change', this.compareIdToMultiattackFeatures);
        }
        //this.forceProjectionUpdate(); //Forces an update on an import //Unneccessary??
    },

    watch: {
        value: {
            handler(val) {

                //Must have one or more saving throw
                if(this.value.savingThrowSaveAbilities.length === 0) {
                    this.value.savingThrowSaveAbilities = ['str'];
                }

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

                this.updateDamageProperties(); //I don't think this needs to be here

            }, 
            deep: true
        }
    },

    computed: {
        featureReferences: function() {
            let featureReferences = [];
            if(this.value.template === 'multiattack') {
                for(let maGroup of this.value.multiattackReferences) {
                    for(let featureRef of maGroup) {
                        if(featureRef.index !== null) {
                            let id = '';
                            if(featureRef.index === 'spellcasting') {
                                id = this.$parent.value.features['spellcasting'][0].id;
                            } else {
                                id = this.$parent.value.features['action'][featureRef.index].id;
                            }
                            if(id && !featureReferences.includes(id)) {
                                featureReferences.push(id);
                            }
                        }
                    }
                }
            }
            return featureReferences;
        },

        averageDPR: function() {
            let updateIncrementer = this.damageUpdateIncrementer;
            return this.dprCalculator();
        },

        maxDPR: function() {
            let updateIncrementer = this.damageUpdateIncrementer;
            return this.dprCalculator(true);
        },

        displayName: function() {
            let nameText = this.value.name;
            //anything that triggers brackets //Different forms?
            let brackets = this.bracketText; //separated by "sentence_list_separator_secondary"
            
            if(brackets) {
                nameText += ' ('+brackets+')';
            }
            return (nameText + this.f5.misc.sentence_end).trim();
        },

        bracketText: function() {
            let brackets = '';
            
            //Legendary action cost
            if(
                this.$parent.value.hasLegendaryActions &&
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
            if(this.value.recharge.type !== 'none') {
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

        atWillSpells: function() {
            let spellsSorted = [];

            for(const spell of this.value.spellList) {
                if(spell.at_will) {
                    spellsSorted.push(spell);
                } 
            }

            return spellsSorted;
        },

        highestCastableSpell:function() {
            let highestSlot = -1;
            
            for(const spell of this.value.spellList) {
                if(
                    spell.level > highestSlot && //this spell is higher than a previously found spell
                    (
                        spell.at_will || //if it can be cast at will or 
                        spell.level === 0 || //is a cantrip or 
                        (!this.value.innateSpellcasting && this.value.spellSlots[spell.level] > 0) || //with spell slots
                        (this.value.innateSpellcasting && spell.uses > 0) // or with spell uses
                    )
                ) {
                    highestSlot = spell.level;
                }
            }

            return highestSlot;
        },

        spellsSlotsSorted: function() {
            let spellsSorted = [];
            for(const spell of this.value.spellList) {
                if(!spell.at_will && this.value.spellSlots[spell.level] >= 0) {
                    if(!spellsSorted[spell.level]) {
                        spellsSorted[spell.level] = [];
                    }
                    spellsSorted[spell.level].push(spell);
                } 
            }
            return spellsSorted;
        },

        spellsUsesSorted: function() {
            let spellsSorted = [];
            for(const spell of this.value.spellList) {
                if(!spell.at_will && (spell.uses > 0 || spell.level === 0)) {
                    let newIndex = spell.uses;
                    if(spell.level === 0) {
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

            if(this.value.template == 'custom') {
                //Custom Description
                descText = this.value.customDescription;
            } else if(this.value.template == 'multiattack') {
                //Multiattack Description
                descText = this.multiattackDescription;
            } else if(this.value.template == 'spellcasting') {
                //Spellcasting Description
                descText = this.spellcastingDescription;
            } else if(this.value.template == 'attack') {
                //Attack Description
                descText = this.attackDescription;
                if(this.value.attackSavingThrow) {
                    //Add Saving Throw
                    descText += this.savingThrowDescription;
                }
            } else if(this.value.template == 'saving_throw') {
                //Saving Throw Description
                descText = this.savingThrowDescription;
            }

            descText+this.f5.misc.sentence_end;
            
            return this.descriptionTextReplace(descText);
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
                    if(featureRef.index !== null) {
                        if(featureRef.index === 'spellcasting') {
                            feature = this.$parent.value.features['spellcasting'][0];
                            featDesc = this.$parent.pluralize(this.f5.misc.desc_multiattack_spell, featureRef.uses);
                        } else {
                            feature = this.$parent.value.features['action'][featureRef.index];
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
                maDesc = maDesc.replace(':multiattack_descriptions', this.$parent.createSentenceList(maAbilityDescs[0]));
                
                if(maAbilityDescs[1].length > 0) {
                    maAltDesc = maAltDesc.replace(':multiattack_descriptions', this.$parent.createSentenceList(maAbilityDescs[1]));
                    maDesc += ' '+maAltDesc;
                }
            } else {
                if(maAbilityDescs[1].length > 0) {
                    maDesc = maDesc.replace(':multiattack_descriptions', this.$parent.createSentenceList(maAbilityDescs[1]));
                } else {
                    maDesc = ' ';
                }
            }
            
            if(this.value.additionalDescription) {
                maDesc += ' '+this.value.additionalDescription;
            }

            return maDesc;
        },

        spellcastingDescription: function() {
            let spellDesc = this.f5.misc.desc_spellcasting;
            if(this.value.innateSpellcasting) { 
                spellDesc = this.f5.misc.desc_innate_spellcasting;
            } else if(this.value.spellcastingClass) {
                spellDesc = this.f5.misc.desc_prepared_spellcasting;
            }
            
            if(this.value.additionalDescription) {
                spellDesc += ' '+this.value.additionalDescription;
            }

            if(this.atWillSpells.length > 0) {
                let atWillSpellList = this.$parent.createSentenceList(this.atWillSpells.map(x => x.name), true, function(str) {return '<i>'+str+'</i>'});
                spellDesc = spellDesc.replace(':at_will_spells', this.f5.misc.desc_at_will_spells);
                spellDesc = spellDesc.replace(':at_will_spell_list', atWillSpellList.toLowerCase());
            } else {
                spellDesc = spellDesc.replace(':at_will_spells', '');
            }

            if(this.value.spellcastingClass) {
                spellDesc = spellDesc.replace(':spellcasting_class', ' '+this.value.spellcastingClass);
            } else {
                spellDesc = spellDesc.replace(':spellcasting_class', '');
            }
            

            //Spells
            let castsBefore = false;
            spellDesc += '<br/><br/>';

            let sortedSpellList = [];
            if(this.value.innateSpellcasting) {
                sortedSpellList = JSON.parse(JSON.stringify(this.spellsUsesSorted)); //Clone, not reference
            } else {
                sortedSpellList = JSON.parse(JSON.stringify(this.spellsSlotsSorted)); //Clone, not reference
            }

            if(this.value.innateSpellcasting) {
                if(!sortedSpellList[0]) {
                    sortedSpellList[0] = [];
                }
                sortedSpellList[0].push(...this.atWillSpells);
            }

            for(const level in sortedSpellList) {
                let spellSlotList = sortedSpellList[level];
                if(!spellSlotList || spellSlotList.length === 0) { //there are no spells at this level
                    continue;
                }

                if(!this.value.innateSpellcasting && //there are no spell slots for this level
                    level != 0 && 
                    this.value.spellSlots[level] <= 0
                ) {
                    continue;
                }
                
                if(level == 0) {
                    if(this.value.innateSpellcasting) {
                        spellDesc += this.$parent.capitalize(this.f5.misc.at_will)+': ';
                    } else {
                        spellDesc += this.f5.spelllevels[level].name+' ('+this.f5.misc.at_will+'): ';
                    }
                } else {
                    if(!this.value.innateSpellcasting) {
                        spellDesc += this.f5.spelllevels[level].name+' ('+this.$parent.pluralize(this.f5.misc.spell_slots, this.value.spellSlots[level]).replace(':slot_quantity',this.value.spellSlots[level])+'): ';
                    } else {
                        spellDesc += this.f5.misc.spell_uses.replace(':slot_uses',level)+': ';
                    }
                }
                
                spellDesc += '<i>';
                for(const i in spellSlotList) {
                    let spell = spellSlotList[i];
                    spellDesc += spell.name.toLowerCase();
                    if(spell.cast_before) {
                        spellDesc += '*';
                        castsBefore = true;
                    }
                    if(i < spellSlotList.length - 1) {
                        spellDesc += this.f5.misc.sentence_list_separator+' ';
                    }
                }
                spellDesc += '</i><br/><br/>';
            }

            if(castsBefore) {
                spellDesc += this.f5.misc.casts_spells_before;
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
            attackDesc += this.$parent.createSentenceList(damageList);

            if(!this.value.attackSavingThrow) {
                attackDesc += this.f5.misc.sentence_end;
                if(this.value.additionalDescription) {
                    attackDesc += ' '+this.value.additionalDescription;
                }
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

            if(this.value.additionalDescription) {
                savingThrowText += ' '+this.value.additionalDescription;
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
                savingThrowText = savingThrowText.replace(':target_text', this.$parent.pluralize(this.f5.misc.each_target, stTargetCount));
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
                savingThrowText = savingThrowText.replace(':damage', this.$parent.createSentenceList(stDamageList));
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

        damageProjection: function() {
            console.log('=== Feature: Generate Damage Projection ('+this.value.name+'/'+this.damageUpdateIncrementer+') ===');
            let updateIncrementer = this.damageUpdateIncrementer;
            let turnDamage;

            if(this.value.template === 'spellcasting') {
                turnDamage = this.spellcastingProjection;
            } else if(this.value.template === 'multiattack') {
                turnDamage = this.multiattackProjection;
            } else {
                turnDamage = this.standardProjection;
            }

            return turnDamage;
        },

        multiattackProjection: function() {
            //Multiattack Projections
            console.log('--> multiattackProjection');
            let updateIncrementer = this.damageUpdateIncrementer;
            let mergedProjections = [[],[]];

            for(var i = 0; i < this.combat_rounds; i++) {
                mergedProjections[0].push({
                    name: this.f5.misc.title_multiattack+': ',
                    damage: 0,
                    actionCost: 1,
                });
                mergedProjections[1].push({
                    name: this.f5.misc.title_multiattack+': ',
                    damage: 0,
                    actionCost: 1,
                });
            }

            //Loop both Multiattack Group Options
            for(let maGroupIndex in this.value.multiattackReferences) {
                let maGroup = this.value.multiattackReferences[maGroupIndex];
                //Loop through each feature
                for(let featureRef of maGroup) {
                    if(featureRef.index !== null) {
                        if(featureRef.index === 'spellcasting') {
                            //Merge in Spellcasting
                            mergedProjections[maGroupIndex] = this.mergeMultiattackProjections(mergedProjections[maGroupIndex], this.$parent.value.features['spellcasting'][0].damageProjection, featureRef.uses);
                        } else {
                            //Merge in features
                            mergedProjections[maGroupIndex] = this.mergeMultiattackProjections(mergedProjections[maGroupIndex], this.$parent.value.features['action'][featureRef.index].damageProjection, featureRef.uses);
                        }
                    }
                }
            }

            let finalMerge = [];
            for(var i = 0; i < this.combat_rounds; i++) {
                if(!mergedProjections[1][i] || mergedProjections[0][i].damage >= mergedProjections[1][i].damage) {
                    finalMerge[i] = mergedProjections[0][i];
                } else if(!mergedProjections[0][i] || mergedProjections[1][i].damage > mergedProjections[0][i].damage) {
                    finalMerge[i] = mergedProjections[1][i];
                } else {
                    finalMerge[i] = null;
                }
            }

            return finalMerge;
        },

        spellcastingProjection: function() {
            //Spellcasting Projections
            console.log('--> spellcastingProjection');
            let updateIncrementer = this.damageUpdateIncrementer;
            let turnDamage = [];
            let spellSlotsTracker = [];
            spellLoop: for(const spell of this.value.spellList) {
                let addIndex = turnDamage.length;
                for(const i in turnDamage) {
                    if(spell.level > turnDamage[i].spellLevel) {
                        addIndex = i;
                        break;
                    }
                }

                let spellUses = 0;
                if(spell.at_will || spell.level === 0) {
                    spellUses = this.combat_rounds;
                } else if(!this.value.innateSpellcasting && !spellSlotsTracker[spell.level] && this.value.spellSlots[spell.level] > 0) {
                    spellUses = this.value.spellSlots[spell.level];
                    spellSlotsTracker[spell.level] = true;
                } else if(this.value.innateSpellcasting) {
                    spellUses = spell.uses;
                }

                for(let j = 0; j < spellUses; j++) {
                    turnDamage.splice(addIndex, 0, {
                        name: this.f5.misc.title_spellcasting+': '+this.f5.spelllevels[spell.level].name,
                        damage: this.f5.spelllevels[spell.level].average_damage,
                        spellLevel: spell.level,
                        actionCost: 1,
                    });
                }
            }
            return turnDamage;
        },

        standardProjection: function() {
            console.log('--> standardProjection');
            let updateIncrementer = this.damageUpdateIncrementer;
            let turnDamage = [];
            let averageRechargeTurns = 1;

            //Not Spellcasting or Multiattack
            let actionCost = (['legendary_action', 'mythic_action'].includes(this.value.type)) ? legendaryActionCost : 1;

            if(this.value.recharge.type === 'long_rest' || this.value.recharge.type === 'short_rest') {
                return [{
                    name: this.value.name,
                    damage: this.value.averageDPR,
                    actionCost: actionCost,
                }]; //Only once
            } else if(this.value.recharge.type === 'limited_use') {
                let damageArray = [];
                for(let i = 0; i < this.value.recharge.uses; i++) {
                    damageArray.push({
                        name: this.value.name,
                        damage: this.value.averageDPR,
                        actionCost: actionCost,
                    });
                }
                return damageArray;
            } else if(this.value.recharge.type === 'dice_roll') {
                averageRechargeTurns = Math.round(1 / ((this.value.recharge.diceType - this.value.recharge.minRoll + 1) / this.value.recharge.diceType));
            }

            for(let i = 0; i < this.combat_rounds; i++) {
                if(i % averageRechargeTurns === 0) {
                    turnDamage[i] = {
                        name: this.value.name,
                        damage: this.value.averageDPR,
                        actionCost: actionCost,
                    };
                }
            }

            return turnDamage;
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
    },

    methods: {
        addDamageDie: function(type) {
            let damageDie = this.$parent.createDamageDie(this.value[type].length > 0 ? false : true); //false for each damage set after the first
            this.value[type].push(damageDie);
        },

        removeDamageDie: function(type, i) {
            this.value[type].splice(i, 1);
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
                index: null,
                uses: 1
            });
        },

        removeMultiattack: function(index, insideIndex) {
            this.value.multiattackReferences[index].splice(insideIndex, 1);
        },

        descriptionTextReplace: function(str) {
            //Creature Name
            let creatureName = this.$parent.value.name.toLowerCase();
            if(this.value.isNameProperNoun) {
                str = str.replace(/the :creature_name/ig, this.capitalize(creatureName));
                str = str.replaceAll(':creature_name', this.capitalize(creatureName));
            } else {
                str = str.replaceAll(':creature_name', creatureName);
            }

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
            str = str.replace(':range_distance_low', this.value.attackRange.low);
            str = str.replace(':range_distance_high', this.value.attackRange.high+' '+this.$parent.$parent.editor.measure.measureUnit);
            str = str.replace(':targets', this.$parent.pluralize(this.f5.misc.num_of_targets, this.value.attackTargets).replace(':target_count', this.value.attackTargets));

            //Saving Throw
            str = str.replace(':saving_throw_dc', this.$parent.makeSavingThrowDC(this.value.savingThrowMonsterAbility));
            let abilityList = [];
            for(let i in this.value.savingThrowSaveAbilities) {
                abilityList.push(this.f5.abilities[this.value.savingThrowSaveAbilities[i]].name);
            }
            str = str.replace(':saving_throw_ability', this.$parent.createSentenceList(abilityList, false));

            //Spells
            str = str.replace(':caster_level_article', this.$parent.determineIndefiniteArticle(this.$parent.casterLevel, true)); 
            str = str.replace(':caster_level', this.$parent.ordinalNumber(this.$parent.casterLevel)); 
            str = str.replace(':spellcasting_ability', this.f5.abilities[this.value.spellcastingAbility].name);
            str = str.replace(':spell_save_dc', this.$parent.makeSavingThrowDC(this.value.spellcastingAbility));
            str = str.replace(':spell_hit', this.$parent.addPlus(this.$parent.proficiency + this.$parent.getAbilityMod(this.value.spellcastingAbility)));

            return str;
        },

        compareIdToMultiattackFeatures: function(obj) {
            //TODO: Remove this?
            console.group('Feature compareIdToMultiattackFeatures: ');
            console.log(obj);
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
                            console.log('Multiattack: DPR Changed of child: '+obj.id);
                            this.forceProjectionUpdate(); //Forces a projection update 
                            return;
                        } else if(this.$parent.value.features['action'][featureRef.index].id === obj.id) {
                            console.log('Multiattack: DPR Changed of child: '+obj.id);
                            this.forceProjectionUpdate(); //Forces a projection update 
                            return;
                        }
                    }
                }
            }
            console.groupEnd();
        },

        updateDamageProperties: function() {
            console.group('==updateDamageProperties:'+this.value.name+'==');
            //Set DPR value so it's accessible from outside
            if(this.value.averageDPR != this.averageDPR) {
                this.value.averageDPR = this.averageDPR;
                console.log('Set AvgDPR: '+this.value.averageDPR);
            }
            if(this.value.damageProjection != this.damageProjection) {
                this.value.damageProjection = this.damageProjection;
                console.log('Set Feature Projection: ');
                console.log(this.value.damageProjection);
                //this.$parent.$emit('feature-projection-change', {id: this.value.id, actionType: this.value.actionType, projection: this.value.damageProjection});
            }
            console.groupEnd();
        },

        dprCalculator: function(useMax = false) {
            console.log("-> dprCalculator: "+useMax);
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
                                abilityDPR = this.$parent.value.features['spellcasting'][0].averageDPR * featureRef.uses;
                                //console.log('averageDPR MA DPR feature: '+this.$parent.value.features['spellcasting'][0].name+': '+abilityDPR);
                            } else {
                                abilityDPR = this.$parent.value.features['action'][featureRef.index].averageDPR * featureRef.uses;
                                //console.log('averageDPR MA DPR feature: '+this.$parent.value.features['action'][featureRef.index].name+': '+abilityDPR);
                            }
                            groupDPR += (!isNaN(abilityDPR) && abilityDPR > 0) ? abilityDPR : 0;
                        }
                    }
                    if(groupDPR > multiDPR) {
                        multiDPR = groupDPR;
                    }
                }
                avgDPR = multiDPR;
                //console.log('averageDPR MA DPR: '+avgDPR);
            } else if(this.value.template === 'custom') { 
                // Custom Ability Average DPR
                for(let i in this.value.customDamage) {
                    avgDPR += this.$parent.averageDamage(this.value.customDamage[i], 0, useMax);
                }
            }

            //Limit targets to number of players
            if(avgTargets > this.$parent.$parent.editor.player_characters.number) {
                avgTargets = this.$parent.$parent.editor.player_characters.number;
            }

            let dpr = avgDPR * avgTargets;

            //Set to value //TODO Can this be moved or removed
            if(!useMax && this.value.averageDPR !== dpr) {
                this.value.averageDPR = dpr;
            } else if(useMax && this.value.maxDPR !== dpr) {
                this.value.maxDPR = dpr;
            }

            return dpr;
        },

        mergeMultiattackProjections: function(maProj, newProj, uses) {
            if(!newProj) {
                return maProj;
            }

            for(var i = 0; i < this.combat_rounds; i++) {
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
            }

            return maProj;
        },

        forceProjectionUpdate: function() {
            console.log('->forceProjectionUpdate');
            this.damageUpdateIncrementer++;
            if(this.damageUpdateIncrementer > 50) {
                this.damageUpdateIncrementer = 0;
            }
            this.updateDamageProperties();
        }
    },       
};