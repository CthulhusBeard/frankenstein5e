<?php

return [
    'bludgeoning' => [
        'name' => 'f5/damagetypes.type_bludgeoning',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'common_save' => 'dex',
    ],
    'piercing' => [
        'name' => 'f5/damagetypes.type_piercing',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'common_save' => 'dex',
    ],
    'slashing' => [
        'name' => 'f5/damagetypes.type_slashing',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'common_save' => 'dex',
    ],
    
    'physical' => [
        'name' => 'f5/damagetypes.type_physical',
        'long_name' => 'f5/damagetypes.type_physical_long',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'dealt' => false,
        'common_save' => 'dex',
    ],

    
    'acid' => [
        'name' => 'f5/damagetypes.type_acid',
        'type' => 'elemental',
        'resist' => '3',
        'common_save' => 'dex',
    ],
    'cold' => [
        'name' => 'f5/damagetypes.type_cold',
        'type' => 'elemental',
        'resist' => '3',
        'common_save' => 'con',
    ],
    'fire' => [
        'name' => 'f5/damagetypes.type_fire',
        'type' => 'elemental',
        'resist' => '2',
        'common_save' => 'dex',
    ],
    'lightning' => [
        'name' => 'f5/damagetypes.type_lightning',
        'type' => 'elemental',
        'resist' => '3',
        'common_save' => 'dex',
    ],
    'necrotic' => [
        'name' => 'f5/damagetypes.type_necrotic',
        'type' => 'planar',
        'resist' => '3',
        'common_save' => 'con',
    ],
    'poison' => [
        'name' => 'f5/damagetypes.type_poison',
        'type' => 'elemental',
        'resist' => '2',
        'common_save' => 'con',
    ],
    'radiant' => [
        'name' => 'f5/damagetypes.type_radiant',
        'type' => 'planar',
        'resist' => '3',
        'common_save' => 'con',
    ],
    'thunder' => [
        'name' => 'f5/damagetypes.type_thunder',
        'type' => 'elemental',
        'resist' => '4',
        'common_save' => 'con',
    ],

    'force' => [
        'name' => 'f5/damagetypes.type_force',
        'type' => 'physical',
        'resist' => '5',
        'common_save' => 'dex',
    ],

    'psychic' => [
        'name' => 'f5/damagetypes.type_psychic',
        'type' => 'mental',
        'resist' => '5',
        'common_save' => 'int',
    ],

    'spells' => [
        'name' => 'f5/damagetypes.type_spells',
        'long_name' => 'f5/damagetypes.type_spells_long',
        'type' => 'magical',
        'resist' => '1',
        'dealt' => false,
        'common_save' => 'wis',
    ],

    'physical_non_magical' => [
        'name' => 'f5/damagetypes.type_physical_non_magical',
        'long_name' => 'f5/damagetypes.type_physical_non_magical_long',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'dealt' => false,
        'common_save' => 'dex',
    ],
    'physical_non_silvered' => [
        'name' => 'f5/damagetypes.type_physical_non_silvered',
        'long_name' => 'f5/damagetypes.type_physical_non_silvered_long',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'dealt' => false,
        'common_save' => 'dex',
    ],
    'physical_non_adamantine' => [
        'name' => 'f5/damagetypes.type_physical_non_adamantine',
        'long_name' => 'f5/damagetypes.type_physical_non_adamantine_long',
        'type' => 'physical',
        'magical' => false,
        'rank' => '1',
        'dealt' => false,
        'common_save' => 'dex',
    ],


];