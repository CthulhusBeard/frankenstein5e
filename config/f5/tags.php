<?php
return [

    'creature_options' => [
        //Beast Options
        'mammal' => [
            'name' => 'f5/creaturesubtypes.mammal',
            'tags' => [
                'features' => [
                    'claws'
                ],
            ]
        ],
        'reptile' => [
            'name' => 'f5/creaturesubtypes.reptile',
            'tags' => [
                'features' => [
                    'claws'
                ],
            ]
        ],
        'avian' => [
            'name' => 'f5/creaturesubtypes.avian',
            'tags' => [
                'speeds' => [
                    'fly'
                ],
                'features' => [
                    'wing_attack'
                ],
            ]
        ],
        'aquatic' => [
            'name' => 'f5/creaturesubtypes.aquatic',
            'tags' => [
                'speeds' => [
                    'swim'
                ],
                'features' => [
                    'water_breathing'
                ],
            ]
        ],
        'amphibian' => [
            'name' => 'f5/creaturesubtypes.amphibian',
            'tags' => [
                'features' => [
                    'claws',
                    'amphibious'
                ],
            ]
        ],

        //Construct Options
        'modron' => [
            'name' => 'f5/creaturesubtypes.modron',
            'tags' => [
                'senses' => 'truesight',
                'alignments' => 'lawful_neutral',
            ],
        ],

        //Dragon Options
        'black_dragon' => [
            'name' => 'f5/creaturesubtypes.black_dragon',
            'tags' => [
                'damage_immunities' => 'acid',
                'alignments' => 'chaotic_evil',
            ],
        ],
        'white_dragon' => [
            'name' => 'f5/creaturesubtypes.white_dragon',
            'tags' => [    
                'damage_immunities' => 'cold',
                'alignments' => 'chaotic_evil', 
                'stats' => 'low_int'
            ],
        ],
        'red_dragon' => [
            'name' => 'f5/creaturesubtypes.red_dragon',
            'tags' => [
                'damage_immunities' => 'fire',
                'alignments' => 'chaotic_evil',
            ],
        ],
        'blue_dragon' => [
            'name' => 'f5/creaturesubtypes.blue_dragon',
            'tags' => [
                'damage_immunities' => 'lightning',
                'alignments' => 'lawful_evil',
            ],
        ],
        'green_dragon' => [
            'name' => 'f5/creaturesubtypes.green_dragon',
            'tags' => [
                'damage_immunities' => 'poison',
                'alignments' => 'lawful_evil',
                'stats' => 'high_int'
            ],
        ],

        'copper_dragon' => [
            'name' => 'f5/creaturesubtypes.copper_dragon',
            'tags' => [
                'damage_immunities' => 'acid',
                'alignments' => 'chaotic_good',
                'stats' => 'high_int'
            ],
        ],
        'silver_dragon' => [
            'name' => 'f5/creaturesubtypes.silver_dragon',
            'tags' => [
                'damage_immunities' => 'cold',
                'alignments' => 'lawful_good',
            ],
        ],
        'brass_dragon' => [
            'name' => 'f5/creaturesubtypes.brass_dragon',
            'tags' => [
                'damage_immunities' => 'fire',
                'alignments' => 'chaotic_good',
            ],
        ],
        'bronze_dragon' => [
            'name' => 'f5/creaturesubtypes.bronze_dragon',
            'tags' => [
                'damage_immunities' => 'lightning',
                'alignments' => 'lawful_good',
            ],
        ],
        'gold_dragon' => [
            'name' => 'f5/creaturesubtypes.gold_dragon',
            'tags' => [
                'damage_immunities' => 'fire',
                'alignments' => 'lawful_good',
            ],
        ],

        'drake' => [
            'name' => 'f5/creaturesubtypes.drake',
            'tags' => [
                'alignments' => 'unaligned',
                'stats' => 'low_int'
            ],
        ],
        'wyvern' => [
            'name' => 'f5/creaturesubtypes.wyvern',
            'tags' => [
                'alignments' => 'unaligned',
                'stats' => 'low_int'
            ],
        ],

        'black_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.black_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'acid',
            ],
        ],
        'white_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.white_dragon_ancestry',
            'tags' => [    
                'damage_resistances' => 'cold',
            ],
        ],
        'red_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.red_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'fire',
            ],
        ],
        'blue_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.blue_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'lightning',
            ],
        ],
        'green_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.green_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'poison',
            ],
        ],

        'copper_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.copper_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'acid',
            ],
        ],
        'silver_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.silver_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'cold',
            ],
        ],
        'brass_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.brass_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'fire',
            ],
        ],
        'bronze_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.bronze_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'lightning',
            ],
        ],
        'gold_dragon_ancestry' => [
            'name' => 'f5/creaturesubtypes.gold_dragon_ancestry',
            'tags' => [
                'damage_resistances' => 'fire',
            ],
        ],


        //Elemental Options
        'air_elemental' => [
            'name' => 'f5/creaturesubtypes.air_elemental',
            'tags' => [
                'damage_resistances' => 'physical',
                'languages' => 'auran',
            ],
        ],
        'fire_elemental' => [
            'name' => 'f5/creaturesubtypes.fire_elemental',
            'tags' => [
                'damage_immunities' => 'fire',
                'languages' => 'ignan',
            ],
        ],
        'earth_elemental' => [
            'name' => 'f5/creaturesubtypes.earth_elemental',
            'tags' => [
                'damage_resistances' => 'physical',
                'languages' => 'terran',
            ],
        ],
        'water_elemental' => [
            'name' => 'f5/creaturesubtypes.water_elemental',
            'tags' => [
                'damage_resistances' => 'acid', 
                'features' => 'amphibious',   
                'languages' => 'aquan',
            ],
        ],
        'acid_elemental' => [
            'name' => 'f5/creaturesubtypes.acid_elemental',
            'tags' => [
                'damage_immunities' => 'acid', 
                'languages' => 'aquan',
            ],
        ],
        'lightning_elemental' => [
            'name' => 'f5/creaturesubtypes.lightning_elemental',
            'tags' => [
                'damage_immunities' => 'lightning',
                'languages' => 'auran',
            ],
        ],
        'storm_elemental' => [
            'name' => 'f5/creaturesubtypes.storm_elemental',
            'tags' => [
                'damage_immunities' => 'lightning',
                'languages' => 'auran',
            ],
        ],
        'ice_elemental' => [
            'name' => 'f5/creaturesubtypes.ice_elemental',
            'tags' => [
                'damage_immunities' => 'cold',
                'languages' => 'aquan',
            ],
        ],
        'dust_elemental' => [
            'name' => 'f5/creaturesubtypes.dust_elemental',
            'tags' => [
                'languages' => 'auran',
            ],
        ],
        'magma_elemental' => [
            'name' => 'f5/creaturesubtypes.magma_elemental',
            'tags' => [
                'damage_immunities' => 'fire',
                'languages' => 'ignan',
            ],
        ],
        'ooze_elemental' => [
            'name' => 'f5/creaturesubtypes.ooze_elemental',
            'tags' => [
                'features' => 'amphibious',
                'languages' => 'aquan',
            ],
        ],
        'steam_elemental' => [
            'name' => 'f5/creaturesubtypes.steam_elemental',
            'tags' => [
                'languages' => 'auran',
            ],
        ],

        'genie' => [
            'name' => 'f5/creaturesubtypes.genie',
            'tags' => [
                'stats' => 'high_cha',
                'features' => 'innate_spellcasting',
                'speeds' => 'fly',
                'senses' => 'darkvision',
            ],
        ],
        'dao' => [
            'name' => 'f5/creaturesubtypes.dao',
            'tags' => [
                'languages' => 'terran',
                'condition_immunities' => 'petrified',
                'stats' => 'high_cha',
                'features' => 'innate_spellcasting',
                'speeds' => [
                    'fly',
                    'burrow',
                ],
                'senses' => 'darkvision',
            ],
        ],
        'djinni' => [
            'name' => 'f5/creaturesubtypes.djinni',
            'tags' => [
                'languages' => 'auran',
                'stats' => 'high_cha',
                'features' => 'innate_spellcasting',
                'speeds' => 'fly',
                'senses' => 'darkvision',
            ],
        ],
        'efreeti' => [
            'name' => 'f5/creaturesubtypes.efreeti',
            'tags' => [
                'languages' => 'ignan',
                'stats' => 'high_cha',
                'features' => 'innate_spellcasting',
                'speeds' => 'fly',
                'senses' => 'darkvision',
            ],
        ],
        'marid' => [
            'name' => 'f5/creaturesubtypes.marid',
            'tags' => [
                'languages' => 'aquan',
                'stats' => 'high_cha',
                'features' => 'innate_spellcasting',
                'speeds' => [
                    'fly',
                    'swim',
                ],
                'senses' => [
                    'darkvision',
                    'blindsight',
                ],
            ],
        ],

        //Giant Options
        'fire_giant' => [
            'name' => 'f5/creaturesubtypes.fire_giant',
            'tags' => [        
                'damage_immunities' => 'fire',
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
                'damage_immunities' => 'cold',
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
                'damage_immunities' => 'lightning',
                'damage_immunities' => 'thunder',
            ],
        ],


        //Humanoid    
        'drow' => [
            'name' => 'f5/creaturesubtypes.drow_elf',
            'tags' => [
                'features' => 'sunlight_sensitivity',
                'languages' => 'undercommon',
            ],
        ],
        'dusk_elf' => [
            'name' => 'f5/creaturesubtypes.dusk_elf',
            'tags' => [
            ],
        ],
        'eladrin' => [
            'name' => 'f5/creaturesubtypes.eladrin_elf',
            'tags' => [
                'languages' => 'sylvan',
            ],
        ],
        'high_elf' => [
            'name' => 'f5/creaturesubtypes.high_elf',
            'tags' => [
            ],
        ],
        'moon_elf' => [
            'name' => 'f5/creaturesubtypes.moon_elf',
            'tags' => [
            ],
        ],
        'wood_elf' => [
            'name' => 'f5/creaturesubtypes.wood_elf',
            'tags' => [
            ],
        ],
        'sea_elf' => [
            'name' => 'f5/creaturesubtypes.sea_elf',
            'tags' => [
                'features' => 'breath_water',
            ],
        ],
        'shadarkai_elf' => [
            'name' => 'f5/creaturesubtypes.shadarkai_elf',
            'tags' => [
            ],
        ],

        
        'deep_gnome' => [
            'name' => 'f5/creaturesubtypes.deep_gnome',
            'tags' => [
                'features' => 'magic_resistance',
            ],
        ],
        'forest_gnome' => [
            'name' => 'f5/creaturesubtypes.forest_gnome',
            'tags' => [
            ],
        ],
        'rock_gnome' => [
            'name' => 'f5/creaturesubtypes.rock_gnome',
            'tags' => [
            ],
        ],


        'githyanki' => [
            'name' => 'f5/creaturesubtypes.githyanki',
            'tags' => [
            ],
        ],
        'githzerai' => [
            'name' => 'f5/creaturesubtypes.githzerai',
            'tags' => [
            ],
        ],



        
        //Lycanthrope
        'werebear' => [
            'name' => 'f5/creaturesubtypes.werebear',
            'tags' => [
            ],
        ],
        'werewolf' => [
            'name' => 'f5/creaturesubtypes.werewolf',
            'tags' => [
            ],
        ],
        'wererat' => [
            'name' => 'f5/creaturesubtypes.wererat',
            'tags' => [
            ],
        ],
        'weretiger' => [
            'name' => 'f5/creaturesubtypes.weretiger',
            'tags' => [
            ],
        ],
        'wereboar' => [
            'name' => 'f5/creaturesubtypes.wereboar',
            'tags' => [
            ],
        ],
    ],


    'stat_mod' => [
        'high_str' => [
            'name' => 'f5/tags.high_str',
        ],
        'avg_str' => [
            'name' => 'f5/tags.avg_str',
        ],
        'low_str' => [
            'name' => 'f5/tags.low_str',
        ],
        'high_dex' => [
            'name' => 'f5/tags.high_dex',
        ],
        'avg_dex' => [
            'name' => 'f5/tags.avg_dex',
        ],
        'low_dex' => [
            'name' => 'f5/tags.low_dex',
        ],
        'high_con' => [
            'name' => 'f5/tags.high_con',
        ],
        'avg_con' => [
            'name' => 'f5/tags.avg_con',
        ],
        'low_con' => [
            'name' => 'f5/tags.low_con',
        ],
        'high_int' => [
            'name' => 'f5/tags.high_int',
        ],
        'avg_int' => [
            'name' => 'f5/tags.avg_int',
        ],
        'low_int' => [
            'name' => 'f5/tags.low_int',
        ],
        'high_wis' => [
            'name' => 'f5/tags.high_wis',
        ],
        'avg_wis' => [
            'name' => 'f5/tags.avg_wis',
        ],
        'low_wis' => [
            'name' => 'f5/tags.low_wis',
        ],
        'high_cha' => [
            'name' => 'f5/tags.high_cha',
        ],
        'avg_cha' => [
            'name' => 'f5/tags.avg_cha',
        ],
        'low_cha' => [
            'name' => 'f5/tags.low_cha',
        ],
    ],


    'translations' => [
        'tag_traits' => 'f5/tags.tag_traits',

        'tag_languages' => 'f5/tags.tag_languages',
        'tag_senses' => 'f5/tags.tag_senses',
        'tag_alignments' => 'f5/tags.tag_alignments',
        'tag_damage_resistances' => 'f5/tags.tag_damage_resistances',
        'tag_damage_immunities' => 'f5/tags.tag_damage_immunities',
        'tag_damage_vulnerabilities' => 'f5/tags.tag_damage_vulnerabilities',
        'tag_condition_immunities' => 'f5/tags.tag_condition_immunities',
        'tag_creaturesubtypes' => 'f5/tags.tag_creaturesubtypes',
        'tag_speeds' => 'f5/tags.tag_speeds',
        'tag_saves' => 'f5/tags.tag_saves',
        'tag_stats' => 'f5/tags.tag_stats',
    
        'tag_features' => 'f5/tags.tag_features',
    
    ]

];