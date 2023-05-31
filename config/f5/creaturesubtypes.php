<?php

return [
    
    //humanoid
    'any' => [
        'name' => 'f5/creaturesubtypes.any',
        'tags' => [

        ],
    ],
    'aarakocra' => [
        'name' => 'f5/creaturesubtypes.aarakocra',
        'tags' => [
            'speeds' => 'fly',
        ],
    ],
    'aasimar' => [
        'name' => 'f5/creaturesubtypes.aasimar',
        'tags' => [
            'damage_resistances' => [
                'necrotic', 
                'radiant'
            ]
        ],
    ],
    'bullywug' => [
        'name' => 'f5/creaturesubtypes.bullywug',
        'tags' => [

        ],
    ],
    'changeling' => [
        'name' => 'f5/creaturesubtypes.changeling',
        'tags' => [
            'creaturesubtypes' => 'shapechanger',
        ],
    ],
    'demon' => [
        'name' => 'f5/creaturesubtypes.demon',
        'tags' => [
            'affinity_elemental' => 'fire',
            'damage_resistances' => 'fire',
            'alignments' => [
                'chaotic_evil'
            ],
        ],
    ],
    'derro' => [
        'name' => 'f5/creaturesubtypes.derro',
        'tags' => [
            'features' => [
                'sunlight_sensitivity',
                'magic_resistance',
                'insanity',
            ]
        ],
    ],
    'devil' => [
        'name' => 'f5/creaturesubtypes.devil',
        'tags' => [
            'affinity_elemental' => 'fire',
            'damage_resistances' => 'fire',
            'alignments' => [
                'lawful_evil'
            ],
        ],
    ],
    'dragonborn' => [
        'name' => 'f5/creaturesubtypes.dragonborn',
        'tags' => [
            'features' => 'breath_weapon',
        ],
        'options' => [
            'black_dragon_ancestry',
            'white_dragon_ancestry',
            'red_dragon_ancestry',
            'blue_dragon_ancestry',
            'green_dragon_ancestry',

            'copper_dragon_ancestry',
            'silver_dragon_ancestry',
            'brass_dragon_ancestry',
            'bronze_dragon_ancestry',
            'gold_dragon_ancestry',

            'metallic_dragon_ancestry',
            'chromatic_dragon_ancestry',
            'gem_dragon_ancestry',
        ],
    ],
    'dwarf' => [
        'name' => 'f5/creaturesubtypes.dwarf',
        'tags' => [
            'features' => 'stout_resilience',
            'senses' => 'darkvision',
        ],
        'options' => [
            'hill_dwarf',
            'mountain_dwarf',
            'duegar_dwarf',
        ],

    ],
    'elf' => [
        'name' => 'f5/creaturesubtypes.elf',
        'options' => [
            'drow',
            'dusk_elf',
            'eladrin',
            'high_elf',
            'moon_elf',
            'wood_elf',
            'sea_elf',
            'shadarkai_elf',
        ],
        'tags' => [
            'features' => 'fey_ancestry',
            'languages' => 'elvish',
            'senses' => 'darkvision',
        ],
    ],
    'firenewt' => [
        'name' => 'f5/creaturesubtypes.firenewt',
        'tags' => [
            'damage_resistances' => 'fire',
        ],
    ],
    'genasi' => [
        'name' => 'f5/creaturesubtypes.genasi',
        'options' => [
            'air',
            'earth',
            'fire',
            'water',
            'ice',
            'lightning',
            'dust',
            'magma',
            'ooze',
            'steam',
        ],
        'tags' => [

        ],
    ],
    'giff' => [
        'name' => 'f5/creaturesubtypes.giff',
        'tags' => [
            'woc_property' => true,
        ],
    ],
    'gith' => [
        'name' => 'f5/creaturesubtypes.gith',
        'tags' => [
            'woc_property' => true,
        ],
        'options' => [
            'githyanki',
            'githzerai',
        ],
    ],
    'gnoll' => [
        'name' => 'f5/creaturesubtypes.gnoll',
        'tags' => [

        ],
    ],
    'gnome' => [
        'name' => 'f5/creaturesubtypes.gnome',
        'options' => [
            'deep_gnome',
            'forest_gnome',
            'rock_gnome',
        ],
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'goblinoid' => [
        'name' => 'f5/creaturesubtypes.goblinoid',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'goliath' => [
        'name' => 'f5/creaturesubtypes.goliath',
        'tags' => [

        ],
    ],
    'grung' => [
        'name' => 'f5/creaturesubtypes.grung',
        'tags' => [

        ],
    ],
    'half_dragon' => [
        'name' => 'f5/creaturesubtypes.half_dragon',
        'tags' => [
            'features' => 'breath_weapon',
        ],
        'options' => [
            'black_dragon_ancestry',
            'white_dragon_ancestry',
            'red_dragon_ancestry',
            'blue_dragon_ancestry',
            'green_dragon_ancestry',

            'copper_dragon_ancestry',
            'silver_dragon_ancestry',
            'brass_dragon_ancestry',
            'bronze_dragon_ancestry',
            'gold_dragon_ancestry',

            'metallic_dragon_ancestry',
            'chromatic_dragon_ancestry',
            'gem_dragon_ancestry',
        ],
    ],
    'half_elf' => [
        'name' => 'f5/creaturesubtypes.half_elf',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'halfling' => [
        'name' => 'f5/creaturesubtypes.halfling',
        'tags' => [

        ],
    ],
    'half_orc' => [
        'name' => 'f5/creaturesubtypes.half_orc',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'human' => [
        'name' => 'f5/creaturesubtypes.human',
        'tags' => [

        ],
    ],
    'illithid' => [
        'name' => 'f5/creaturesubtypes.human',
        'tags' => [
            'woc_property' => true,
        ],
    ],
    'kenku' => [
        'name' => 'f5/creaturesubtypes.kenku',
        'tags' => [

        ],
    ],
    'kobold' => [
        'name' => 'f5/creaturesubtypes.kobold',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'kuo_toa' => [
        'name' => 'f5/creaturesubtypes.kuo_toa',
        'tags' => [

        ],
    ],
    'leonin' => [
        'name' => 'f5/creaturesubtypes.leonin',
        'tags' => [
            'senses' => 'darkvision',
            'woc_property' => true,
        ],
    ],
    'lizardfolk' => [
        'name' => 'f5/creaturesubtypes.lizardfolk',
        'tags' => [

        ],
    ],
    'lycanthrope' => [
        'name' => 'f5/creaturesubtypes.lycanthrope',
        'tags' => [
            'creaturesubtypes' => 'shapechanger',
            'senses' => 'darkvision',
            'damage_resistances' => 'physical_non_silvered',
        ],
        'options' => [
            'werebear',
            'werewolf',
            'wererat',
            'weretiger',
            'wereboar',
        ],
    ],
    'merfolk' => [
        'name' => 'f5/creaturesubtypes.merfolk',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'mongrelfolk' => [
        'name' => 'f5/creaturesubtypes.mongrelfolk',
        'tags' => [

        ],
    ],
    'orc' => [
        'name' => 'f5/creaturesubtypes.orc',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'owlin' => [
        'name' => 'f5/creaturesubtypes.owlin',
        'tags' => [
            'senses' => 'darkvision',
            'speeds' => 'fly',
            'woc_property' => true,
        ],
    ],
    'quaggoth' => [
        'name' => 'f5/creaturesubtypes.quaggoth',
        'tags' => [

        ],
    ],
    'satyr' => [
        'name' => 'f5/creaturesubtypes.satyr',
        'tags' => [
            'features' => 'magic_resistance',
        ],
    ],
    'sahuagin' => [
        'name' => 'f5/creaturesubtypes.sahuagin',
        'tags' => [
            'woc_property' => true,
        ],
    ],
    'saurial' => [
        'name' => 'f5/creaturesubtypes.saurial',
        'tags' => [
            'woc_property' => true,
        ],
    ],
    'shifter' => [
        'name' => 'f5/creaturesubtypes.shifter',
        'tags' => [
            'creaturesubtypes' => 'shapechanger',
        ],
    ],
    'tabaxi' => [
        'name' => 'f5/creaturesubtypes.tabaxi',
        'tags' => [
            'senses' => 'darkvision',
        ],
    ],
    'thri_kreen' => [
        'name' => 'f5/creaturesubtypes.thri_kreen',
        'tags' => [
            'woc_property' => true,
        ],
    ],
    'tiefling' => [
        'name' => 'f5/creaturesubtypes.tiefling',
        'tags' => [
            'affinity_elemental' => 'fire',
            'senses' => 'darkvision',
            'damage_resistances' => 'fire',
            'languages' => 'infernal',
        ],
    ],
    'tortle' => [
        'name' => 'f5/creaturesubtypes.tortle',
        'tags' => [
            'woc_property' => true,
        ],
    ],
    'triton' => [
        'name' => 'f5/creaturesubtypes.triton',
        'tags' => [
            'senses' => 'darkvision', 
            'features' => 'amphibious',   
        ],
    ],
    'troglodyte' => [
        'name' => 'f5/creaturesubtypes.troglodyte',
        'tags' => [

        ],
    ],
    'xvart' => [
        'name' => 'f5/creaturesubtypes.xvart',
        'tags' => [

        ],
    ],

    //humanoid, monstrosity
    'yuan_ti' => [
        'name' => 'f5/creaturesubtypes.yuan_ti',
        'tags' => [
            'features' => 'magic_resistance',
        ],
    ],
    'yugoloth' => [
        'name' => 'f5/creaturesubtypes.yugoloth',
        'tags' => [
            'affinity_elemental' => 'acid',
            'alignments' => [
                'neutral_evil',
            ],
            'damage_resistances' => [ 
                'acid',
                'poison'
            ]
        ],
    ],

    //aberations
    'beholderkin' => [
        'name' => 'f5/creaturesubtypes.beholderkin',
        'tags' => [
            'woc_property' => true
        ],
    ],

    
    //most
    'shapechanger' => [
        'name' => 'f5/creaturesubtypes.shapechanger',
        'tags' => [
            'features' => 'immutable_form',  
        ],
    ],
    'titan' => [
        'name' => 'f5/creaturesubtypes.titan',
        'tags' => [
            'size' => 'large',
        ],
    ],

    //beast
    'swarm' => [
        'name' => 'f5/creaturesubtypes.swarm',
        'tags' => [

        ],
    ],

    //construct
    'inevitable' => [
        'name' => 'f5/creaturesubtypes.inevitable',
        'tags' => [
            'senses' => 'darkvision',
            'damage_resistances' => [
                'physical',
                'lightning',
            ]
        ],
    ],

    //dragons
    'metallic_dragon'=> [
        'name' => 'f5/creaturesubtypes.metallic_dragon',
        'tags' => [
            'alignments' => 'good'
        ],
    ],

    'chromatic_dragon'=> [
        'name' => 'f5/creaturesubtypes.chromatic_dragon',
        'tags' => [
            'alignments' => 'evil'
        ],
    ],

    'gem_dragon'=> [
        'name' => 'f5/creaturesubtypes.gem_dragon',
        'tags' => [
            'alignments' => 'neutral'
        ],
    ],

    
    
];