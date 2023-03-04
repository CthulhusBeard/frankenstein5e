<?php

return [
    'aberration' => [
        'name' => 'f5/creaturetypes.aberration',
        'desc' => 'f5/creaturetypes.aberration_desc',
        'subtypes' => [
            'shapechanger'
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.aberration_tip_stats',
            // 'saves' => ['con', 'int'],
            'languages' => [
                'deep_speech'
            ],
            'armor' => 'natural',
        ],
    ],
    'beast' => [
        'name' => 'f5/creaturetypes.beast',
        'desc' => 'f5/creaturetypes.beast_desc',
        'subtypes' => [
            'swarm',
        ],
        'options' => [
            'mammal',
            'reptile',
            'avian',
            'aquatic',
            'amphibian'
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.beast_tip_stats',
            // 'saves' => ['dex', 'con'],
            'alignments' => 'unaligned',
            'armor' => 'natural',
        ],
    ],
    'celestial' => [
        'name' => 'f5/creaturetypes.celestial',
        'desc' => 'f5/creaturetypes.celestial_desc',
        'subtypes' => [
            'shapechanger',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.celestial_tip_stats',
            // 'saves' => ['wis', 'cha'],
            'alignments' => 'good',
        ],
    ],
    'construct' => [
        'name' => 'f5/creaturetypes.construct',
        'desc' => 'f5/creaturetypes.construct_desc',
        'subtypes' => [
            'inevitable',
        ],
        'options' => [
            'inevitable',
            'modron',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.construct_tip_stats',
            // 'saves' => ['con'],
            'features' => 'immutable_form',        
            'damage_resistances' => [
                'necrotic',
                'poison',
            ],
            'condition_immunities' => [
                'exhausted',
                'frightened'
            ],
        ],
    ],
    'dragon' => [
        'name' => 'f5/creaturetypes.dragon',
        'desc' => 'f5/creaturetypes.dragon_desc',
        'subtypes' => [
            'chromatic_dragon',
            'metallic_dragon',
            'gem_dragon',
            'shapechanger',
        ],
        'options' => [
            'black_dragon',
            'white_dragon',
            'red_dragon',
            'blue_dragon',
            'green_dragon',
            'copper_dragon',
            'silver_dragon',
            'brass_dragon',
            'bronze_dragon',
            'gold_dragon',
            
            'chromatic_dragon',
            'metallic_dragon',
            'gem_dragon',

            'drake',
            'wyvern',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.dragon_tip_stats',
            'features' => 'breath_weapon',
            'armor' => 'natural',
            // 'saves' => ['dex','con','wis','cha'],
        ],
    ],
    'elemental' => [
        'name' => 'f5/creaturetypes.elemental',
        'desc' => 'f5/creaturetypes.elemental_desc',
        'options' => [
            'air_elemental',
            'fire_elemental',
            'earth_elemental',
            'water_elemental',
            'acid_elemental',
            'lightning_elemental',
            'storm_elemental',
            'ice_elemental',
            'dust_elemental',
            'magma_elemental',
            'ooze_elemental',
            'steam_elemental',
            'genie',
            'dao',
            'djinni',
            'efreeti',
            'marid',
        ],
        // 'saves' => ['wis','cha'],
        'tags' => [
            'stats' => 'f5/creaturetypes.elemental_tip_stats',
        ],
    ],
    'fey' => [
        'name' => 'f5/creaturetypes.fey',
        'desc' => 'f5/creaturetypes.fey_desc',
        'subtypes' => [
            'elf',
            'shapechanger',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.fey_tip_stats',
            // 'saves' => ['wis','cha'],
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
            'stats' => 'f5/creaturetypes.fiend_tip_stats',
            'damage_resistances' => 'fire',
            'alignments' => 'evil',
        ],
    ],
    'giant' => [
        'name' => 'f5/creaturetypes.giant',
        'desc' => 'f5/creaturetypes.giant_desc',
        'options' => [
            'fire_giant',
            'cloud_giant',
            'frost_giant',
            'hill_giant',
            'stone_giant',
            'storm_giant',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.giant_tip_stats',
            //'saves' => ['con', 'cha'],
            'sizes' => 'huge',
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
            'owlin',
            'quaggoth',
            'satyr',
            'sahuagin',
            'saurial',
            'shifter',
            'tabaxi',
            'thri_kreen',
            'tiefling',
            'tortle',
            'tritan',
            'troglodyte',
            'xvart',
            'yuan_ti',
            'shapechanger',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.humanoid_tip_stats',
            'size' => [
                'medium',
                'small'
            ],
        ],
    ],
    'monstrosity' => [
        'name' => 'f5/creaturetypes.monstrosity',
        'desc' => 'f5/creaturetypes.monstrosity_desc',
        'subtypes' => [
            'shapechanger',
            'yuan_ti',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.monstrosity_tip_stats',
        ],
    ],
    'ooze' => [
        'name' => 'f5/creaturetypes.ooze',
        'desc' => 'f5/creaturetypes.ooze_desc',
        'subtypes' => [
            'shapechanger',
        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.ooze_tip_stats',
        ],
    ],
    'plant' => [
        'name' => 'f5/creaturetypes.plant',
        'desc' => 'f5/creaturetypes.plant_desc',
        'subtypes' => [

        ],
        'tags' => [
            'stats' => 'f5/creaturetypes.plant_tip_stats',
            'damage_resistances' => 'lightning',
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
            'stats' => 'f5/creaturetypes.undead_tip_stats',
            'damage_resistances' => 'necrotic',
            'features' => 'undead_fortitude',
            'condition_immunities' => [
                'exhausted',
                'frightened',
            ],
        ],
    ],    

];