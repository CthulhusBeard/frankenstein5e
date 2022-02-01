<?php

return [
    'aberration' => [
        'name' => 'f5/types.aberration',
        'subtypes' => [
            'beholderkin'=> [
                'name' => 'f5/subtypes.beholderkin',
                'tags' => [

                ],
            ],
            'shapechanger'=> [
                'name' => 'f5/subtypes.shapechanger',
                'tags' => [
                ],
            ],
        ],
        'tags' => [
            'language_deep_speech' => 'common',
        ],
    ],
    'beast' => [
        'name' => 'f5/types.beast',
        'subtypes' => [
            'swarm',
        ],
        'options' => [
            'mammal' => [
                'name' => 'f5/subtypes.mammal',
                'tags' => [
                    'claws'
                ]
            ],
            'reptile' => [
                'name' => 'f5/subtypes.reptile',
                'tags' => [
                    'claws'
                ]
            ],
            'avian' => [
                'name' => 'f5/subtypes.avian',
                'tags' => [
                    'speed_fly',
                    'wings'
                ]
            ],
            'aquatic' => [
                'name' => 'f5/subtypes.aquatic',
                'tags' => [
                    'speed_swim',
                    'feature_breath_water'
                ]
            ],
            'amphibian' => [
                'name' => 'f5/subtypes.amphibian',
                'tags' => [
                    'speed_swim',
                    'feature_amphibious'
                ]
            ],
        ],
        'tags' => [
            'alignment_unaligned' => 'common',
        ],
    ],
    'celestial' => [
        'name' => 'f5/types.celestial',
        'subtypes' => [
            'shapechanger',
        ],
    ],
    'construct' => [
        'name' => 'f5/types.construct',
        'subtypes' => [
            'inevitable'
        ],
        'tags' => [
            'feature_immutable_form' => 'common',        
            'damage_resistance_necrotic' => 'common',
            'condition_immunity_exhausted' => 'common',
            'condition_immunity_frightened' => 'common',
        ],
    ],
    'dragon' => [
        'name' => 'f5/types.dragon',
        'options' => [
            'black' => [
                'name' => 'f5/subtypes.black',
                'tags' => [        
                    'damage_immunity_acid' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'white' => [
                'name' => 'f5/subtypes.white',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'red' => [
                'name' => 'f5/subtypes.red',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'blue' => [
                'name' => 'f5/subtypes.blue',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'green' => [
                'name' => 'f5/subtypes.green',
                'tags' => [        
                    'damage_immunity_poison' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],

            'copper' => [
                'name' => 'f5/subtypes.copper',
                'tags' => [        
                    'damage_immunity_acid' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'silver' => [
                'name' => 'f5/subtypes.silver',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'brass' => [
                'name' => 'f5/subtypes.brass',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'bronze' => [
                'name' => 'f5/subtypes.bronze',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'gold' => [
                'name' => 'f5/subtypes.gold',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
        ],
        'tags' => [        
            'subtype_shapechanger' => 'rare',
        ],
    ],
    'elemental' => [
        'name' => 'f5/types.elemental',
        'options' => [
            'air' => [
                'name' => 'f5/subtypes.air',
                'tags' => [        
                    'damage_resistance_physical' => 'common',
                ],
            ],
            'fire' => [
                'name' => 'f5/subtypes.fire',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                ],
            ],
            'earth' => [
                'name' => 'f5/subtypes.earth',
                'tags' => [        
                    'damage_resistance_physical' => 'always',
                ],
            ],
            'water' => [
                'name' => 'f5/subtypes.water',
                'tags' => [
                    'damage_resistance_acid' => 'always', 
                    'feature_amphibious' => 'common',   
                ],
            ],
            'acid' => [
                'name' => 'f5/subtypes.acid',
                'tags' => [        
                    'damage_immunity_acid' => 'always',
                ],
            ],
            'lightning' => [
                'name' => 'f5/subtypes.lightning',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                ],
            ],
            'storm' => [
                'name' => 'f5/subtypes.storm',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                ],
            ],
            'ice' => [
                'name' => 'f5/subtypes.ice',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                ],
            ],
            'dust' => [
                'name' => 'f5/subtypes.dust',
                'tags' => [
                ],
            ],
            'magma' => [
                'name' => 'f5/subtypes.magma',
                'tags' => [
                    'damage_immunity_fire' => 'always',
                ],
            ],
            'ooze' => [
                'name' => 'f5/subtypes.ooze',
                'tags' => [
                    'feature_amphibious' => 'common',
                ],
            ],
            'steam' => [
                'name' => 'f5/subtypes.steam',
                'tags' => [
                ],
            ],
        ],
        'tags' => [        
            'damage_resistance_elemental' => 'always',
        ],
    ],
    'fey' => [
        'name' => 'f5/types.fey',
        'subtypes' => [
            'elf',
            'shapechanger',
        ],
    ],
    'fiend' => [
        'name' => 'f5/types.fiend',
        'subtypes' => [
            'demon',
            'devil',
            'shapechanger',
            'yugoloth',
        ],
        'tags' => [        
            'damage_resistance_fire' => 'common',
            'alignment_evil' => 'common',
        ],
    ],
    'giant' => [
        'name' => 'f5/types.giant',
        'options' => [
            'fire_giant' => [
                'name' => 'f5/subtypes.fire_giant',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                ],
            ],
            'cloud_giant' => [
                'name' => 'f5/subtypes.cloud_giant',
                'tags' => [        
                ],
            ],
            'frost_giant' => [
                'name' => 'f5/subtypes.frost_giant',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                ],
            ],
            'hill_giant' => [
                'name' => 'f5/subtypes.hill_giant',
                'tags' => [        
                ],
            ],
            'stone_giant' => [
                'name' => 'f5/subtypes.stone_giant',
                'tags' => [        
                ],
            ],
            'storm_giant' => [
                'name' => 'f5/subtypes.storm_giant',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                    'damage_immunity_thunder' => 'always',
                ],
            ],
        ],
        'tags' => [
            'size_huge' => 'common',
        ],
    ],
    'humanoid' => [
        'name' => 'f5/types.humanoid',
        'subtypes' => [
            'any',
            'aarakocra',
            'aasimar',
            'bullywug',
            'changeling',
            'derro',
            'dragonborn',
            'dwarf',
            'elf',
            'genasi',
            'gith',
            'gnoll',
            'gnome',
            'goblinoid',
            'goliath',
            'grung',
            'half_dragon',
            'half_elf',
            'halfling',
            'half_orc',
            'human',
            'kenku',
            'kobold',
            'kuo_toa',
            'leonin',
            'lizardfolk',
            'lycanthrope',
            'merfolk',
            'mongrelfolk',
            'orc',
            'quaggoth',
            'satyr',
            'sahuagin',
            'saurial',
            'tabaxi',
            'thri_kreen',
            'tiefling',
            'tortle',
            'troglodyte',
            'xvart',
            'yuan_ti',
            'shapechanger',
        ],
        'tags' => [
            'size_medium' => 'common',
        ],
    ],
    'monstrosity' => [
        'name' => 'f5/types.monstrosity',
        'subtypes' => [
            'shapechanger',
            'yuan_ti',
        ],
    ],
    'ooze' => [
        'name' => 'f5/types.ooze',
        'subtypes' => [
            'shapechanger',
        ],
    ],
    'plant' => [
        'name' => 'f5/types.plant',
        'subtypes' => [

        ],
        'tags' => [        
            'damage_resistance_lightning',
        ],
    ],
    'undead' => [
        'name' => 'f5/types.undead',
        'subtypes' => [
            'shapechanger',
            'titan',
        ],
        'tags' => [ 
            'damage_resistance_necrotic' => 'common',
            'feature_undead_fortitude' => 'common',
            'condition_immunity_exhausted' => 'common',
            'condition_immunity_frightened' => 'common',
        ],
    ],    

];