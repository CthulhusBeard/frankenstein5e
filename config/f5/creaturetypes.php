<?php

return [
    'aberration' => [
        'name' => 'f5/creaturetypes.aberration',
        'desc' => 'f5/creaturetypes.aberration_desc',
        'subtypes' => [
            'beholderkin'=> [
                'name' => 'f5/creaturesubtypes.beholderkin',
                'tags' => [

                ],
            ],
            'shapechanger'=> [
                'name' => 'f5/creaturesubtypes.shapechanger',
                'tags' => [
                ],
            ],
        ],
        'tags' => [
            'language_deep_speech' => 'common',
        ],
    ],
    'beast' => [
        'name' => 'f5/creaturetypes.beast',
        'desc' => 'f5/creaturetypes.beast_desc',
        'subtypes' => [
            'swarm',
        ],
        'options' => [
            'mammal' => [
                'name' => 'f5/creaturesubtypes.mammal',
                'tags' => [
                    'claws'
                ]
            ],
            'reptile' => [
                'name' => 'f5/creaturesubtypes.reptile',
                'tags' => [
                    'claws'
                ]
            ],
            'avian' => [
                'name' => 'f5/creaturesubtypes.avian',
                'tags' => [
                    'speed_fly',
                    'wings'
                ]
            ],
            'aquatic' => [
                'name' => 'f5/creaturesubtypes.aquatic',
                'tags' => [
                    'speed_swim',
                    'feature_breath_water'
                ]
            ],
            'amphibian' => [
                'name' => 'f5/creaturesubtypes.amphibian',
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
        'name' => 'f5/creaturetypes.celestial',
        'desc' => 'f5/creaturetypes.celestial_desc',
        'subtypes' => [
            'shapechanger',
        ],
    ],
    'construct' => [
        'name' => 'f5/creaturetypes.construct',
        'desc' => 'f5/creaturetypes.construct_desc',
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
        'name' => 'f5/creaturetypes.dragon',
        'desc' => 'f5/creaturetypes.dragon_desc',
        'options' => [
            'black' => [
                'name' => 'f5/creaturesubtypes.black',
                'tags' => [        
                    'damage_immunity_acid' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'white' => [
                'name' => 'f5/creaturesubtypes.white',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'red' => [
                'name' => 'f5/creaturesubtypes.red',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'blue' => [
                'name' => 'f5/creaturesubtypes.blue',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],
            'green' => [
                'name' => 'f5/creaturesubtypes.green',
                'tags' => [        
                    'damage_immunity_poison' => 'always',
                    'alignment_evil' => 'common',
                ],
            ],

            'copper' => [
                'name' => 'f5/creaturesubtypes.copper',
                'tags' => [        
                    'damage_immunity_acid' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'silver' => [
                'name' => 'f5/creaturesubtypes.silver',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'brass' => [
                'name' => 'f5/creaturesubtypes.brass',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'bronze' => [
                'name' => 'f5/creaturesubtypes.bronze',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                    'alignment_good' => 'common',
                ],
            ],
            'gold' => [
                'name' => 'f5/creaturesubtypes.gold',
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
        'name' => 'f5/creaturetypes.elemental',
        'desc' => 'f5/creaturetypes.elemental_desc',
        'options' => [
            'air' => [
                'name' => 'f5/creaturesubtypes.air',
                'tags' => [        
                    'damage_resistance_physical' => 'common',
                ],
            ],
            'fire' => [
                'name' => 'f5/creaturesubtypes.fire',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                ],
            ],
            'earth' => [
                'name' => 'f5/creaturesubtypes.earth',
                'tags' => [        
                    'damage_resistance_physical' => 'always',
                ],
            ],
            'water' => [
                'name' => 'f5/creaturesubtypes.water',
                'tags' => [
                    'damage_resistance_acid' => 'always', 
                    'feature_amphibious' => 'common',   
                ],
            ],
            'acid' => [
                'name' => 'f5/creaturesubtypes.acid',
                'tags' => [        
                    'damage_immunity_acid' => 'always',
                ],
            ],
            'lightning' => [
                'name' => 'f5/creaturesubtypes.lightning',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                ],
            ],
            'storm' => [
                'name' => 'f5/creaturesubtypes.storm',
                'tags' => [        
                    'damage_immunity_lightning' => 'always',
                ],
            ],
            'ice' => [
                'name' => 'f5/creaturesubtypes.ice',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                ],
            ],
            'dust' => [
                'name' => 'f5/creaturesubtypes.dust',
                'tags' => [
                ],
            ],
            'magma' => [
                'name' => 'f5/creaturesubtypes.magma',
                'tags' => [
                    'damage_immunity_fire' => 'always',
                ],
            ],
            'ooze' => [
                'name' => 'f5/creaturesubtypes.ooze',
                'tags' => [
                    'feature_amphibious' => 'common',
                ],
            ],
            'steam' => [
                'name' => 'f5/creaturesubtypes.steam',
                'tags' => [
                ],
            ],
        ],
        'tags' => [        
            'damage_resistance_elemental' => 'always',
        ],
    ],
    'fey' => [
        'name' => 'f5/creaturetypes.fey',
        'desc' => 'f5/creaturetypes.fey_desc',
        'subtypes' => [
            'elf',
            'shapechanger',
        ],
    ],
    'fiend' => [
        'name' => 'f5/creaturetypes.fiend',
        'desc' => 'f5/creaturetypes.fiend_desc',
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
        'name' => 'f5/creaturetypes.giant',
        'desc' => 'f5/creaturetypes.giant_desc',
        'options' => [
            'fire_giant' => [
                'name' => 'f5/creaturesubtypes.fire_giant',
                'tags' => [        
                    'damage_immunity_fire' => 'always',
                ],
            ],
            'cloud_giant' => [
                'name' => 'f5/creaturesubtypes.cloud_giant',
                'tags' => [        
                ],
            ],
            'frost_giant' => [
                'name' => 'f5/creaturesubtypes.frost_giant',
                'tags' => [        
                    'damage_immunity_cold' => 'always',
                ],
            ],
            'hill_giant' => [
                'name' => 'f5/creaturesubtypes.hill_giant',
                'tags' => [        
                ],
            ],
            'stone_giant' => [
                'name' => 'f5/creaturesubtypes.stone_giant',
                'tags' => [        
                ],
            ],
            'storm_giant' => [
                'name' => 'f5/creaturesubtypes.storm_giant',
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
        'name' => 'f5/creaturetypes.humanoid',
        'desc' => 'f5/creaturetypes.humanoid_desc',
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
        'name' => 'f5/creaturetypes.monstrosity',
        'desc' => 'f5/creaturetypes.monstrosity_desc',
        'subtypes' => [
            'shapechanger',
            'yuan_ti',
        ],
    ],
    'ooze' => [
        'name' => 'f5/creaturetypes.ooze',
        'desc' => 'f5/creaturetypes.ooze_desc',
        'subtypes' => [
            'shapechanger',
        ],
    ],
    'plant' => [
        'name' => 'f5/creaturetypes.plant',
        'desc' => 'f5/creaturetypes.plant_desc',
        'subtypes' => [

        ],
        'tags' => [        
            'damage_resistance_lightning',
        ],
    ],
    'undead' => [
        'name' => 'f5/creaturetypes.undead',
        'desc' => 'f5/creaturetypes.undead_desc',
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