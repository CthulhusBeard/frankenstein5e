<?php 

$d6 = 6/2 + 1;
$d10 = 10/2 + 1;

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
        'one_target' => $d10* 1, 
        'multiple_targets' => $d6 * 1,
    ],
    '1' => [
        'name' => 'f5/spells.level_one',
        'average_damage' => 7,
        'one_target' => $d10* 2,
        'multiple_targets' => $d6 * 2,
    ],
    '2' => [
        'name' => 'f5/spells.level_two',
        'average_damage' => 9,
        'one_target' => $d10* 3,
        'multiple_targets' => $d6 * 4,
    ],
    '3' => [
        'name' => 'f5/spells.level_three',
        'average_damage' => 14,
        'one_target' => $d10* 5,
        'multiple_targets' => $d6 * 6,
    ],
    '4' => [
        'name' => 'f5/spells.level_four',
        'average_damage' => 18,
        'one_target' => $d10* 6,
        'multiple_targets' => $d6 * 7,
    ],
    '5' => [
        'name' => 'f5/spells.level_five',
        'average_damage' => 30,
        'one_target' => $d10* 8,
        'multiple_targets' => $d6 * 8,
    ],
    '6' => [
        'name' => 'f5/spells.level_six',
        'average_damage' => 35,
        'one_target' => $d10* 10,
        'multiple_targets' => $d6 * 11,
    ],
    '7' => [
        'name' => 'f5/spells.level_seven',
        'average_damage' => 40,
        'one_target' => $d10* 11,
        'multiple_targets' => $d6 * 12,
    ],
    '8' => [
        'name' => 'f5/spells.level_eight',
        'average_damage' => 45,
        'one_target' => $d10* 12,
        'multiple_targets' => $d6 * 13,
    ],
    '9' => [
        'name' => 'f5/spells.level_nine',
        'average_damage' => 90,
        'one_target' => $d10* 15,
        'multiple_targets' => $d6 * 14,
    ],
];