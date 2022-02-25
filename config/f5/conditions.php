<?php
/*

    'condition_desc_becomes' => 'becomes :condition|become :condition',
    'condition_desc_is' => 'is :condition|are :condition',
    'condition_desc_not' => 'is not :condition|are not :condition',
    'condition_desc_gains_point' => 'gains a point of :condition|gain a point of :condition',
    'condition_desc_not_gains_point' => 'does not gain a point of :condition|do not gain a point of :condition',
    'condition_desc_knocked' => 'is knocked :condition|are knocked :condition',
    'condition_desc_not_knocked' => 'is not knocked :condition|are not knocked :condition',
    'condition_desc_is_set' => 'is set :condition|are set :condition',
    'condition_desc_not_set' => 'is not set :condition|are not set :condition',
    'condition_desc_is_pushed' => 'is :condition :distance|are :condition :distance',
    'condition_desc_not_pushed' => 'is not :condition|are not :condition',
    'condition_desc_considered' => 'is considered :condition|are considered :condition',

*/

return [
    'blinded' => [
        'name' => 'f5/conditions.blinded',
        'is' => 'f5/conditions.condition_desc_is',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 3,
    ],
    'charmed' => [
        'name' => 'f5/conditions.charmed',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 2,
    ],
    'deafened' => [
        'name' => 'f5/conditions.deafened',
        'is' => 'f5/conditions.condition_desc_is',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 1,
    ],
    'exhaustion' => [
        'name' => 'f5/conditions.exhaustion',
        'is' => 'f5/conditions.condition_desc_gains_point',
        'not' => 'f5/conditions.condition_desc_not_gains_point',
        'rank' => 3,
    ],
    'frightened' => [
        'name' => 'f5/conditions.frightened',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 2,
    ],
    'grappled' => [
        'name' => 'f5/conditions.grappled',
        'is' => 'f5/conditions.condition_desc_is',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 2,
    ],
    'incapacitated' => [
        'name' => 'f5/conditions.incapacitated',
        'is' => 'f5/conditions.condition_desc_is',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 3,
    ],
    'paralyzed' => [
        'name' => 'f5/conditions.paralyzed',
        'is' => 'f5/conditions.condition_desc_is',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 4,
    ],
    'petrified' => [
        'name' => 'f5/conditions.petrified',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 5,
    ],
    'poisoned' => [
        'name' => 'f5/conditions.poisoned',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 2,
    ],
    'prone' => [
        'name' => 'f5/conditions.prone',
        'is' => 'f5/conditions.condition_desc_knocked',
        'each' => 'f5/conditions.condition_desc_knocked',
        'not' => 'f5/conditions.condition_desc_not_knocked',
        'rank' => 1.5,
    ],
    'restrained' => [
        'name' => 'f5/conditions.restrained',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 3,
    ],
    'stunned' => [
        'name' => 'f5/conditions.stunned',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 3.5,
    ],
    'unconsious' => [
        'name' => 'f5/conditions.unconsious',
        'is' => 'f5/conditions.condition_desc_becomes',
        'not' => 'f5/conditions.condition_desc_not',
        'rank' => 4.5,
    ],
    'swallowed' => [
        'name' => 'f5/conditions.swallowed',
        'is' => 'f5/conditions.condition_desc_is',
        'not' => 'f5/conditions.condition_desc_not',
        'description' => 'f5/conditions.swallowed_description',
        'rank' => 4,
    ],
    'on_fire' => [
        'name' => 'f5/conditions.on_fire',
        'is' => 'f5/conditions.is_on_fire',
        'not' => 'f5/conditions.not_on_fire',
        'description' => 'f5/conditions.on_fire_description',
        'rank' => 3,
    ],
    'pushed' => [
        'name' => 'f5/conditions.pushed',
        'is' => 'f5/conditions.condition_desc_is_pushed',
        'not' => 'f5/conditions.condition_desc_is_not_pushed',
        'distance' => [1,2,3,4,5,6],
        'rank' => 1,
    ],


];