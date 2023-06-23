<?php

return [

    'melee' => [
        'name' => 'f5/combatstyles.melee_name',
        'desc' => 'f5/combatstyles.melee_desc',
        'tags' => [
            'features' => [
                'melee_attack'
            ],
            'high_stat' => [
                'data' => ['str', 'dex'],
                'name' => 'f5/combatstyles.melee_stat_tip'
            ],
        ]
    ],
    'ranged' => [
        'name' => 'f5/combatstyles.ranged_name',
        'desc' => 'f5/combatstyles.ranged_desc',
        'tags' => [
            'features' => [
                'ranged_attack'
            ],
            'high_stat' => [
                'data' => ['dex'],
                'name' => 'f5/combatstyles.ranged_stat_tip'
            ],
        ]
    ],
    'spellcasting' => [
        'name' => 'f5/combatstyles.spellcasting_name',
        'desc' => 'f5/combatstyles.spellcasting_desc',
        'tags' => [
            'features' => [
                'spellcasting'
            ],
            'high_stat' => [
                'data' => ['int', 'wis', 'cha', 'con'],
                'name' => 'f5/combatstyles.spellcasting_stat_tip'
            ],
        ]
    ],

];