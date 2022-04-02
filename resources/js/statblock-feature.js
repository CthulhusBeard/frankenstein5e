import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import jquery from 'jquery';

export {StatBlockFeature as default}

var StatBlockFeature = {
    props: ['value'],
    template: '#stat-block__feature',  
    components: {
        'Multiselect': Multiselect,
    },

    watch: {
        value: {
            handler(val) {

                //Must have one or more saving throw
                if(this.value.savingThrowSaveAbilities.length === 0) {
                    this.value.savingThrowSaveAbilities = ['str'];
                }

                //If AOE target area doesn't apply to this template, change it
                if(!this.$parent.$parent.f5.areaofeffect[this.value.targetType].types.includes(this.value.template)) {
                    for(const key in this.$parent.$parent.f5.areaofeffect) {
                        let element = this.$parent.$parent.f5.areaofeffect[key];
                        if(element.types.includes(this.value.template)) {
                            this.value.targetType = key;
                            break;
                        }
                    }
                }

                //Set DPR value so it's accessible from outside
                if(this.value.averageDPR != this.calcAverageDPR) {
                    this.value.averageDPR = this.calcAverageDPR;
                }
                if(this.value.damageProjection != this.damageProjection) {
                    this.value.damageProjection = this.damageProjection;
                }

                
            }, 
            deep: true
        }
    },
    computed: {

        calcAverageDPR: function() {
            let avgDPR = 0;
            let avgTargets = 1;
            if(this.value.manualDPR >= 0) {
                return this.value.manualDPR;
            } else if(this.value.template === 'spellcasting') { 
                // Spellcasting Average DPR
                if(this.$parent.$parent.f5.spelllevels[this.highestCastableSpell]) { 
                    //Target count should already be considered in average damage of spells
                    return this.$parent.$parent.f5.spelllevels[this.highestCastableSpell].average_damage;
                }

            } else if(this.value.template === 'attack') { 
                // Attack Average DPR
                for(let i in this.value.attackDamage) {
                    avgDPR += this.$parent.averageDamage(this.value.attackDamage[i], this.value.attackAbility);
                }
                
                if(this.value.hasOngoingDamage) {
                    for(let i in this.value.ongoingDamage) {
                        avgDPR += this.$parent.averageDamage(this.value.ongoingDamage[i], 0);
                    }
                }
                
                if(this.value.attackSavingThrow) {
                    for(let i in this.value.savingThrowDamage) {
                        avgDPR += this.$parent.averageDamage(this.value.savingThrowDamage[i], 0);
                    }
                }

                avgTargets = this.value.attackTargets;

                //Include average AC and chance to hit?? Average ~16


            } else if(this.value.template === 'saving_throw') { 
                // Saving Throw Average DPR

                for(let i in this.value.savingThrowDamage) {
                    avgDPR += this.$parent.averageDamage(this.value.savingThrowDamage[i], 0);
                }

                let distanceBaseline = 30;
                avgTargets = this.$parent.$parent.f5.areaofeffect[this.value.targetType].targets_at_30;
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
                            if(featureRef.index === 'spellcasting') {
                                groupDPR += this.$parent.value.features['spellcasting'][0].averageDPR * featureRef.uses;
                            } else {
                                groupDPR += this.$parent.value.features['action'][featureRef.index].averageDPR * featureRef.uses;
                            }
                        }
                    }
                    if(groupDPR > multiDPR) {
                        multiDPR = groupDPR;
                    }
                }
                avgDPR = multiDPR;
            }

            return avgDPR * avgTargets;
        },

        displayName: function() {
            let nameText = this.value.name;
            //anything that triggers brackets //Different forms?
            let brackets = this.bracketText; //separated by "sentence_list_separator_secondary"
            
            if(brackets) {
                nameText += ' ('+brackets+')';
            }
            return (nameText + this.$parent.$parent.f5.misc.sentence_end).trim();
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
                brackets += this.$parent.$parent.f5.misc.action_cost.replace(':cost', this.value.legendaryActionCost);
            }

            //Recharge rate
            if(this.value.recharge.type !== 'none') {
                if(brackets) {
                    brackets += this.$parent.$parent.f5.misc.sentence_list_separator_secondary+' ';
                }
                if(this.value.recharge.type === 'dice_roll') {
                    brackets += this.$parent.$parent.f5.misc.title_recharge+' '+this.value.recharge.minRoll;
                    if(this.value.recharge.minRoll !== this.value.recharge.diceType) {
                        brackets += '-'+this.value.recharge.diceType;
                    }
                } else if(this.$parent.$parent.f5.recharge[this.value.recharge.type].desc) {
                    brackets += this.$parent.$parent.f5.recharge[this.value.recharge.type].desc.replace(':uses', this.value.recharge.uses);
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
            for(let i in this.$parent.$parent.f5.featuretemplates) {
                if(
                    this.$parent.$parent.f5.featuretemplates[i].action_options && 
                    this.$parent.$parent.f5.featuretemplates[i].action_options.includes(this.value.actionType)
                ) {

                    options[i] = this.$parent.$parent.f5.featuretemplates[i];
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
                return this.value.customDescription;
            } 

            if(this.value.template == 'multiattack') {
                return this.multiattackDescription;
            }

            if(this.value.template == 'spellcasting') {
                return this.spellcastingDescription;
            } 

            //Attack Description
            if(this.value.template == 'attack') {
                descText = this.attackDescription;
            }

            //Add Saving Throw
            if((this.value.template == 'attack' && this.value.attackSavingThrow) || this.value.template == 'saving_throw') {
                descText += this.savingThrowDescription;
            }

            return descText+this.$parent.$parent.f5.misc.sentence_end;
        },

        multiattackDescription: function() {
            let maDesc = this.$parent.$parent.f5.misc.desc_multiattack;
            let maAltDesc = this.$parent.$parent.f5.misc.desc_multiattack_alternative;
            let maAbilityDescs = [[],[]]; // Multiattacks will only have 2 options

            for(let i in this.value.multiattackReferences) {
                let group = this.value.multiattackReferences[i];
                let prevTemplate = '';
                for(let j in group) {
                    let featureRef = group[j];

                    let featDesc = this.$parent.$parent.f5.misc.desc_multiattack_ability;
                    let feature;
                    if(featureRef.index !== null) {
                        if(featureRef.index === 'spellcasting') {
                            feature = this.$parent.value.features['spellcasting'][0];
                            featDesc = this.$parent.$parent.f5.misc.desc_multiattack_spell;
                        } else {
                            feature = this.$parent.value.features['action'][featureRef.index];
                            if(feature.template === 'attack') {
                                let attackString = this.$parent.pluralize(this.$parent.$parent.f5.misc.attack, featureRef.uses);
                                let attackSingular = this.$parent.pluralize(this.$parent.$parent.f5.misc.attack);
                                let attackPlural = this.$parent.pluralize(this.$parent.$parent.f5.misc.attack, 2);
                                featDesc = this.$parent.$parent.f5.misc.desc_multiattack_attack;
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
                    }

                    if(prevTemplate !== feature.template) {
                        featDesc = featDesc.replace(':can_use ', this.$parent.$parent.f5.misc.desc_can_use);
                    } else {
                        featDesc = featDesc.replace(':can_use ', '');
                    }
                    featDesc = featDesc.replace(':use_count_semantics', this.$parent.numberOfTimesSemantics(featureRef.uses));
                    featDesc = featDesc.replace(':use_count', featureRef.uses);
                    featDesc = featDesc.replace(':ability_name', feature.name);

                    prevTemplate = feature.template;

                    maAbilityDescs[i].push(featDesc);
                }
            }

            maDesc = maDesc.replace(':multiattack_descriptions', this.$parent.createSentenceList(maAbilityDescs[0]));
            maDesc = this.$parent.replaceCreatureName(maDesc);
            
            if(maAbilityDescs[1].length > 0) {
                maAltDesc = maAltDesc.replace(':multiattack_descriptions', this.$parent.createSentenceList(maAbilityDescs[1]));
                maDesc += ' '+maAltDesc;
            }

            return maDesc;
        },

        spellcastingDescription: function() {
            let spellDesc = this.$parent.$parent.f5.misc.desc_spellcasting;
            //TODO prepared spellcasting
            if(this.value.innateSpellcasting) { 
                spellDesc = this.$parent.$parent.f5.misc.desc_innate_spellcasting;
            }

            spellDesc = spellDesc.replace(':caster_level_article', this.$parent.determineIndefiniteArticle(this.$parent.casterLevel, true)); 
            spellDesc = spellDesc.replace(':caster_level', this.$parent.ordinalNumber(this.$parent.casterLevel)); 
            spellDesc = spellDesc.replace(':spellcasting_ability', this.$parent.$parent.f5.abilities[this.value.spellcastingAbility].name);
            spellDesc = spellDesc.replace(':spell_save_dc', this.$parent.makeSavingThrowDC(this.value.spellcastingAbility));
            spellDesc = spellDesc.replace(':spell_hit', this.$parent.addPlus(this.$parent.proficiency + this.$parent.getAbilityMod(this.value.spellcastingAbility)));

            if(this.atWillSpells.length > 0) {
                let atWillSpellList = this.$parent.createSentenceList(this.atWillSpells.map(x => x.name), true, function(str) {return '<i>'+str+'</i>'});
                spellDesc = spellDesc.replace(':at_will_spells', this.$parent.$parent.f5.misc.desc_at_will_spells);
                spellDesc = spellDesc.replace(':at_will_spell_list', atWillSpellList.toLowerCase());
            } else {
                spellDesc = spellDesc.replace(':at_will_spells', '');
            }

            //Spells
            let castsBefore = false;
            spellDesc += '<br/><br/>';

            let sortedSpellList;
            if(!this.value.innateSpellcasting) {
                sortedSpellList = this.spellsSlotsSorted;
            } else {
                sortedSpellList = this.spellsUsesSorted;
            }

            for(const level in sortedSpellList) {
                if(sortedSpellList[level].length === 0) { //there are no spells at this level
                    continue;
                }
                if(!this.value.innateSpellcasting && //there are no spell slots for this level
                    level !== 0 && 
                    this.value.spellSlots[level] <= 0
                ) {
                    continue;
                }
                
                if(level == 0) {
                    spellDesc += this.$parent.$parent.f5.spelllevels[level].name+' ('+this.$parent.$parent.f5.misc.at_will+'): ';
                } else {
                    if(!this.value.innateSpellcasting) {
                        spellDesc += this.$parent.$parent.f5.spelllevels[level].name+' ('+this.$parent.pluralize(this.$parent.$parent.f5.misc.spell_slots, this.value.spellSlots[level]).replace(':slot_quantity',this.value.spellSlots[level])+'): ';
                    } else {
                        spellDesc += this.$parent.$parent.f5.misc.spell_uses.replace(':slot_uses',level)+': ';
                    }
                }
                
                spellDesc += '<i>';
                for(const i in sortedSpellList[level]) {
                    let spell = sortedSpellList[level][i];
                    spellDesc += spell.name.toLowerCase();
                    if(spell.cast_before) {
                        spellDesc += '*';
                        castsBefore = true;
                    }
                    if(i < sortedSpellList[level].length - 1) {
                        spellDesc += this.$parent.$parent.f5.misc.sentence_list_separator+' ';
                    }
                }
                spellDesc += '</i><br/>';
            }

            if(castsBefore) {
                spellDesc += '<br/>'+this.$parent.$parent.f5.misc.casts_spells_before;
            }
            
            spellDesc = this.$parent.replaceCreatureName(spellDesc);
            return spellDesc;
        },

        attackDescription: function() {
            let attackDesc = this.$parent.$parent.f5.misc.desc_attack;
            //'<i>:attack_range :attack_type:</i> :attack_bonus to hit, :range :targets.'
            attackDesc = attackDesc.replace(':attack_range', this.$parent.$parent.f5.areaofeffect[this.value.targetType].name);
            attackDesc = attackDesc.replace(':attack_type', this.$parent.$parent.f5.attacktypes[this.value.attackType].name);
            attackDesc = attackDesc.replace(':attack_bonus', this.$parent.addPlus(this.$parent.getAbilityMod(this.value.attackAbility) + this.$parent.proficiency));
            if(this.value.targetType == 'melee') {
                attackDesc = attackDesc.replace(':range', this.$parent.$parent.f5.misc.reach);
            } else if(this.value.targetType == 'melee_or_ranged') {
                attackDesc = attackDesc.replace(':range', this.$parent.$parent.f5.misc.reach_or_range);
            } else if(this.value.targetType == 'ranged'){
                attackDesc = attackDesc.replace(':range', this.$parent.$parent.f5.misc.range);
            } else {
                attackDesc = attackDesc.replace(':range', '');
            }
            attackDesc = attackDesc.replace(':reach_distance', this.value.attackReach+' '+this.$parent.value.measure.measureUnit);
            attackDesc = attackDesc.replace(':range_distance_low', this.value.attackRange.low);
            attackDesc = attackDesc.replace(':range_distance_high', this.value.attackRange.high+' '+this.$parent.value.measure.measureUnit);
            attackDesc = attackDesc.replace(':targets', this.$parent.pluralize(this.$parent.$parent.f5.misc.num_of_targets, this.value.attackTargets).replace(':target_count', this.value.attackTargets));

            //Hit
            attackDesc += ' <i>'+this.$parent.$parent.f5.misc.desc_attack_hit+'</i> ';
            let damageList = [];
            for(let i in this.value.attackDamage) {
                damageList.push(this.$parent.createDamageText(this.value.attackDamage[i], this.value.attackAbility));
            }
            attackDesc += this.$parent.createSentenceList(damageList);
            return attackDesc;
        },

        savingThrowDescription: function() {
            let savingThrowText = '';
            if(this.value.savingThrowDamage.length >= 1 && this.value.savingThrowConditions.length >= 2) {
                savingThrowText = this.$parent.$parent.f5.misc.desc_attack_saving_throw_damage_condition;
            } else if(this.value.savingThrowDamage.length >= 1 && this.value.savingThrowConditions.length >= 1) {
                savingThrowText = this.$parent.$parent.f5.misc.desc_attack_saving_throw_damage_condition;
            } else if(this.value.savingThrowDamage.length >= 1) {
                savingThrowText = this.$parent.$parent.f5.misc.desc_attack_saving_throw_damage;
            } else if(this.value.savingThrowConditions.length >= 1) {
                savingThrowText = this.$parent.$parent.f5.misc.desc_attack_saving_throw_condition;
            }

            //Targets
            let stTargetCount = 2; //or more. 
            //TODO change to 1 for single saving throw target
            if(this.value.template == 'attack') {
                //TODO: override if saving throw area is different than attack targets
                stTargetCount = this.value.attackTargets;
            }

            if(this.value.template == 'attack') {
                savingThrowText = savingThrowText.replace(':target_text', this.$parent.pluralize(this.$parent.$parent.f5.misc.the_target, this.value.attackTargets));
            } else {
                savingThrowText = savingThrowText.replace(':target_text', this.$parent.pluralize(this.$parent.$parent.f5.misc.each_target, stTargetCount));
            }
            
            //Adjust for run-on sentences
            if(this.value.template == 'attack' && this.value.attackSavingThrow && this.value.attackDamage.length > 0) {
                if(this.hasRunOnSentence) {
                    savingThrowText = this.$parent.$parent.f5.misc.sentence_end+' '+this.$parent.$parent.f5.misc.additionally.replace(':addition', savingThrowText);
                } else {
                    savingThrowText = this.$parent.$parent.f5.misc.sentence_list_separator+' '+this.$parent.$parent.f5.misc.and+' '+savingThrowText;
                }
            } else {
                savingThrowText = this.$parent.capitalize(savingThrowText);
            }
            
            //Half as much
            if(this.value.savingThrowHalfOnSuccess) {
                savingThrowText = savingThrowText.replace(':half_as_much', this.$parent.$parent.f5.misc.desc_saving_throw_half_on_success);
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
                        this.$parent.pluralize(this.$parent.$parent.f5.conditions[this.value.savingThrowConditions[i]].is, stTargetCount).replace(':condition', this.$parent.$parent.f5.conditions[this.value.savingThrowConditions[i]].name.toLowerCase()
                    ));
                    stNotConditionList.push(
                        this.$parent.pluralize(this.$parent.$parent.f5.conditions[this.value.savingThrowConditions[i]].not, stTargetCount).replace(':condition', this.$parent.$parent.f5.conditions[this.value.savingThrowConditions[i]].name.toLowerCase()
                    ));
                    //TODO replace distance for pushed
                }
                savingThrowText = savingThrowText.replace(':condition', this.$parent.createConditionSentenceList(stConditionList));
                savingThrowText = savingThrowText.replace(':not_condition', this.$parent.$parent.f5.misc.and + ' ' + this.$parent.createConditionSentenceList(stNotConditionList));
            }

            savingThrowText = savingThrowText.replace(':saving_throw_dc', this.$parent.makeSavingThrowDC(this.value.savingThrowMonsterAbility));

            let abilityList = [];
            for(let i in this.value.savingThrowSaveAbilities) {
                abilityList.push(this.$parent.$parent.f5.abilities[this.value.savingThrowSaveAbilities[i]].name);
            }
            savingThrowText = savingThrowText.replace(':saving_throw_ability', this.$parent.createSentenceList(abilityList, false));

            return savingThrowText;
        },

        damageProjection: function() {
            let turnDamage = [];
            let averageRechargeTurns = 1;

            //Spellcasting Projections
            if(this.value.template ==='spellcasting') {
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
                        spellUses = this.$parent.$parent.editor.round_tracker;
                    } else if(!this.value.innateSpellcasting && !spellSlotsTracker[spell.level] && this.value.spellSlots[spell.level] > 0) {
                        spellUses = this.value.spellSlots[spell.level];
                        spellSlotsTracker[spell.level] = true;
                    } else if(this.value.innateSpellcasting) {
                        spellUses = spell.uses;
                    }

                    for(let j = 0; j < spellUses; j++) {
                        turnDamage.splice(addIndex, 0, {
                            name: this.$parent.$parent.f5.misc.title_spellcasting+': '+this.$parent.$parent.f5.spelllevels[spell.level].name,
                            damage: this.$parent.$parent.f5.spelllevels[spell.level].average_damage,
                            spellLevel: spell.level,
                            actionCost: 1,
                        });
                    }
                }

                return turnDamage;
            } else if(this.value.template === 'multiattack') {
                console.log('Multiattack projection');
                for(let maGroup of this.value.multiattackReferences) {
                    for(let featureRef of maGroup) {
                        if(featureRef.index !== null) {
                            if(featureRef.index === 'spellcasting') {
                                console.log(this.$parent.value.features['spellcasting'][0].damageProjection);
                            } else {
                                console.log(this.$parent.value.features['action'][featureRef.index].damageProjection);
                            }
                        }
                    }
                }
                return turnDamage;
            }

            //Not Spellcasting
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

            for(let i = 0; i < this.$parent.$parent.editor.round_tracker; i++) {
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
                    'name': this.$parent.$parent.f5.misc.title_add_spell_name,
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
    },       
};