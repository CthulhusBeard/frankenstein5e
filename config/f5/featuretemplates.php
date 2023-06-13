<?php

return [
    'attack' => [
        'name' => 'f5/featuretemplates.attack',
        'can_recharge' => true,
        'can_regenerate' => true,
        'action_options' => [
            'action',
            'bonus_action',
            'reaction',
            'legendary_action',
            'mythic_action',
            'custom',
        ],
    ],
    'saving_throw' => [
        'name' => 'f5/featuretemplates.saving_throw',
        'can_recharge' => true,
        'can_regenerate' => true,
        'action_options' => [
            'action',
            'bonus_action',
            'reaction',
            'legendary_action',
            'mythic_action',
            'lair_action',
            'custom',
        ],
    ],
    'spellcasting' => [
        'name' => 'f5/featuretemplates.spellcasting',
        'no_trigger' => true,
        'action_options' => [
            'spellcasting',
        ],
    ],
    'multiattack' => [
        'name' => 'f5/featuretemplates.multiattack',
        'can_recharge' => true,
        'action_options' => [
            'multiattack',
        ],
    ],
    'reference' => [
        'name' => 'f5/featuretemplates.reference',
        'action_options' => [
            'legendary_action',
            'mythic_action',
        ],
    ],
    'regenerate' => [
        'name' => 'f5/featuretemplates.regenerate',
        'can_recharge' => true,
        'can_regenerate' => true,
        'action_options' => [
            'passive',
            'action',
            'bonus_action',
            'reaction',
            'legendary_action',
            'mythic_action',
            'lair_action',
        ],
    ],
    'legendary_resistance' => [
        'name' => 'f5/featuretemplates.legendary_resistance',
        'title' => 'f5/featuretemplates.title_legendary_resistance_feature_name',
        'desc' => 'f5/featuretemplates.legendary_resistance_desc',
        'allow_custom_name' => false,
        'no_trigger' => true,
        'action_options' => [
            'passive',
        ],
    ],
    'magic_resistance' => [
        'name' => 'f5/featuretemplates.magic_resistance',
        'title' => 'f5/featuretemplates.title_magic_resistance_feature_name',
        'desc' => 'f5/featuretemplates.magic_resistance_desc',
        'allow_custom_name' => false,
        'no_trigger' => true,
        'action_options' => [
            'passive',
        ],
    ],
    'custom' => [
        'name' => 'f5/featuretemplates.custom',
        'no_trigger' => true,
        'action_options' => [
            'passive',
            'action',
            'bonus_action',
            'reaction',
            'legendary_action',
            'mythic_action',
            'lair_action',
        ],
    ],
];