<?php

return [
    'melee' => [
        'name' => 'f5/ranges.melee',
        'range' => [5, 10, 15, 20],
        'types' => ['attack', 'saving_throw'],
        'rank' => 1,
    ],
    'ranged' => [
        'name' => 'f5/ranges.ranged',
        'range' => [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 175, 200, 250, 300],
        'types' => ['attack', 'saving_throw'],
        'rank' => 1,
    ],
    'melee_or_ranged' => [
        'name' => 'f5/ranges.melee_or_ranged',
        'range' => [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 175, 200, 250, 300],
        'types' => ['attack', 'saving_throw'],
        'rank' => 1,
    ],
    'line' => [
        'name' => 'f5/ranges.line',
        'range' => [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 175, 200, 250, 300],
        'types' => ['saving_throw'],
        'rank' => 2,
    ],
    'cone' => [
        'name' => 'f5/ranges.cone',
        'range' => [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 175, 200, 250, 300],
        'types' => ['saving_throw'],
        'rank' => 3,
    ],
    'cube' => [
        'name' => 'f5/ranges.cube',
        'range' => [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 175, 200, 250, 300],
        'types' => ['saving_throw'],
        'rank' => 4,
    ],
    'sphere' => [
        'name' => 'f5/ranges.sphere',
        'range' => [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 175, 200, 250, 300],
        'types' => ['saving_throw'],
        'rank' => 4,
    ],
];