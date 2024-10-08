<?php

return [
    'tiny' => [
        'name' => 'f5/sizes.tiny',
        'space' => 2.5,
        'hit_dice' => 4,
        'tags' => [
            // 'stats' => [
            //     'low_str',
            //     'high_dex',
            // ],
            'hit_dice' => [
                'data' => 4,
                'name' => 'f5/sizes.hit_dice_size_4',
            ],
        ]
    ],
    'small' => [
        'name' => 'f5/sizes.small',
        'space' => 5,
        'hit_dice' => 6,
        'tags' => [
            'hit_dice' => [
                'data' => 6,
                'name' => 'f5/sizes.hit_dice_size_6',
            ],
        ],
    ],
    'medium' => [
        'name' => 'f5/sizes.medium',
        'space' => 5,
        'hit_dice' => 8,
        'tags' => [
            'hit_dice' => [
                'data' => 8,
                'name' => 'f5/sizes.hit_dice_size_8',
            ],
        ],
    ],
    'large' => [
        'name' => 'f5/sizes.large',
        'space' => 10,
        'hit_dice' => 10,
        'tags' => [
            'stat_mod' => [
                'high_str',
            ],
            'hit_dice' => [
                'data' => 10,
                'name' => 'f5/sizes.hit_dice_size_10',
            ],
        ],
    ],
    'huge' => [
        'name' => 'f5/sizes.huge',
        'space' => 15,
        'hit_dice' => 12,
        'tags' => [
            'stat_mod' => [
                'high_str',
                'low_dex',
                'high_con',
            ],
            'hit_dice' => [
                'data' => 12,
                'name' => 'f5/sizes.hit_dice_size_12',
            ],
        ],
    ],
    'gargantuan' => [
        'name' => 'f5/sizes.gargantuan',
        'space' => 20,
        'hit_dice' => 20,
        'tags' => [
            'stat_mod' => [
                'high_str',
                'low_dex',
                'high_con',
            ],
            'hit_dice' => [
                'data' => 20,
                'name' => 'f5/sizes.hit_dice_size_20',
            ],
        ],
    ],
];