import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

export function initVue(f5data) {

    Vue.component('statblock-feature', {
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
                    if(this.$parent.f5.areaofeffect[this.value.targetType].types.includes(this.value.template)) {
                        for(const key in this.$parent.f5.areaofeffect) {
                            let element = this.$parent.f5.areaofeffect[key];
                            if(element.types.includes(this.value.template)) {
                                this.value.targetType = key;
                                return;
                            }
                        }
                    }

                    //Calc Feature DPR
                    if(this.value.manualDPR >= 0) {
                        this.value.averageDPR = this.value.manualDPR;
                    } else {
                        let avgDPR = 0;
                        if(this.value.template === 'spellcasting') {
                            avgDPR = this.$parent.f5.spelllevels[this.highestCastableSpell].average_damage; 
                        } else if(this.value.template === 'attack') {
                            
                        }
                        this.value.averageDPR = avgDPR;
                    }
                }, 
                deep: true
            }
        },
        computed: {

            displayName: function() {
                let nameText = this.value.name;
                //anything that triggers brackets //Different forms?
                let brackets = this.bracketText; //separated by "sentence_list_separator_secondary"
                
                if(brackets) {
                    nameText += ' ('+brackets+')';
                }
                return nameText + this.$parent.f5.misc.sentence_end;
            },

            bracketText: function() {
                let brackets = '';
                
                //Legendary action cost
                if(
                    this.$parent.options.hasLegendaryActions &&
                    (
                        this.value.actionType === 'legendaryActions' || 
                        (
                            this.$parent.options.hasMythicActions && 
                            this.value.actionType === 'mythicActions'
                        )
                    ) &&
                    this.value.legendaryActionCost > 1
                ) {
                    brackets += this.$parent.f5.misc.action_cost.replace(':cost', this.value.legendaryActionCost);
                }

                //Recharge rate
                if(this.value.recharge.type !== 'none') {
                    if(brackets) {
                        brackets += this.$parent.f5.misc.sentence_list_separator_secondary+' ';
                    }
                    if(this.value.recharge.type === 'dice_roll') {
                        brackets += this.$parent.f5.misc.title_recharge+' '+this.value.recharge.minRoll;
                        if(this.value.recharge.minRoll !== this.value.recharge.diceType) {
                            brackets += '-'+this.value.recharge.diceType;
                        }
                    } else if(this.$parent.f5.recharge[this.value.recharge.type].desc) {
                        brackets += this.$parent.f5.recharge[this.value.recharge.type].desc;
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
                for(let i in this.$parent.f5.featuretemplates) {
                    if(this.value.actionType == 'passives' && i == 'attack') {
                        //continue;
                    }
                    options[i] = this.$parent.f5.featuretemplates[i];
                }
                return options;
            },

            atWillSpells: function() {
                let spellsSorted = [];
                
                for(const level in this.value.spellList) {
                    if(this.value.spellList[level].spells.length <= 0) {
                        continue;
                    }
                    for(const i in this.value.spellList[level].spells) {
                        const spell = this.value.spellList[level].spells[i];
                        if(spell.at_will) {
                            spellsSorted.push(spell);
                        } 
                    }
                }

                return spellsSorted;
            },

            highestCastableSpell:function() {
                let highestSlot = 0;
                
                for(const level in this.value.spellList) {
                    if(
                        level > highestSlot &&
                        this.value.spellList[level].spells.length > 0 
                    ) {
                        if(this.$parent.editor.spell_slots && this.value.spellList[level].slots > 0) {
                            highestSlot = level;
                        } else if(!this.$parent.editor.spell_slots) {
                            for(const i in this.value.spellList[level].spells) {
                                const spell = this.value.spellList[level].spells[i];
                                if(spell.at_will || spell.uses > 0) {
                                    highestSlot = level;
                                    break;
                                } 
                            }
                        }
                    }
                }

                return highestSlot;
            },

            spellsSlotsSorted: function() {
                let spellsSorted = [];
                
                for(const level in this.value.spellList) {
                    if(this.value.spellList[level].slots >= 0 && this.value.spellList[level].spells.length >= 0) {
                        spellsSorted[level] = {spells: [], slots: this.value.spellList[level].slots};
                    } else {
                        continue;
                    }
                    for(const i in this.value.spellList[level].spells) {
                        const spell = this.value.spellList[level].spells[i];
                        if(!spell.at_will) {
                            spellsSorted[level].spells.push(spell);
                        } 
                    }
                    if(spellsSorted[level].spells.length == 0) {
                        delete spellsSorted[level];
                    }
                }

                return spellsSorted;
            },

            spellsUsesSorted: function() {
                let spellsSorted = [];
                
                for(const level in this.value.spellList) {
                    for(const i in this.value.spellList[level].spells) {
                        const spell = this.value.spellList[level].spells[i];
                        if(level === 0) {
                            spellsSorted[0].push(spell);
                        } else if(!spell.at_will && spell.uses > 0) {
                            spellsSorted[spell.uses].push(spell);
                        } 
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

                if(this.value.template == 'spellcasting') {
                    descText = this.$parent.f5.misc.desc_spellcasting;
                    if(this.value.innateSpellcasting) { //TODO prepared spellcasting
                        descText = this.$parent.f5.misc.desc_innate_spellcasting;
                    }

                    descText = descText.replace(':caster_level_article', this.$parent.determineIndefiniteArticle(this.$parent.casterLevel)); 
                    descText = descText.replace(':caster_level', this.$parent.ordinalNumber(this.$parent.casterLevel)); 
                    descText = descText.replace(':spellcasting_ability', this.$parent.f5.abilities[this.value.spellcastingAbility].name);
                    descText = descText.replace(':spell_save_dc', this.$parent.makeSavingThrowDC(this.value.spellcastingAbility));
                    descText = descText.replace(':spell_hit', this.$parent.addPlus(this.$parent.proficiency + this.$parent.getAbilityMod(this.value.spellcastingAbility)));

                    if(this.atWillSpells.length > 0) {
                        let atWillSpellList = this.$parent.createSentenceList(this.atWillSpells.map(x => x.name), true, function(str) {return '<i>'+str+'</i>'});
                        descText = descText.replace(':at_will_spells', this.$parent.f5.misc.desc_at_will_spells);
                        descText = descText.replace(':at_will_spell_list', atWillSpellList);
                    } else {
                        descText = descText.replace(':at_will_spells', '');
                    }

                    //Spells
                    let castsBefore = false;
                    descText += '<br/><br/>';
                    
                    if(this.$parent.editor.spell_slots) {
                        //Old Spell Display
                        let spellSlotList = this.spellsSlotsSorted;
                        for(const level in spellSlotList) {
                            if(spellSlotList[level].spells.length === 0 && spellSlotList[level].slots === 0) {
                                continue;
                            }
                            descText += this.$parent.f5.spelllevels[level].name;
                            if(level == 0) {
                                descText += ' ('+this.$parent.f5.misc.at_will+'): ';
                            } else {
                                descText += ' ('+this.$parent.translate(this.$parent.f5.misc.spell_slots, spellSlotList[level].slots).replace(':slot_quantity',spellSlotList[level].slots)+'): ';
                            }

                            descText += '<i>';
                            for(const i in spellSlotList[level].spells) {
                                descText += spellSlotList[level].spells[i].name.toLowerCase();
                                if(spellSlotList[level].spells[i].cast_before) {
                                    descText += '*';
                                    castsBefore = true;
                                }
                                if(i < spellSlotList[level].spells.length - 1) {
                                    descText += this.$parent.f5.misc.sentence_list_separator+' ';
                                }
                            }
                            descText += '</i><br/>';
                        }
                    } else {
                        //New Spell Display
                        let spellUseList = this.spellsUsesSorted;
                        for(const uses in spellUseList) {
                            if(spellUseList[uses].spells.length === 0) { 
                                continue;
                            }
                            if(uses == 0) {
                                descText += this.$parent.f5.spelllevels[0].name + ' ('+this.$parent.f5.misc.at_will+'): ';
                            } else {
                                descText += this.$parent.f5.misc.spell_uses.replace(':slot_uses',uses)+' ('+this.$parent.translate(this.$parent.f5.misc.spell_slots, spellUseList[uses].slots).replace(':slot_quantity',spellUseList[uses].slots)+'): ';
                            }

                            descText += '<i>';
                            for(const i in spellUseList[uses].spells) {
                                descText += spellUseList[uses].spells[i].name.toLowerCase();
                                if(spellUseList[uses].spells[i].cast_before) {
                                    descText += '*';
                                    castsBefore = true;
                                }
                                if(i < spellUseList[uses].spells.length - 1) {
                                    descText += this.$parent.f5.misc.sentence_list_separator+' ';
                                }
                            }
                            descText += '</i><br/><br/>';
                        }
                    }

                    if(castsBefore) {
                        descText += '<br/>'+this.$parent.f5.misc.casts_spells_before;
                    }
                    
                    descText = descText.replaceAll(':creature_name', this.$parent.options.name.toLowerCase());

                    return descText;
                } 

                if(this.value.template == 'attack') {
                    descText = this.$parent.f5.misc.desc_attack;
                    //'<i>:attack_range :attack_type:</i> :attack_bonus to hit, :range :targets.'
                    descText = descText.replace(':attack_range', this.$parent.f5.areaofeffect[this.value.targetType].name);
                    descText = descText.replace(':attack_type', this.$parent.f5.attacktypes[this.value.attackType].name);
                    descText = descText.replace(':attack_bonus', this.$parent.addPlus(this.$parent.getAbilityMod(this.value.attackAbility) + this.$parent.proficiency));
                    if(this.value.targetType == 'melee') {
                        descText = descText.replace(':range', this.$parent.f5.misc.reach);
                    } else if(this.value.targetType == 'melee_or_ranged') {
                        descText = descText.replace(':range', this.$parent.f5.misc.reach_or_range);
                    } else if(this.value.targetType == 'ranged'){
                        descText = descText.replace(':range', this.$parent.f5.misc.range);
                    } else {
                        descText = descText.replace(':range', '');
                    }
                    descText = descText.replace(':reach_distance', this.value.attackReach+' '+this.$parent.options.measure.measureUnit);
                    descText = descText.replace(':range_distance_low', this.value.attackRange.low);
                    descText = descText.replace(':range_distance_high', this.value.attackRange.high+' '+this.$parent.options.measure.measureUnit);
                    descText = descText.replace(':targets', this.$parent.translate(this.$parent.f5.misc.num_of_targets, this.value.attackTargets).replace(':target_count', this.value.attackTargets));

                    //Hit
                    descText += ' <i>'+this.$parent.f5.misc.desc_attack_hit+'</i> ';
                    let damageList = [];
                    for(let i in this.value.attackDamage) {
                        damageList.push(this.$parent.createDamageText(this.value.attackDamage[i], this.value.attackAbility));
                    }
                    descText += this.$parent.createSentenceList(damageList);

                }
                //Add Saving Throw
                if((this.value.template == 'attack' && this.value.attackSavingThrow) || this.value.template == 'saving_throw') {
                    let savingThrowText = '';
                    if(this.value.savingThrowDamage.length >= 1 && this.value.savingThrowConditions.length >= 2) {
                        savingThrowText = this.$parent.f5.misc.desc_attack_saving_throw_damage_condition;
                    } else if(this.value.savingThrowDamage.length >= 1 && this.value.savingThrowConditions.length >= 1) {
                        savingThrowText = this.$parent.f5.misc.desc_attack_saving_throw_damage_condition;
                    } else if(this.value.savingThrowDamage.length >= 1) {
                        savingThrowText = this.$parent.f5.misc.desc_attack_saving_throw_damage;
                    } else if(this.value.savingThrowConditions.length >= 1) {
                        savingThrowText = this.$parent.f5.misc.desc_attack_saving_throw_condition;
                    }

                    //Targets
                    let stTargetCount = 2; //or more. 
                    //TODO change to 1 for single saving throw target
                    if(this.value.template == 'attack') {
                        //TODO: override if saving throw area is different than attack targets
                        stTargetCount = this.value.attackTargets;
                    }

                    if(this.value.template == 'attack') {
                        savingThrowText = savingThrowText.replace(':target_text', this.$parent.translate(this.$parent.f5.misc.the_target, this.value.attackTargets));
                    } else {
                        savingThrowText = savingThrowText.replace(':target_text', this.$parent.translate(this.$parent.f5.misc.each_target, stTargetCount));
                    }
                    
                    //Adjust for run-on sentences
                    if(this.value.template == 'attack' && this.value.attackSavingThrow && this.value.attackDamage.length > 0) {
                        if(this.hasRunOnSentence) {
                            savingThrowText = this.$parent.f5.misc.sentence_end+' '+this.$parent.f5.misc.additionally.replace(':addition', savingThrowText);
                        } else {
                            savingThrowText = this.$parent.f5.misc.sentence_list_separator+' '+this.$parent.f5.misc.and+' '+savingThrowText;
                        }
                    } else {
                        savingThrowText = savingThrowText.charAt(0).toUpperCase() + savingThrowText.slice(1);
                    }
                    
                    //Half as much
                    if(this.value.savingThrowHalfOnSuccess) {
                        savingThrowText = savingThrowText.replace(':half_as_much', this.$parent.f5.misc.desc_saving_throw_half_on_success);
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
                                this.$parent.translate(this.$parent.f5.conditions[this.value.savingThrowConditions[i]].is, stTargetCount).replace(':condition', this.$parent.f5.conditions[this.value.savingThrowConditions[i]].name.toLowerCase()
                            ));
                            stNotConditionList.push(
                                this.$parent.translate(this.$parent.f5.conditions[this.value.savingThrowConditions[i]].not, stTargetCount).replace(':condition', this.$parent.f5.conditions[this.value.savingThrowConditions[i]].name.toLowerCase()
                            ));
                            //TODO replace distance for pushed
                        }
                        savingThrowText = savingThrowText.replace(':condition', this.$parent.createConditionSentenceList(stConditionList));
                        savingThrowText = savingThrowText.replace(':not_condition', this.$parent.f5.misc.and + ' ' + this.$parent.createConditionSentenceList(stNotConditionList));
                    }

                    savingThrowText = savingThrowText.replace(':saving_throw_dc', this.$parent.makeSavingThrowDC(this.value.savingThrowMonsterAbility));

                    let abilityList = [];
                    for(let i in this.value.savingThrowSaveAbilities) {
                        abilityList.push(this.$parent.f5.abilities[this.value.savingThrowSaveAbilities[i]].name);
                    }
                    savingThrowText = savingThrowText.replace(':saving_throw_ability', this.$parent.createSentenceList(abilityList, false));

                    descText += savingThrowText;
                }

                return descText+'.';
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

            addSpell: function() {
                this.value.spellList[this.value.addSpellLevel].spells.push({
                    'name': this.value.addSpellName,
                    'level': this.value.addSpellLevel,
                    'cast_before': this.value.addSpellBeforeCombat,
                    'at_will': this.value.addSpellAtWill,
                    'uses': this.value.addSpellUses,
                });

                this.value.addSpellName = this.$parent.f5.misc.title_add_spell_name;
                this.value.addSpellBeforeCombat = false;
                this.value.addSpellAtWill = false;
                this.value.addSpellUses = 1;
            },

            removeSpell: function(spellName, spellLevel) {
                //TODO remove this spell
                this.value.spellList[spellLevel].spells.forEach((element, index) => {
                    if(spellName === element['name']) {
                        this.value.spellList[spellLevel].spells.splice(index, 1);
                    }
                    return;
                });
            },

            unsetManualDPR: function() {
                this.value.manualDPR = -1;
            },
        },       
    })

    let vueData = {
        editor: {
            edit_mode: true,
            spell_slots: true,
            columns: 2,
        },
        options: {
            name: 'Monster',
            nameProperNoun: false,
            size: 'medium',
            type: 'dragon',
            subtype: '',
            typeCategory: '',
            alignment: '',
            showTypicalAlignment: true,
            armorClass: {
                type: 'none',
                manual: '10',
                name: f5data.armor.none.name,
                bonus: '0',
                stealthDis: false,
                shield: false,
            },
            hitPoints: {
                diceType: 4,
                diceAmount: 1,
                additional: 0,
            },
            abilities: {},
            savingThrows: {},
            damageResistances: [],
            damageImmunities: [],
            damageVulnerabilites: [],
            conditionImmunities: [],
            skills: [],
            languages: {
                spokenWritten: [],
                doesntSpeak: [],
                telepathy: 0,
            },
            speeds: {},
            hover: false,
            senses: {},

            measure: {
                measureUnit: 'ft.',
                measureIncrement: 5,
                measureUnitUp: 5280,
                measureUnitUpName: 'miles',
            },

            showNonCombat: true,
            manualOverride: {
                proficiency: 0,
                casterLevel: 0,
            },
            targetCR: {
                offensive: {
                }, 
                defensive: {
                }
            },
            hasLegendaryActions: true,
            hasMythicActions: false,
            legendaryActions: 3,
            features: {
                passives: [],
                spellcasting: [],
                actions: [],
                bonusActions: [],
                reactions: [],
                legendaryActions: [],
                mythicActions: [],
                lairActions: [],
            },
        },
        newFeature: {
            name: 'Name',
            action: 'action',
            template: 'attack',
            desc: '',
            recharge: 0,
            attack: {
                meleeRanged: 'melee',
                weaponSpell: 'weapon',
                reach: '5',
                rangeShort: '5',
                rangeLong: '5',
                ability: 'str',
                targets: '1',
                diceAmount: '1',
                damageDice: '4',
            }, 
            spell: {
                areaOfEffect: 'melee',
                range: '5',
                ability: 'str',
            },
        },
        f5: f5data,
    };

    for(let ability in f5data.abilities) {
        vueData.options.abilities[ability] = 10;
        vueData.options.savingThrows[ability] = false;
    }

    for(let sense in f5data.senses) {
        vueData.options.senses[sense] = 0;
    }

    for(let lang in f5data.languages) {
        if(f5data.languages[lang]['default']) {
            vueData.options.languages.spokenWritten.push(lang);
        }
    }

    for(let speed in f5data.speeds) {
        if(f5data.speeds[speed]['default']) {
            vueData.options.speeds[speed] = f5data.speeds[speed]['default'];
        } else {
            vueData.options.speeds[speed] = 0;
        }
    }
    
    let app = new Vue({
        el: '#f5',
        data: vueData,
        components: {
            'Multiselect': Multiselect,
        },

        computed: {
            //Editor
            statblockColumns: function() {
                return 'column-'+this.editor.columns;
            },

            averageDPR: function() {
                let avgDPR = 0;
                
                for(const featureType in this.options.features) {
                    //console.log('featureType: '+featureType);
                    for(const feature of this.options.features[featureType]) {
                        //console.log('feature');
                        //console.log(feature.name);
                        //console.log(feature.averageDPR);
                        if(feature.averageDPR > avgDPR) {
                            avgDPR = feature.averageDPR;
                        }
                    }
                }

                return avgDPR;
            },

            //Challenge Rating
            damageCr: function() {
                //console.log('--averageDPR--');
                console.log(this.averageDPR);

                return 'O-CR';
            },

            healthCr: function() {
                //TODO: Factor in AC, HP, and defensive features
                let hp = this.getHP;

                let approxCr = 31;

                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(hp >= cr.hp.low && hp <= cr.hp.high) {
                        approxCr = i;
                        break;
                    }
                }

                return approxCr;
            },

            armorCr: function() {
                //TODO: Factor in AC, HP, and defensive features
                let ac = this.getAC;
                if(!ac) {
                    return 'Unset';
                } else if(ac < this.f5.challengerating[0].ac) {
                    return '0';
                } else if(ac > this.f5.challengerating[20].ac) {
                    return '> 30';
                }
                let crLow = 31;
                let crHigh = 0;

                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(ac == cr.ac) {
                        if(cr.cr > crHigh) {
                            crHigh = cr.cr;
                        }
                        if(cr.cr < crLow) {
                            crLow = cr.cr;
                        }
                    }
                }

                if(crLow == crHigh) return crLow; 
                return crLow+'-'+crHigh;
            },



            averageCR: function() {
                //Average CRs
                return 'A-CR';
            },

            //Description Text
            descriptionText: function() {
                let descStr = '';
                if(this.options.size) {
                    descStr += this.getProp(this.f5.creaturesizes[this.options.size]);
                    this.options.hitPoints.diceType = this.f5.creaturesizes[this.options.size].hit_dice; //TODO check if hitdice were manually set
                }
                if(this.options.type) {
                    if(descStr != '') descStr += ' '; 
                    descStr += this.capitalize(this.getProp(this.f5.creaturetypes[this.options.type]));
                }
                if(this.options.subtype /*|| (this.options.showtypeCategory && this.options.typeCategory)*/) { 
                    if(descStr != '') descStr += ' '; 
                    descStr += '('
                    if(this.options.subtype) {
                        descStr += this.getProp(this.f5.creaturesubtypes[this.options.subtype]);
                    }
                    /* TODO Do something with category?
                    if(this.options.subtype && (this.options.showtypeCategory && this.options.typeCategory)) { 
                        str += ', ';
                    }
                    */
                    descStr += ')';
                }

                if(this.options.alignment) {
                    if(descStr != '') descStr += ', '; 
                    if(this.options.showTypicalAlignment) {
                        descStr += this.f5.misc.alignments_typically.replace(":alignment", this.getProp(this.f5.alignments[this.options.alignment]));
                    } else {
                        descStr += this.getProp(this.f5.alignments[this.options.alignment]);
                    }
                }
                
                return this.capitalize(descStr);
    
            },

            //Armor Class
            allowAcSelector: function() {
                if(this.options.armorClass && this.options.armorClass.type && this.f5.armor[this.options.armorClass.type]) {
                    return (this.f5.armor[this.options.armorClass.type].range);
                }
                return false;
            },

            allowAcBonus: function() {
                if(this.f5.armor[this.options.armorClass.type] && this.f5.armor[this.options.armorClass.type].allow_bonus) {
                    return true;
                }
                return false;
            },

            getAcRange: function() {
                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type] && 
                    this.f5.armor[this.options.armorClass.type].range &&
                    this.f5.armor[this.options.armorClass.type].range.low &&
                    this.f5.armor[this.options.armorClass.type].range.high
                ) {
                    let arr = [];
                    for(let i = this.f5.armor[this.options.armorClass.type].range.low; i < this.f5.armor[this.options.armorClass.type].range.high+1; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
                return 30;
            },

            getAC: function() {
                let acValue = 0;
                let statBonus = 0;

                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type]
                ) {

                    //set AC value
                    if(this.f5.armor[this.options.armorClass.type].range) {
                        //manual value
                        acValue = parseFloat(this.options.armorClass.manual);

                    } else if(this.f5.armor[this.options.armorClass.type].base) {
                        //base value
                        acValue = this.f5.armor[this.options.armorClass.type].base;
                        if(this.f5.armor[this.options.armorClass.type].bonus && this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]) {
                            //get stat bonus
                            statBonus = this.getAbilityMod(this.f5.armor[this.options.armorClass.type].bonus);
                            if(this.f5.armor[this.options.armorClass.type].max_bonus && statBonus > this.f5.armor[this.options.armorClass.type].max_bonus) {
                                //set to max bonus
                                statBonus = this.f5.armor[this.options.armorClass.type].max_bonus;
                            }
                            acValue += parseFloat(statBonus);
                        }
                    } else {
                        console.error('Couldn\'t calculate AC');
                    }
                    
                    if(this.allowAcBonus && this.options.armorClass.bonus && this.options.armorClass.bonus > 0) {
                        acValue += parseFloat(this.options.armorClass.bonus);
                    }
                    
                    if(this.options.armorClass.shield) {
                        acValue += 2;
                    }

                }
                return acValue;
            },

            acText: function() {
                let acText = '';
                let name = '';
                let acValue = 0;
                let magicalBonus = '';
                let statBonus = 0;
                let stealthDis = '';

                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type]
                ) {
                    //set name
                    if(this.options.armorClass.type === 'custom' && this.options.armorClass.name) {
                        name = this.options.armorClass.name;
                    } else if(this.options.armorClass.type !== 'none' && this.f5.armor[this.options.armorClass.type].name) {
                        name = this.f5.armor[this.options.armorClass.type].name;
                    }

                    //set AC value
                    if(this.f5.armor[this.options.armorClass.type].range) {
                        //manual value
                        acValue = parseFloat(this.options.armorClass.manual);
                        if(this.options.armorClass.stealthDis) {
                            stealthDis = ' ('+this.f5.misc.stealth_dis+')';
                        }

                    } else if(this.f5.armor[this.options.armorClass.type].base) {
                        //base value
                        acValue = this.f5.armor[this.options.armorClass.type].base;
                        if(this.f5.armor[this.options.armorClass.type].bonus && this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]) {
                            //get stat bonus
                            statBonus = this.getAbilityMod(this.f5.armor[this.options.armorClass.type].bonus);
                            if(this.f5.armor[this.options.armorClass.type].max_bonus && statBonus > this.f5.armor[this.options.armorClass.type].max_bonus) {
                                //set to max bonus
                                statBonus = this.f5.armor[this.options.armorClass.type].max_bonus;
                            }
                            acValue += parseFloat(statBonus);
                        }
                        if(this.f5.armor[this.options.armorClass.type].stealth_dis) {
                            stealthDis = ' ('+this.f5.misc.stealth_dis+')';
                        }
                    } else {
                        console.error('Couldn\'t calculate AC');
                    }
                    
                    if(this.allowAcBonus && this.options.armorClass.bonus && this.options.armorClass.bonus > 0) {
                        acValue += parseFloat(this.options.armorClass.bonus);
                        magicalBonus = "+"+this.options.armorClass.bonus+' ';
                    }

                    let shieldText = '';
                    if(this.options.armorClass.shield) {
                        shieldText = ', '+this.f5.misc.shield;
                    }

                    acText = String(acValue);
                    if(magicalBonus || shieldText || name) {
                        acText += ' (' + magicalBonus + name + shieldText + ')';// +stealthDis?;
                    }
                }
                return acText.toLowerCase();
            },

            //Hit Points
            getHP: function() {
                let type = this.options.hitPoints.diceType;
                let amount = this.options.hitPoints.diceAmount;
                let additionalHP = this.options.hitPoints.additional > 0 ? Math.floor(this.options.hitPoints.additional) : 0;
                if(additionalHP > 9999) {
                    this.options.hitPoints.additional = additionalHP = 9999;
                }
                let conMod = this.getAbilityMod('con');
                let conHP = 0;
                if(conMod > 0) {
                    conHP = conMod * amount;
                }
                let hp = (Math.round((type / 2 + .5) * amount) + conHP) + additionalHP;
                return hp;
            },

            hitPointsText: function() {
                let type = this.options.hitPoints.diceType;
                let amount = this.options.hitPoints.diceAmount;
                let additionalHP = this.options.hitPoints.additional > 0 ? Math.floor(this.options.hitPoints.additional) : 0;
                if(additionalHP > 9999) {
                    this.options.hitPoints.additional = additionalHP = 9999;
                }
                let conMod = this.getAbilityMod('con');
                let conHP = 0;
                if(conMod > 0) {
                    conHP = conMod * amount;
                }

                let hp = (Math.round((type / 2 + .5) * amount) + conHP) + additionalHP;
                if(isNaN(hp)) {
                    return this.f5.misc.undefined_health; 
                }
                let conText = '';
                if(conHP > 0) {
                    conText = ' + '+conHP;
                }
                let hpText = hp+' ('+amount + this.f5.misc.die_symbol+type+conText;
                if(additionalHP > 0) {
                    hpText += ' + '+additionalHP;
                }
                hpText += ')';
                return hpText;
            },

            //Damages
            //TODO have a fix for redundancies
            //If in immunity, then remove from resistance and vulnerability
            //If in resistance, then remove from vulnerability
            damageResistanceText: function() {   
                return this.damageList(this.options.damageResistances).toLowerCase();
            },
            damageImmunitiesText: function() { 
                return this.damageList(this.options.damageImmunities).toLowerCase();
            },
            damageVulnerabilitiesText: function() { 
                return this.damageList(this.options.damageVulnerabilites).toLowerCase();
            },
            conditionImmunitiesText: function() {
                return this.conditionList(this.options.conditionImmunities).toLowerCase();
            },
            
            eligableDamageTypes: function() {
                let list = [];
                for(let i in this.f5.damagetypes) {
                    if(
                        this.options.damageResistances.includes(i) ||
                        this.options.damageImmunities.includes(i) ||
                        this.options.damageVulnerabilites.includes(i)
                    ) {
                        list.push({ value: i, label: this.f5.damagetypes[i].name, disabled: true});
                    } else {
                        list.push({ value: i, label: this.f5.damagetypes[i].name});
                    }
                }
                return list;
            },

            dealableDamageTypes: function() {
                let list = [];
                for(let i in this.f5.damagetypes) {
                    if(!(this.f5.damagetypes[i].dealt === false)) {
                        list.push({ value: i, label: this.f5.damagetypes[i].name});
                    }
                }
                
                return list;
            },

            //Speeds
            speedText: function() {
                let displayText = '';
                for(let i in this.options.speeds) {
                    if(!this.options.speeds[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    if(!this.f5.speeds[i]['hide_name']) {
                        displayText += this.f5.speeds[i].name+' ';
                    }
                    displayText += this.options.speeds[i]+' '+this.options.measure.measureUnit; 
                    if(i === 'fly' && this.options.hover) {
                        displayText += ' ('+this.f5.misc.hover+')';
                    }
                }
                if(!displayText) {
                    displayText = this.f5.misc.cant_move;
                }
                return displayText;
            },

            //Senses
            sensesText: function() {                
                let displayText = '';
                for(let i in this.options.senses) {
                    if(!this.options.senses[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    if(!this.f5.senses[i]['hide_name']) {
                        displayText += this.f5.senses[i].name.toLowerCase()+' ';
                    }
                    displayText += this.options.senses[i]+' '+this.options.measure.measureUnit;
                }

                //Passive Perception
                if(this.options.skills.includes('perception')) {
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.f5.misc.passive_skill.replace(':skill', this.f5.skills['perception'].name)+' '+(this.calcSkillMod('perception')+10);
                }
                return displayText;
            },

            //Subtypes
            orderedSubtypes: function() {
                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type]['subtypes']) {
                    let topSubtypes = [];
                    let count = 0;

                    for (let i in this.$data.f5.creaturesubtypes) {
                        
                        let subtypeObj = this.$data.f5.creaturesubtypes[i];
                        subtypeObj.id = i;

                        if(this.$data.f5.creaturetypes[this.options.type]['subtypes'].includes(i)) {
                            topSubtypes.splice(count, 0, subtypeObj);
                            count++;
                        } else {
                            topSubtypes.push(subtypeObj);
                        }
                    }

                    return topSubtypes;
                }
        
                return this.f5.creaturesubtypes;
            },

            //Type Options
            typeCategoryList: function() {
                let optionsList = [];

                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type].hasOwnProperty('options')) {
                    for (let i in this.$data.f5.creaturetypes[this.options.type]['options']) {
                        let data = this.$data.f5.creaturetypes[this.options.type]['options'][i];
                        data.id = i;
                        optionsList.push(data);
                    }
                }

                if(this.$data.f5.creaturesubtypes.hasOwnProperty(this.options.subtype) && this.$data.f5.creaturesubtypes[this.options.subtype].hasOwnProperty('options')) {
                    for (let i in this.$data.f5.creaturesubtypes[this.options.subtype]['options']) {
                        let data = this.$data.f5.creaturesubtypes[this.options.subtype]['options'][i];
                        data.id = i;
                        optionsList.push(data);
                    }
                }

                return optionsList;
            },

            //Languages
            languageText: function() {
                let displayText = '';

                if(this.options.languages.spokenWritten.includes('all')) {
                    return this.$data.f5.languages['all'].name;
                }

                for(let lang of this.options.languages.spokenWritten) {
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.$data.f5.languages[lang].name; 
                }
                if(!displayText) {
                    displayText = this.$data.f5.misc.languages_none;
                }
                return displayText;
            },

            //Skills
            skillText: function() {
                let displayText = '';

                for(let skill in this.$data.f5.skills) {
                    if(!this.options.skills.includes(skill)) {
                        continue;
                    }
                    if(this.calcSkillMod(skill) == 0) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }

                    displayText += this.$data.f5.skills[skill].name + ' '+this.addPlus(this.calcSkillMod(skill)); 
                }
                return displayText;
            },

            //Saving Throw
            savingThrowText: function() {
                let displayText = '';

                for(let i in this.options.savingThrows) {
                    if(!this.options.savingThrows[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }

                    displayText += i.charAt(0).toUpperCase() + i.slice(1) + ' +'+(this.getAbilityMod(i) + this.proficiency); 
                }
                return displayText;
            },

            //
            proficiencyText: function() {
                return "+"+this.proficiency;
            },

            //Challenge Rating
            crText: function() {
                return 'CR ?? (??? XP)';
            },

            ///////////////// NEW FEATURE /////////////////
            newFeatureAttackText: function() {
                let abilityMod = this.getAbilityMod(this.newFeature.attack.ability);
                let displayText = '<span class="i">';
                if(this.newFeature.attack.meleeRanged == 'meleeranged') {
                    displayText += 'Melee or Ranged';
                } else if(this.newFeature.attack.meleeRanged == 'melee') {
                    displayText += 'Melee';
                } else if(this.newFeature.attack.meleeRanged == 'ranged') {
                    displayText += 'Ranged';
                }
                if(this.newFeature.attack.weaponSpell == 'weapon') {
                    displayText += ' Weapon ';
                } else if(this.newFeature.attack.weaponSpell == 'spell') {
                    displayText += ' Spell ';
                }
                displayText += 'Attack:</span> +';
                displayText += (abilityMod+this.proficiency);
                displayText += ' to hit';

                if(this.newFeature.attack.meleeRanged !== 'ranged') {
                    displayText += ', reach '+this.newFeature.attack.reach+' '+this.options.measure.measureUnit;
                    displayText += ', '+this.newFeature.attack.targets+' target';
                    if(this.newFeature.attack.targets !== 1) {
                        displayText += 's';
                    }
                }

                if(this.newFeature.attack.meleeRanged !== 'melee') {
                    displayText += ', range ';
                    displayText += this.newFeature.attack.rangeShort;
                    if(this.newFeature.attack.rangeLong > this.newFeature.attack.rangeShort) {
                        displayText += '/'+this.newFeature.attack.rangeLong;
                    }
                    displayText += ' '+this.options.measure.measureUnit;
                    displayText += ', '+this.newFeature.attack.targets+' target';
                    if(this.newFeature.attack.targets !== 1) {
                        displayText += 's';
                    }
                }

                displayText += '. <span class="i">Hit: </span> (';
                displayText += this.newFeature.attack.diceAmount+'d'+this.newFeature.attack.damageDice;
                if(abilityMod > 0) {
                    displayText += ' + '+abilityMod;
                } else if(abilityMod < 0) {
                    displayText += ' - '+(abilityMod*-1);
                } 
                displayText += ')';

                return displayText;
            },

            newFeatureSpellText: function() {
                let displayText = '';

                return displayText;
            },

            casterLevel: function() {
                let casterLevel = 100;
                //TODO Calculate caster level
                return casterLevel;
            },

            proficiency: function() {
                let proficiency = 2;
                //TODO Calculate proficiency
                return proficiency;
            },
        },

        methods: {

            damageList: function(input) {
                let sortArr = Object.keys(this.f5.damagetypes);
                input.sort((a, b) => sortArr.indexOf(a) - sortArr.indexOf(b));
                let displayText = '';
                for(let i of input) {
                    if(this.f5.damagetypes[i].long_name) {
                        if(displayText !== '') displayText += '; ';
                        displayText += this.f5.damagetypes[i].long_name;
                    } else {
                        if(displayText !== '') displayText += ', ';
                        displayText += this.f5.damagetypes[i].name;
                    }
                }
                return displayText;
            },

            unsetDamages: function(i, type = null) {
                if(type != "resistance" && this.options.damageResistances[i]) {
                    this.options.damageResistances[i] = false;
                }
                if(type != "immunity" && this.options.damageImmunities[i]) {
                    this.options.damageImmunities[i] = false;
                }
                if(type != "vulnerability" && this.options.damageVulnerabilites[i]) {
                    this.options.damageVulnerabilites[i] = false;
                }
            },

            conditionList: function(input) {
                let displayText = '';
                for(let i of input) {                    
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.f5.conditions[i].name;
                }
                return displayText;
            },

            listReturn: function (list) {
                let displayText = '';
                
                if(this.$data.options[list].hasOwnProperty('all')) {
                    return this.$data.f5[list]['all'].name;
                }

                for(let i in this.options[list]) {
                    if(!this.options[list][i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.$data.f5[list][i].name; 
                }
                return displayText;
            },

            generateArmourText: function (item, max) {
                let text = item.name;
                if(item.range && item.range.low && item.range.high) {
                    text += ' ('+item.range.low+'-'+item.range.high+')';
                }
                if(item.base) {
                    text += ' ('+item.base;
                    if(item.bonus) {
                        text += '+'+item.bonus.toUpperCase();
                        if(item.max_bonus) {
                            text += ' - '+max+' '+item.max_bonus;
                        }
                    }
                    text += ')';
                }
                return text;
            }, 

            generateWarnings: function() {
                //Warning for armor that's too heavy 'str_requirement' vs STR
                if(
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type] && 
                    this.f5.armor[this.options.armorClass.type].str_requirement && 
                    this.abilities.str < this.f5.armor[this.options.armorClass.type].str_requirement
                ) {
                    //TODO CREATE WARNING
                }
            },

            calcSkillMod: function (skill) {
                let ability = this.$data.f5.skills[skill].ability;
                let abilityMod = this.getAbilityMod(ability);
                if(this.options.skills.includes(skill)) {
                    abilityMod += this.proficiency;
                }
                return abilityMod;
            },

            calcAbilityMod: function (abilityScore) {
                let mod = Math.floor((abilityScore-10)/2);
                return mod;
            },

            getAbilityMod: function (ability) {
                let score = this.options.abilities[ability];
                return this.calcAbilityMod(score);
            },

            makeSavingThrowDC: function(ability) {
                return (8 + this.proficiency + this.getAbilityMod(ability));
            },

            addPlus: function (number, addSpace = false) {
                let space = addSpace ? ' ' : '';
                if(number > 0) {
                    number = '+'+space+number;
                } else if(number < 0) {
                    if(addSpace) {
                        number = String(number).replace('-','-'+space);
                    }
                }
                return number; 
            },

            getProp: function (obj, prop = 'name') {
                if(obj === undefined) {
                    return '';
                }
                if(obj[prop]) {
                    return obj[prop];
                }
                
                return obj;
            },

            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            createFeature: function(type) {
                let newFeature = {
                    id: this.randChars(15),
                    actionType: type,
                    name: this.f5.misc.title_new_feature,
                    template: 'custom', 
                    attackAbility: 'str',
                    targetType: 'melee',
                    attackType: 'none',
                    attackRange: {'low': 20, 'high': 60},
                    attackReach: 5,
                    attackDamage: [],
                    attackSavingThrow: false,
                    attackTargets: 1,
                    aoeRange: 20,
                    savingThrowMonsterAbility: 'str',
                    savingThrowSaveAbilities: ['str'],
                    savingThrowDamage: [],
                    savingThrowHalfOnSuccess: true,
                    savingThrowConditions: [],
                    hasOngoingDamage: false,
                    ongoingDamage: [],
                    ongoingDamageOccurs: 'start',
                    ongoingDamageRepeatSave: false,
                    ongoingDamageDuration: 'ongoing',
                    recharge: {
                        type: 'none',
                        diceType: 6,
                        minRoll: 5,
                    },
                    spellcastingAbility: 'int',
                    innateSpellcasting: false,
                    addSpellName: 'New Spell',
                    addSpellLevel: 0,
                    addSpellUses: 1,
                    addSpellBeforeCombat: false,
                    addSpellAtWill: false,
                    spellList: {
                        'at_will': {
                            slots: 0,
                            spells: [],
                        },
                        0: {
                            slots: 0,
                            spells: [],
                        },
                        1: {
                            slots: 0,
                            spells: [],
                        },
                        2: {
                            slots: 0,
                            spells: [],
                        },
                        3: {
                            slots: 0,
                            spells: [],
                        },
                        4: {
                            slots: 0,
                            spells: [],
                        },
                        5: {
                            slots: 0,
                            spells: [],
                        },
                        6: {
                            slots: 0,
                            spells: [],
                        },
                        7: {
                            slots: 0,
                            spells: [],
                        },
                        8: {
                            slots: 0,
                            spells: [],
                        },
                        9: {
                            slots: 0,
                            spells: [],
                        },
                    },
                    customDamage: [],
                    customDescription: '',
                    legendaryActionCost: 1,
                    manualDPR: -1,
                    averageDPR: -1,
                };

                newFeature.attackDamage.push(this.createDamageDie(true));
                newFeature.savingThrowDamage.push(this.createDamageDie());
                newFeature.ongoingDamage.push(this.createDamageDie());

                if(type === 'spellcasting') {
                    newFeature.template = 'spellcasting';
                    newFeature.name = this.f5.misc.title_spellcasting;
                }

                this.options.features[type].push(newFeature);
            },

            removeFeature: function(type, id) {
                for(let i in this.options.features[type]) {
                    if(this.options.features[type][i].id === id) {
                        this.options.features[type].splice(i, 1);
                        return;
                    }
                }
            },

            createDamageDie: function(setAbilityBonus = false) {
                return {
                    diceType: 4,
                    diceAmount: 1,
                    additional: 0,
                    abilityBonus: setAbilityBonus,
                    type: 'slashing',
                }
            },

            averageDamage: function(damageObj, ability) {
                let abilityDamage = 0;
                if(damageObj.abilityBonus) {
                    abilityDamage = Number(this.getAbilityMod(ability));
                }
                let damage = Math.floor(((damageObj.diceType / 2) + .5) * damageObj.diceAmount) + (Number(damageObj.additional) + Number(abilityDamage));
                return damage > 0 ? damage : 1;
            },

            createDamageText: function(damageObj, ability) {
                let descText = '';
                if(damageObj.diceAmount > 0) {
                    descText += this.averageDamage(damageObj, ability);
                    descText += ' ('+this.$data.f5.misc.die_structure.replace(':die_amount', damageObj.diceAmount).replace(':die_type', damageObj.diceType);

                    let additionalDamage = Number(damageObj.additional);
                    if(damageObj.abilityBonus) {
                        additionalDamage += this.getAbilityMod(ability);
                    }
                    if(additionalDamage != 0) {
                        descText += ' '+this.addPlus(additionalDamage, true);
                    }

                    descText += ') ';
                } else {
                    descText = damageObj.additional+' ';
                }
                descText += this.$data.f5.misc.damage.replace(':type', this.$data.f5.damagetypes[damageObj.type].name.toLowerCase());
                return descText;
            },

            randChars: function(len) {
                const base = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvyxyz0123456789"];
                const generator = (base, len) => {
                    return [...Array(len)]
                      .map(i => base[Math.random()*base.length|0])
                      .join('');
                };
                return generator(base, len);
            },

            createSentenceList: function(input, inclusive = true, modifierFunction = null) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    //TODO this might need to change in other languages
                    if(descText) {
                        if(len > 2) {
                            descText += this.f5.misc.sentence_list_separator+' ';
                        }
                        if(i == len-1) {
                            if(inclusive) {
                                descText += ' '+this.f5.misc.and+' ';
                            } else {
                                descText += ' '+this.f5.misc.or+' ';
                            }
                        }
                    }
                    if(modifierFunction != null && typeof modifierFunction === 'function') {
                        descText += modifierFunction(input[i]);
                    } else {
                        descText += input[i];
                    }
                }
                return descText;
            },

            createConditionSentenceList: function(input, inclusive = true) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    //TODO this might need to change in other languages
                    if(descText) {
                        if(len > 2) {
                            descText += this.f5.misc.sentence_list_separator+' ';
                        }
                        if(i == len-1) {
                            if(inclusive) {
                                descText += ' '+this.f5.misc.and+' ';
                            } else {
                                descText += ' '+this.f5.misc.or+' ';
                            }
                        }
                    }
                    descText += input[i];
                }
                return descText;
            },

            createSimpleList: function(input) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    if(descText) {
                        descText += this.f5.misc.sentence_list_separator+' ';
                    }
                    descText += input[i];
                }
                return descText;
            },

            translate: function(str, pluralCount = 1) {
                let pluralBreak = str.indexOf('|');
                let retStr = str;
                if(pluralCount == 0 || pluralCount > 1) {
                    retStr = str.substr(pluralBreak+1);
                } else {
                    retStr = str.substr(0, pluralBreak);
                }
                return retStr;
            },

            ordinalNumber: function(num) {
                let ordinal = '';
                let lastDigit = String(num).charAt(-1);

                if(lastDigit === 1 && num != 11) {
                    ordinal = this.f5.misc.ordinal_1;
                } else if(lastDigit === 2 && num != 12) {
                    ordinal = this.f5.misc.ordinal_2;
                } else if(lastDigit === 3 && num != 13) {
                    ordinal = this.f5.misc.ordinal_3;
                } else {
                    ordinal = this.f5.misc.ordinal_other;
                }

                return String(num)+ordinal;
            }, 

            determineIndefiniteArticle: function(str) {
                let vowels = ['a', 'e', 'i', 'o', 'u'];
                let vowelNumbers = [1,8,11,18]; //ignoring 80+
                let firstChar = String(str).charAt(0).toLowerCase();
                if(
                    vowels.includes(firstChar) ||
                    vowelNumbers.includes(Number(str))
                ) {
                    return this.f5.misc.indefinite_article_an;
                } else {
                    return this.f5.misc.indefinite_article_a;
                }
            },
        }
    });

    app.createFeature('passives');
    app.createFeature('actions');
    app.createFeature('bonusActions');
    app.createFeature('reactions');
    app.createFeature('legendaryActions');
    app.createFeature('mythicActions');
    app.createFeature('lairActions');

    return app;

}