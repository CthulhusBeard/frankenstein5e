<?php

return [
    'slashing' => [
        'name' => 'f5/damage.type_slashing',
        'type' => 'physical',
        'rank' => '1',
    ],
    'piercing' => [
        'name' => 'f5/damage.type_piercing',
        'type' => 'physical',
        'rank' => '1',
    ],
    'bludgeoning' => [
        'name' => 'f5/damage.type_bludgeoning',
        'type' => 'physical',
        'rank' => '1',
    ],

    'fire' => [
        'name' => 'f5/damage.type_fire',
        'type' => 'elemental',
        'resist' => '2',
    ],
    'cold' => [
        'name' => 'f5/damage.type_cold',
        'type' => 'elemental',
        'resist' => '3',
    ],
    'lightning' => [
        'name' => 'f5/damage.type_lightning',
        'type' => 'elemental',
        'resist' => '3',
    ],
    'acid' => [
        'name' => 'f5/damage.type_acid',
        'type' => 'elemental',
        'resist' => '3',
    ],
    'thunder' => [
        'name' => 'f5/damage.type_thunder',
        'type' => 'elemental',
        'resist' => '4',
    ],
    'poison' => [
        'name' => 'f5/damage.type_poison',
        'type' => 'elemental',
        'resist' => '2',
    ],

    'radiant' => [
        'name' => 'f5/damage.type_radiant',
        'type' => 'planar',
        'resist' => '3',
    ],
    'necrotic' => [
        'name' => 'f5/damage.type_necrotic',
        'type' => 'planar',
        'resist' => '3',
    ],

    'force' => [
        'name' => 'f5/damage.type_force',
        'type' => 'physical',
        'resist' => '5',
    ],

    'psychic' => [
        'name' => 'f5/damage.type_psychic',
        'type' => 'mental',
        'resist' => '5',
    ],

    'physical_non_magical' => [
        'name' => 'f5/damage.type_physical_non_magical',
        'long_name' => 'f5/damage.type_physical_non_magical_long',
        'type' => 'physical',
        'magical' => 'true',
        'rank' => '1',
        'dealt' => false,
    ],
    'physical_non_silvered' => [
        'name' => 'f5/damage.type_physical_non_silvered',
        'long_name' => 'f5/damage.type_physical_non_silvered_long',
        'type' => 'physical',
        'magical' => 'false',
        'rank' => '1',
        'dealt' => false,
    ],
    'physical_non_adamantine' => [
        'name' => 'f5/damage.type_physical_non_adamantine',
        'long_name' => 'f5/damage.type_physical_non_adamantine_long',
        'type' => 'physical',
        'magical' => 'false',
        'rank' => '1',
        'dealt' => false,
    ],

];