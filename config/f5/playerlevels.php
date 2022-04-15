<?php

function avgHP($lvl) {
    $con = 1;
    $hitdice = 8;
    $hp = $hitdice + $con + ((($hitdice/2+1) + $con) * $lvl);
}

return [
    1 => [
        'average_dpr' => 9,
        'average_hp' => avgHP(1),
    ],
    2 => [
        'average_dpr' => 12, 
        'average_hp' => avgHP(2),
    ],
    3 => [
        'average_dpr' => 14, 
        'average_hp' => avgHP(3),
    ],
    4 => [
        'average_dpr' => 18, 
        'average_hp' => avgHP(4),
    ],
    5 => [
        'average_dpr' => 31, 
        'average_hp' => avgHP(5),
    ],
    6 => [
        'average_dpr' => 32, 
        'average_hp' => avgHP(6),
    ],
    7 => [
        'average_dpr' => 33, 
        'average_hp' => avgHP(7),
    ],
    8 => [
        'average_dpr' => 37, 
        'average_hp' => avgHP(8),
    ],
    9 => [
        'average_dpr' => 39, 
        'average_hp' => avgHP(9),
    ],
    10 => [
        'average_dpr' => 40, 
        'average_hp' => avgHP(10),
    ],
    11 => [
        'average_dpr' => 46, 
        'average_hp' => avgHP(11),
    ],
    12 => [
        'average_dpr' => 48, 
        'average_hp' => avgHP(12),
    ],
    13 => [
        'average_dpr' => 50, 
        'average_hp' => avgHP(13),
    ],
    14 => [
        'average_dpr' => 51, 
        'average_hp' => avgHP(14),
    ],
    15 => [
        'average_dpr' => 53, 
        'average_hp' => avgHP(15),
    ],
    16 => [
        'average_dpr' => 55, 
        'average_hp' => avgHP(16),
    ],
    17 => [
        'average_dpr' => 70, 
        'average_hp' => avgHP(17),
    ],
    18 => [
        'average_dpr' => 72, 
        'average_hp' => avgHP(18),
    ],
    19 => [
        'average_dpr' => 74, 
        'average_hp' => avgHP(19),
    ],
    20 => [
        'average_dpr' => 79, 
        'average_hp' => avgHP(20),
    ],
];