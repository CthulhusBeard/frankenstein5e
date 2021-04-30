<?php

return [
    'custom' => [
        'name' => 'f5/armor.custom',
        'type' => 'custom',
        'range' => [
            'low' => 0,
            'high' => 30,
        ],
        'allow_bonus' => true,
    ],

    'none' => [
        'name' => 'f5/armor.none',
        'type' => 'none',
        'base' => 10,
        'bonus' => 'dex',
    ],

    'natural' => [
        'name' => 'f5/armor.natural',
        'type' => 'natural',
        'range' => [
            'low' => 10,
            'high' => 25
        ],
    ],

    'padded' => [
        'name' => 'f5/armor.padded',
        'type' => 'light',
        'base' => 11,
        'bonus' => 'dex',
        'stealth_dis' => true,
        'allow_bonus' => true,
    ],

    'leather' => [
        'name' => 'f5/armor.leather',
        'type' => 'light',
        'base' => 11,
        'bonus' => 'dex',
        'allow_bonus' => true,
    ],

    'studded_leather' => [
        'name' => 'f5/armor.studded_leather',
        'type' => 'light',
        'base' => 11,
        'bonus' => 'dex',
        'allow_bonus' => true,
    ],

    'hide' => [
        'name' => 'f5/armor.hide',
        'type' => 'medium',
        'base' => 12,
        'bonus' => 'dex',
        'max_bonus' => 2,
        'allow_bonus' => true,
    ],

    'chain_shirt' => [
        'name' => 'f5/armor.chain_shirt',
        'type' => 'medium',
        'base' => 13,
        'bonus' => 'dex',
        'max_bonus' => 2,
        'allow_bonus' => true,
    ],

    'scale_mail' => [
        'name' => 'f5/armor.scale_mail',
        'type' => 'medium',
        'base' => 14,
        'bonus' => 'dex',
        'max_bonus' => 2,
        'stealth_dis' => true,
        'allow_bonus' => true,
    ],

    'breastplate' => [
        'name' => 'f5/armor.breastplate',
        'type' => 'medium',
        'base' => 14,
        'bonus' => 'dex',
        'max_bonus' => 2,
        'allow_bonus' => true,
    ],

    'half_plate' => [
        'name' => 'f5/armor.half_plate',
        'type' => 'medium',
        'base' => 15,
        'bonus' => 'dex',
        'max_bonus' => 2,
        'stealth_dis' => true,
        'allow_bonus' => true,
    ],

    'ring_mail' => [
        'name' => 'f5/armor.ring_mail',
        'type' => 'heavy',
        'base' => 14,
        'stealth_dis' => true,
        'allow_bonus' => true,
    ],

    'chain_mail' => [
        'name' => 'f5/armor.chain_mail',
        'type' => 'heavy',
        'base' => 16,
        'stealth_dis' => true,
        'str_requirement' => 13,
        'allow_bonus' => true,
    ],

    'splint' => [
        'name' => 'f5/armor.splint',
        'type' => 'heavy',
        'base' => 17,
        'stealth_dis' => true,
        'str_requirement' => 15,
        'allow_bonus' => true,
    ],

    'plate' => [
        'name' => 'f5/armor.plate',
        'type' => 'heavy',
        'base' => 18,
        'stealth_dis' => true,
        'str_requirement' => 15,
        'allow_bonus' => true,
    ],

];
