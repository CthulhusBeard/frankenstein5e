<?php

return [
    'desc_attack_hit' => 'Hit:',
    'desc_attack_miss' => 'Miss:',
    'desc_saving_throw' => 'Each creature :target_choice that is within :range feet of the :target_area :is_aware must succeed on a DC :save_dc :save_ability saving throw. On a failed save, :target_text :condition for :duration :takes_damage. :successful_save',
    'desc_deal_damage' => ':damage_roll :damage_type damage', //4d8 lightning damage
    'desc_successful_save' => 'On a successful save :half_damage :condition',

    'desc_targeting_is_aware' => 'and aware of it',
    'desc_targeting_can_see' => 'and can see it',
    
    'desc_targeting_creatures_choice' => 'of the :creature_type\'s choice',
    'desc_condition_takes_damage' => 'or until it takes any damage',

    'desc_condition_repeat_save' => 'A creature can repeat the saving throw :duration, ending the effect on itself on a success.',
    'desc_condition_immunity' => 'If a creature\'s saving throw is successful or the effect ends for it, the creature is immune to the :creature_type\'s :feature_name for the next :duration.',

    'name_melee_attack' => 'Melee Attack',
    'desc_attack' => '<i>:attack_range :attack_type:</i> :attack_bonus to hit, :range :targets.',
    'reach' => 'reach :reach_distance',
    'range' => 'range :range_distance_low/:range_distance_high',
    'reach_or_range' => 'reach :reach_distance or range :range_distance_low/:range_distance_high',
    'num_of_targets' => ':target_count target|:target_count targets',
    'the_target' => 'the target|the targets',
    'each_target' => 'the target|each target',

    'name_multiattack' => 'Multiattack', 
    'desc_multiattack' => 'The :creature_type makes :multiattack.', 

    'name_use_a_skill' => 'Use A Skill',
    'desc_use_a_skill' => 'The :creature_type makes a :ability (:skill) check.',

    'name_claws' => 'Claws', 
    'name_frightful_presence' => 'Frightful Presence', 

    'name_legendary_resistance' => 'Legendary Resistance (3/Day).',
    'desc_legendary_resistance' => 'If the :creature_type fails a saving throw, it can choose to succeed instead.',

    //Feature Modifiers
    'additionally' => 'Additionally, :addition',
    'desc_modifier_damage' => 'plus :damage_roll :damage_type damage',
    'desc_attack_saving_throw_condition' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw or :condition',
    'desc_attack_saving_throw_damage' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw, taking :damage on a failed save:half_as_much',
    'desc_attack_saving_throw_damage_condition' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw, taking :damage on a failed save and :condition:half_as_much :not_condition',
    'desc_attack_saving_throw_damage_condition_separated' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw. On a failed save, :target_text takes :damage and :condition:. half_as_much :not_condition',
    'desc_saving_throw_half_on_success' => ', or half as much damage on a successful one',
    'desc_saving_throw_on_success_take_half' => 'On a successful save, :target_text takes half as much damage',

    //--
    'title_new_feature' => 'New Feature',
    'title_feature_name' => 'Feature Name',
    'title_feature_options' => 'Feature Options',
    'title_attack_ability' => 'Attack Ability',
    'title_spellcasting_ability' => 'Spellcasting Ability',
    'title_feature_template' => 'Feature Template',
    'title_attack_type' => 'Attack Type',
    'title_target_type' => 'Target Type',
    'title_attack_range' => 'Attack Range',
    'title_reach_distance' => 'Reach Distance',
    'title_range_distance' => 'Range Distance',
    'title_damage_dice' => 'Damage Dice',
    'title_saving_throw_ability' => 'Ability for Save',
    'title_saving_throw_monster_ability' => 'Ability Used For Effect',
    'title_additional_saving_throw' => 'Additional Saving Throw',
    'title_targets' => 'Targets',
    'title_half_on_success' => 'Half Damage on Success',
    'title_damage_type' => 'Damage Type',
    'title_ability_bonus' => 'Ability Bonus',
    'title_saving_throw_conditions' => 'Conditions Applied',
    'title_ongoing_damage' => 'Ongoing Damage',
];