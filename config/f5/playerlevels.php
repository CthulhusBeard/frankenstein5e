<?php

$con = 2;
$hitdice = 8;

return [
    1 => [
        'average_dpr' => 9,
        'average_hp' => ((1 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 4,
        'proficiency' => 2,
    ],
    2 => [
        'average_dpr' => 12, 
        'average_hp' => ((2 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 4,
        'proficiency' => 2,
    ],
    3 => [
        'average_dpr' => 14, 
        'average_hp' => ((3 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 4,
        'proficiency' => 2,
    ],
    4 => [
        'average_dpr' => 18, 
        'average_hp' => ((4 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 2,
    ],
    5 => [
        'average_dpr' => 31, 
        'average_hp' => ((5 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 3,
    ],
    6 => [
        'average_dpr' => 32, 
        'average_hp' => ((6 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 3,
    ],
    7 => [
        'average_dpr' => 33, 
        'average_hp' => ((7 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 3,
    ],
    8 => [
        'average_dpr' => 37, 
        'average_hp' => ((8 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 3,
    ],
    9 => [
        'average_dpr' => 39, 
        'average_hp' => ((9 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 4,
    ],
    10 => [
        'average_dpr' => 40, 
        'average_hp' => ((10 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 4,
    ],
    11 => [
        'average_dpr' => 46, 
        'average_hp' => ((11 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 4,
    ],
    12 => [
        'average_dpr' => 48, 
        'average_hp' => ((12 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 4,
    ],
    13 => [
        'average_dpr' => 50, 
        'average_hp' => ((13 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 5,
    ],
    14 => [
        'average_dpr' => 51, 
        'average_hp' => ((14 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 5,
    ],
    15 => [
        'average_dpr' => 53, 
        'average_hp' => ((15 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 5,
    ],
    16 => [
        'average_dpr' => 55, 
        'average_hp' => ((16 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 5,
    ],
    17 => [
        'average_dpr' => 70, 
        'average_hp' => ((17 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 6,
    ],
    18 => [
        'average_dpr' => 72, 
        'average_hp' => ((18 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 6,
    ],
    19 => [
        'average_dpr' => 74, 
        'average_hp' => ((19 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 5,
        'proficiency' => 6,
    ],
    20 => [
        'average_dpr' => 79, 
        'average_hp' => ((20 - 1) * (($hitdice/2+1) + $con)) + $hitdice + $con,
        'average_modifier' => 6,
        'proficiency' => 6,
    ],
];