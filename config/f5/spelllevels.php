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
        'average_damage' => 3,
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
        'average_damage' => 7,
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
        'average_damage' => 9,
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
        'average_damage' => 14,
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
        'average_damage' => 18,
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
        'average_damage' => 30,
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
        'average_damage' => 35,
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
        'average_damage' => 40,
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
        'average_damage' => 45,
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
        'average_damage' => 90,
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