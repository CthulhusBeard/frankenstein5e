<?php 

return [
    //Ref DMG 284 
    //10    1,2,3,5,6,8,10,11,12,15
    //6     1,2,4,6,7,8,11,12,13,14

    'at_will' => [
        'name' => 'f5/spells.title_at_will',
        'display' => false,
    ],
    '0' => [
        'name' => 'f5/spells.cantrip',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 1,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 1,
        ],
        'level_scaling' => [
            1 => 1,
            5 => 2,
            11 => 3,
            17 => 4,
        ],
    ],
    '1' => [
        'name' => 'f5/spells.level_one',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 2,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 2,
        ],
    ],
    '2' => [
        'name' => 'f5/spells.level_two',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 3,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 4,
        ],
    ],
    '3' => [
        'name' => 'f5/spells.level_three',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 5,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 6,
        ],
    ],
    '4' => [
        'name' => 'f5/spells.level_four',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 6,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 7,
        ],
    ],
    '5' => [
        'name' => 'f5/spells.level_five',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 8,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 8,
        ],
    ],
    '6' => [
        'name' => 'f5/spells.level_six',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 10,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 11,
        ],
    ],
    '7' => [
        'name' => 'f5/spells.level_seven',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 11,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 12,
        ],
    ],
    '8' => [
        'name' => 'f5/spells.level_eight',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 12,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 13,
        ],
    ],
    '9' => [
        'name' => 'f5/spells.level_nine',
        'damage_single_target' => [
            'diceType' => 10,
            'diceAmount' => 15,
        ],
        'damage_multiple' => [
            'diceType' => 6,
            'diceAmount' => 14,
        ],
    ],
];