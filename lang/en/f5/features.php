<?php

return [
    'desc_attack_hit' => 'Hit:',
    'desc_attack_miss' => 'Miss:',
    'desc_saving_throw' => 'Each creature :target_choice that is within :range feet of the :target_area :is_aware must succeed on a DC :save_dc :save_ability saving throw. On a failed save, the target :condition for :duration :takes_damage. :successful_save',
    'desc_deal_damage' => ':damage_roll :damage_type damage', //4d8 lightning damage
    'desc_successful_save' => 'On a successful save :half_damage :condition',

    'desc_targeting_is_aware' => 'and aware of it',
    'desc_targeting_can_see' => 'and can see it',
    
    'desc_targeting_creatures_choice' => 'of the :creature_type\'s choice',
    'desc_condition_takes_damage' => 'or until it takes any damage',

    'desc_condition_repeat_save' => 'A creature can repeat the saving throw :duration, ending the effect on itself on a success.',
    'desc_condition_immunity' => 'If a creature\'s saving throw is successful or the effect ends for it, the creature is immune to the :creature_type\'s :feature_name for the next :duration.',

    'name_melee_attack' => 'Melee Attack',
    'desc_melee_attack' => '<i>:attack_type:</i> +:attack_bonus to hit, :reach :targets.',

    'name_multiattack' => 'Multiattack', 
    'desc_multiattack' => 'The :creature_type makes :multiattack.', 

    'name_use_a_skill' => 'Use A Skill',
    'desc_use_a_skill' => 'The :creature_type makes a :ability (:skill) check.',

    'name_claws' => 'Claws', 
    'name_frightful_presence' => 'Frightful Presence', 

    'name_legendary_resistance' => 'Legendary Resistance (3/Day).',
    'desc_legendary_resistance' => 'If the :creature_type fails a saving throw, it can choose to succeed instead.',

    //Feature Modifiers
    'desc_modifier_damage' => 'plus :damage_roll :damage_type damage',
    'desc_modifier_saving_throw_generic' => 'Additionally, it must succeed a :damage_roll :damage_type damage',
    'desc_modifier_saving_throw_creature' => 'If the target is a creature, it must succeed a :damage_roll :damage_type damage',

    //--
    'title_new_feature' => 'New Feature',
    'title_feature_template' => 'Feature Template',
];