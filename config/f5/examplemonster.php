<?php

return [
    'name' => 'Monster',
    'size' => 'huge',
    'creature_type' => 'monstrosity',
    'alignment' => 'lawful_evil',
    'armour_class' => [
        'type' => 'natural',
        'ac' => 19,
    ],
    'hp' => 100,
    'speed' => [
        'walk' => 30,
        'fly' => 60,
        'burrow' => 20,
    ],
    'abilities' => [
        'str' => 23,
        'dex' => 15,
        'con' => 12,
        'int' => 17,
        'wis' => 21,
        'cha' => 2,
    ],
    'senses' => [
        'darkvision' => 10,
        'tremor' => 20,
        'blindsight' => 5,
    ],
    'features' => [
        [
            'name' => 'Innate Spellcasting (Psionics)',
            'action_type' => 'passive',
            'text' => 'The dragon\'s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:',
            'spell_list' => ['Fireball', 'Wish', 'Power Word: Kill'],
        ],
    ],
];