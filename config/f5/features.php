<?php

return [

    'multiattack' => [
        'name' => 'f5/features.name_multiattack',
        'desc' => 'f5/features.desc_multiattack',
        'action_type' => 'action',
        'combine_nonpassives' => true,
        'references' => ['spellcasting', 'action', 'bonus_action'],
    ],

    //Passive
    'spellcasting' => [
        'name' => 'f5/features.name_spellcasting',
        'desc' => 'f5/features.desc_spellcasting',
        'action_type' => 'passive',
        'has_spell_list' => true,
        'template' => 'spellcasting', 
    ],

    'innate_spellcasting' => [
        'name' => 'f5/features.name_innate_spellcasting',
        'desc' => 'f5/features.desc_innate_spellcasting',
        'action_type' => 'passive',
        'has_spell_list' => true,
        'template' => 'spellcasting', 
    ],

    'legendary_resistance' => [
        'name' => 'f5/features.name_legendary_resistance',
        'desc' => 'f5/features.desc_legendary_resistance',
        'action_type' => 'passive',
        'template' => 'legendary_resistance', 
    ],

    'magic_resistance' => [
        'name' => 'f5/features.title_magic_resistance_feature_name',
        'desc' => 'f5/features.magic_resistance_desc',
        'action_type' => 'passive',
        'template' => 'magic_resistance', 
    ],
    
    'regenerate' => [
        'name' => 'f5/features.name_legendary_resistance',
        'desc' => 'f5/features.desc_legendary_resistance',
        'action_type' => 'passive',
        'template' => 'regenerate', 
        'passiveTrigger' => 'start_of_turn'
    ],

    'amphibious' => [
        'name' => 'f5/features.name_amphibious',
        'desc' => 'f5/features.desc_amphibious',
        'action_type' => 'passive',
        'template' => 'custom', 
    ],

    'immutable_form' => [
        'name' => 'f5/features.name_immutable_form',
        'desc' => 'f5/features.desc_immutable_form',
        'action_type' => 'passive',
        'template' => 'custom', 
    ],

    'breath_water' => [
        'name' => 'f5/features.name_breath_water',
        'desc' => 'f5/features.desc_breath_water',
        'action_type' => 'passive',
        'template' => 'custom', 
    ],

    'fey_ancestry' => [
        'name' => 'f5/features.name_fey_ancestry',
        'desc' => 'f5/features.desc_fey_ancestry',
        'action_type' => 'passive',
        'template' => 'custom', 
    ],

    'stout_resilience' => [
        'name' => 'f5/features.name_stout_resilience',
        'desc' => 'f5/features.desc_stout_resilience',
        'action_type' => 'passive',
        'template' => 'custom', 
    ],

    'breath_weapon' => [
        'name' => 'f5/features.name_breath_weapon',
        'desc' => 'f5/features.desc_breath_weapon',
        'action_type' => 'action',
        'template' => 'saving_throw', 
        'targetType' => 'cone',
        'savingThrowMonsterAbility' => 'con',
        'savingThrowSaveAbilities' => ['dex'],
        'savingThrowHalfOnSuccess' => true,
        'recharge' => [
            'type' => 'dice_roll',
            'diceType' => 6,
            'minRoll' => 5,
            'uses' => 1,
        ],
        'cr_scaling' => [
            0 => [
                'aoeRange' => 15,
                'savingThrowDamage' => [
                    [
                        'diceType' => 6,
                        'diceAmount' => 6,
                        'additional' => 0,
                        'abilityBonus' => false,
                        'type' => ':affinity_elemental',
                    ]
                ],
            ], 
            10 => [
                'aoeRange' => 30,
                'savingThrowDamage' => [
                    [
                        'diceType' => 6,
                        'diceAmount' => 15,
                        'additional' => 0,
                        'abilityBonus' => false,
                        'type' => ':affinity_elemental',
                    ]
                ],
            ],
            15 => [
                'aoeRange' => 60,
                'savingThrowDamage' => [
                    [
                        'diceType' => 6,
                        'diceAmount' => 18,
                        'additional' => 0,
                        'abilityBonus' => false,
                        'type' => ':affinity_elemental',
                    ]
                ],
            ],
            20 => [
                'aoeRange' => 90,
                'savingThrowDamage' => [
                    [
                        'diceType' => 6,
                        'diceAmount' => 25,
                        'additional' => 0,
                        'abilityBonus' => false,
                        'type' => ':affinity_elemental',
                    ]
                ],
            ],
        ]
    ],

    'wing_attack' => [
        'name' => 'f5/features.name_wing_attack',
        'desc' => 'f5/features.desc_wing_attack',
        'action_type' => 'action',
        'template' => 'attack', 
    ],

    'tail_attack' => [
        'name' => 'f5/features.name_tail_attack',
        'desc' => 'f5/features.desc_tail_attack',
        'action_type' => 'action',
        'template' => 'attack', 
    ],

    //Attacks
    'melee_attack' => [
        'name' => 'f5/features.name_melee_attack',
        'action_type' => 'action',
        'attack_roll' => true,
        'range' => 'melee',
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

    //Saving Throws
    'saving_throw' => [
        'name' => 'f5/features.name_saving_throw',
        'desc' => 'f5/features.desc_saving_throw',
        'action_type' => 'action',
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
        'action_type' => 'legendary_action',
    ],


];