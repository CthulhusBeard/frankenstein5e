<?php

return [
    'desc_attack_hit' => 'Hit:',
    'desc_attack_miss' => 'Miss:',
    'desc_saving_throw' => 'Each creature |CREATURES-CHOICE| that is within |RANGE| feet of the |TARGET-AREA| |IS-AWARE| must succeed on a DC |SPELL-SAVE-DC| |SPELL-SAVE-ABILITY| saving throw. On a failed save the target |CONDITION| for |DURATION| |TAKES-DAMAGE|. |SUCCESSFUL-SAVE|',
    'desc_deal_damage' => '|DAMAGEROLL| |DAMAGETYPE| damage', //4d8 lightning damage

    'desc_targeting_is_aware' => 'and aware of it',
    'desc_targeting_can_see' => 'and can see it',
    
    'desc_targeting_creatures_choice' => 'of the |CREATURE-TYPE|\'s choice',
    'desc_condition_takes_damage' => 'or until it takes any damage',

    'desc_condition_repeat_save' => 'A creature can repeat the saving throw |DURATION|, ending the effect on itself on a success.',
    'desc_condition_immunity' => 'If a creature’s saving throw is successful or the effect ends for it, the creature is immune to the |CREATURE-TYPE|’s |ABILITY-NAME| for the next |IMMUNITY-DURATION|.',

    'name_melee_attack' => 'Melee Attack',
    'desc_melee_attack' => '<i>|ATTACK-TYPE|:</i> +|ATTACK-BONUS| to hit, |REACH| |TARGETS|.',

    'name_multiattack' => 'Multiattack', 
    'desc_multiattack' => 'The |CREATURE-TYPE| make |MULTIATTACK|.', 

    'name_use_a_skill' => 'Use A Skill',
    'desc_use_a_skill' => 'The |CREATURE-TYPE| makes a |ABILITY| (|SKILL|) check.',

    'name_claws' => 'Claws', 
    'name_frightful_presence' => 'Frightful Presence', 

    'name_legendary_resistance' => 'Legendary Resistance (3/Day).',
    'desc_legendary_resistance' => 'If the dragon fails a saving throw, it can choose to succeed instead.',

    //Feature Modifiers
    'desc_modifier_damage' => 'plus |DAMAGEROLL| |DAMAGETYPE| damage',
    'desc_modifier_saving_throw_generic' => 'Additionally, it must succeed a |DAMAGEROLL| |DAMAGETYPE| damage',
    'desc_modifier_saving_throw_creature' => 'If the target is a creature, it must succeed a |DAMAGEROLL| |DAMAGETYPE| damage',
];