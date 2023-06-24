<?php

return [

    'multiattack' => [
        'name' => 'f5/features.name_multiattack',
        'desc' => 'f5/features.desc_multiattack',
        'actionType' => 'action',
        'combine_nonpassives' => true,
        'references' => ['spellcasting', 'action', 'bonus_action'],
    ],

    //Passive
    'spellcasting' => [
        'name' => 'f5/features.name_spellcasting',
        'desc' => 'f5/features.desc_spellcasting',
        'actionType' => 'spellcasting',
        'has_spell_list' => true,
        'template' => 'spellcasting', 
    ],

    'innate_spellcasting' => [
        'name' => 'f5/features.name_innate_spellcasting',
        'desc' => 'f5/features.desc_innate_spellcasting',
        'actionType' => 'spellcasting',
        'has_spell_list' => true,
        'template' => 'spellcasting', 
        'spellcasting' => [
            'ability' => 'cha',
            'innate' => true,
        ],
    ],

    'innate_spellcasting_con' => [
        'name' => 'f5/features.name_innate_spellcasting',
        'desc' => 'f5/features.desc_innate_spellcasting',
        'actionType' => 'spellcasting',
        'has_spell_list' => true,
        'template' => 'spellcasting', 
        'spellcasting' => [
            'ability' => 'con',
            'innate' => true,
        ],
    ],

    'legendary_resistance' => [
        'name' => 'f5/features.name_legendary_resistance',
        'desc' => 'f5/features.desc_legendary_resistance',
        'actionType' => 'passive',
        'template' => 'legendary_resistance', 
    ],

    'magic_resistance' => [
        'name' => 'f5/features.title_magic_resistance_feature_name',
        'desc' => 'f5/features.magic_resistance_desc',
        'actionType' => 'passive',
        'template' => 'magic_resistance', 
    ],
    
    'regenerate' => [
        'name' => 'f5/features.name_legendary_resistance',
        'desc' => 'f5/features.desc_legendary_resistance',
        'actionType' => 'passive',
        'template' => 'regenerate', 
        'passiveTrigger' => 'start_of_turn'
    ],

    'amphibious' => [
        'name' => 'f5/features.name_amphibious',
        'desc' => 'f5/features.desc_amphibious',
        'actionType' => 'passive',
        'template' => 'custom', 
    ],

    'immutable_form' => [
        'name' => 'f5/features.name_immutable_form',
        'desc' => 'f5/features.desc_immutable_form',
        'actionType' => 'passive',
        'template' => 'custom', 
    ],

    'breath_water' => [
        'name' => 'f5/features.name_breath_water',
        'desc' => 'f5/features.desc_breath_water',
        'actionType' => 'passive',
        'template' => 'custom', 
    ],

    'fey_ancestry' => [
        'name' => 'f5/features.name_fey_ancestry',
        'desc' => 'f5/features.desc_fey_ancestry',
        'actionType' => 'passive',
        'template' => 'custom', 
    ],

    'stout_resilience' => [
        'name' => 'f5/features.name_stout_resilience',
        'desc' => 'f5/features.desc_stout_resilience',
        'actionType' => 'passive',
        'template' => 'custom', 
    ],

    'sunlight_sensitivity' => [
        'name' => 'f5/features.name_sunlight_sensitivity',
        'desc' => 'f5/features.desc_sunlight_sensitivity',
        'actionType' => 'passive',
        'template' => 'custom', 
    ],

    'breath_weapon' => [
        'name' => 'f5/features.name_breath_weapon',
        'desc' => 'f5/features.desc_breath_weapon',
        'actionType' => 'action',
        'template' => 'saving_throw', 
        'targetType' => 'cone',
        'savingThrow' => [
            'monsterAbility' => 'con'
        ],
        'savingThrow' => [
            'saveAbilities' => ['dex']
        ],
        'recharge' => [
            'type' => 'dice_roll',
            'diceType' => 6,
            'minRoll' => 5,
            'uses' => 1,
        ],
        'cr_scaling' => [
            0 => [
                'aoeRange' => 15,
                'savingThrow' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 6,
                            'additional' => 0,
                            'abilityBonus' => false,
                            'type' => ':affinity_elemental',
                        ],
                    ],
                ],
            ], 
            10 => [
                'aoeRange' => 30,
                'savingThrow' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 15,
                            'additional' => 0,
                            'abilityBonus' => false,
                            'type' => ':affinity_elemental',
                        ]
                    ],
                ],
            ],
            15 => [
                'aoeRange' => 60,
                'savingThrow' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 18,
                            'additional' => 0,
                            'abilityBonus' => false,
                            'type' => ':affinity_elemental',
                        ]
                    ],
                ],
            ],
            20 => [
                'aoeRange' => 90,
                'savingThrow' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 25,
                            'additional' => 0,
                            'abilityBonus' => false,
                            'type' => ':affinity_elemental',
                        ]
                    ],
                ],
            ],
        ]
    ],

    'wing_attack' => [
        'name' => 'f5/features.name_wing_attack',
        'desc' => 'f5/features.desc_wing_attack',
        'actionType' => 'action',
        'template' => 'attack', 
    ],

    'tail_attack' => [
        'name' => 'f5/features.name_tail_attack',
        'desc' => 'f5/features.desc_tail_attack',
        'actionType' => 'action',
        'template' => 'attack', 
    ],

    //Attacks
    'melee_attack' => [
        'name' => 'f5/features.name_melee_attack',
        'actionType' => 'action',
        'template' => 'attack',
        'cr_scaling' => [
            0 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 1,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            5 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 2,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            10 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 3,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            15 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 4,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            20 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 5,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
        ],
        'examples' => [
            'shortsword' => [
                'name' => 'f5/features.name_shortsword',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'slashing'
                ],
            ],
            'claws' => [
                'name' => 'f5/features.name_claws',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'slashing'
                ],
            ],
            'bite' => [
                'name' => 'f5/features.name_bite',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'piercing'
                ],
            ],
        ],
    ],

    'ranged_attack' => [
        'name' => 'f5/features.name_melee_attack',
        'actionType' => 'action',
        'template' => 'attack',
        'cr_scaling' => [
            0 => [
                'attack' => [
                    'range' => [
                        'low' => 20, 
                        'high' => 60
                    ],
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 1,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            5 => [
                'attack' => [
                    'range' => [
                        'low' => 30, 
                        'high' => 120
                    ],
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 2,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            10 => [
                'attack' => [
                    'range' => [
                        'low' => 80, 
                        'high' => 320
                    ],
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 3,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            15 => [
                'attack' => [
                    'range' => [
                        'low' => 80, 
                        'high' => 320
                    ],
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 4,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            20 => [
                'attack' => [
                    'range' => [
                        'low' => 120, 
                        'high' => 600
                    ],
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 5,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
        ],
        'examples' => [
            'shortbow' => [
                'name' => 'f5/features.name_shortbow',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'piercing'
                ],
            ],
            'crossbow' => [
                'name' => 'f5/features.name_crossbow',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'piercing'
                ],
            ],
        ],
    ],


    //Saving Throws
    'saving_throw' => [
        'name' => 'f5/features.name_saving_throw',
        'desc' => 'f5/features.desc_saving_throw',
        'actionType' => 'action',
        'saving_throw' => true,
        'repeat_save' => [
            'enabled' => true,
            'duration' => 'end_of_turn',
        ],
        'immunity' => [
            'enabled' => true,
            'duration' => 'one_day',
        ],
        'examples' => [
            'frightful_presence' => [
                'name' => 'feature_name_frightful_presence',
                'ability' => 'wis',
            ],
        ],
    ],

    //Basic
    'use_a_skill' => [
        'name' => 'f5/features.name_use_a_skill',
        'desc' => 'f5/features.desc_use_a_skill',
        'actionType' => 'legendary_action',
    ],

    //Legendary Actions
    'legendary_melee_attack' => [
        'name' => 'f5/features.name_melee_attack',
        'actionType' => 'legendary_action',
        'template' => 'attack',
        
        'cr_scaling' => [
            0 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 1,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            5 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 2,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            10 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 3,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            15 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 4,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
            20 => [
                'attack' => [
                    'damage' => [
                        [
                            'diceType' => 6,
                            'diceAmount' => 5,
                            'additional' => 0,
                            'abilityBonus' => true,
                            'type' => 'slashing'
                        ],
                    ],
                ],
            ],
        ],

        'examples' => [
            'claws' => [
                'name' => 'f5/features.name_claws',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'slashing'
                ],
            ],
            'bite' => [
                'name' => 'f5/features.name_bite',
                'tags' => [],
                'default' => [
                    'primary_damage' => 'piercing'
                ],
            ],
        ],
    ],

    'multiattack' => [
        'name' => 'f5/features.name_multiattack',
        'actionType' => 'action',
        'template' => 'multiattack',
        'multiattackReferences' => [
            [
                ['id' => null, 'uses' => 2]
            ],
            []
        ],
    ],


];