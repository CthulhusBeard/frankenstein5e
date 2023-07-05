<?php

return [
    'desc_attack_hit' => 'Hit:',
    'desc_attack_miss' => 'Miss:',
    'desc_saving_throw' => 'Each creature :target_choice that is within :range feet of the :target_area :is_aware must succeed on a DC :save_dc :save_ability saving throw. On a failed save, :target_text :condition for :duration :takes_damage. :successful_save',
    'desc_deal_damage' => ':damage_roll :damage_type damage', //4d8 lightning damage
    'desc_successful_save' => 'On a successful save :half_damage :condition',
    'desc_can_use' => 'can use',

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

    'proximity_target' => 'each creature within :target_area of the :creature_name',
    'touch_target' => 'the :creature_name touches a creature. The target|the :creature_name touches :target_count creatures. The targets',
    'range_target' => 'the :creature_name targets a creature within :target_area. The target|the :creature_name targets :target_count creatures within :target_area. Each target',
    'cone_target' => 'each creature within a :target_area cone',
    'cube_target' => 'each creature within a :target_area cube',
    'sphere_target' => 'each creature within a :target_area radius sphere',
    'line_target' => 'each creature within a :target_area line that is :line_width wide',

    'name_use_a_skill' => 'Use A Skill',
    'desc_use_a_skill' => 'The :creature_name makes a :ability (:skill) check.',

    'title_additional_description' => 'Additional Feature Text',

    //Multiattack
    'name_multiattack' => 'Multiattack', 
    'desc_multiattack' => 'The :creature_name :multiattack_descriptions.',
    'desc_multiattack_alternative' => 'Alternatively, it :multiattack_descriptions.',
    'desc_multiattack_either' => 'can either :multiattack_options',
    'desc_multiattack_attack' => 'makes :use_count :ability_name :attack_text',
    'desc_multiattack_ability' => ':can_use :ability_name :use_count_semantics',
    'desc_multiattack_spell' => 'casts :use_count spell|casts :use_count spells',

    //Spellcasting
    'desc_spellcasting' => 'The :creature_name is :caster_level_article :caster_level level spellcaster. Its spellcasting ability is :spellcasting_ability (spell save DC :spell_save_dc, :spell_hit to hit with spell attacks). It:at_will_spells can cast the following spells:',
    'desc_prepared_spellcasting' => 'The :creature_name is :caster_level_article :caster_level level spellcaster. Its spellcasting ability is :spellcasting_ability (spell save DC :spell_save_dc, :spell_hit to hit with spell attacks). It:at_will_spells has the following:spellcasting_class spells prepared:',
    'desc_innate_spellcasting' => 'The :creature_name\'s innate spellcasting ability is :spellcasting_ability (spell save DC :spell_save_dc, :spell_hit to hit with spell attacks). It can innately cast the following spells, requiring no components:',
    'desc_at_will_spells' => ' can cast :at_will_spell_list at will and',
    'title_innate_spellcasting' => 'Innate Spellcasting',
    'title_prepared_spellcasting_class' => 'Prepared Spellcasting Class',

    //Feature Modifiers
    'additionally' => 'Additionally, :addition',
    'desc_modifier_damage' => 'plus :damage_roll :damage_type damage',
    'desc_attack_saving_throw_condition' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw or :condition:condition_duration.:repeat_condition_save',
    'desc_attack_saving_throw_damage' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw, taking :damage on a failed save:half_as_much.',
    'desc_attack_saving_throw_damage_condition' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw, taking :damage on a failed save and :condition:condition_duration:half_as_much:not_condition.:repeat_condition_save',
    'desc_attack_saving_throw_damage_condition_separated' => ':target_text must make a DC :saving_throw_dc :saving_throw_ability saving throw. On a failed save, :target_text takes :damage and :condition::condition_duration. :half_as_much:not_condition.:repeat_condition_save',
    'desc_saving_throw_half_on_success' => ', or half as much damage on a successful one',
    'desc_saving_throw_on_success_take_half' => 'On a successful save, :target_text takes half as much damage',

    'repeat_condition_saving_throw_text' => 'A :condition creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',

    'desc_ongoing_damage_generic' => ':flavour_descriptionUntil :ongoing_end_condition, the target takes :damage_amount :damage_occurance.',
    'desc_ongoing_damage_flavour_onfire' => 'If the target is a creature or a flammable object, it ignites.',
    
    'desc_ongoing_damage_end_generic' => 'a creature takes :action_type to end the effect',
    'desc_ongoing_damage_end_onfire' => 'a creature takes :action_type to douse the fire',

    //Legendary Resistance
    'desc_legendary_resistances' => 'If the :creature_name fails a saving throw, it can choose to succeed instead.',

    //Passive Features
    'desc_multiple_reactions' => 'The :creature_name makes ',

    //Editor Titles
    'title_new_feature' => 'New Feature',
    'title_feature_name' => 'Feature Name',
    'title_mythic_feature_name' => 'Mythic Feature Name',
    'title_spellcasting' => 'Spellcasting',
    'title_spellcasting_feature_name' => 'Spellcasting Feature Name',
    'title_feature_options' => 'Feature Options',
    'title_attack_ability' => 'Attack Ability',
    'title_spellcasting_ability' => 'Spellcasting Ability',
    'title_feature_template' => 'Feature Template',
    'title_attack_type' => 'Attack Type',
    'title_target_type' => 'Target Type',
    'title_line_width' => 'Line Width',
    'title_attack_range' => 'Attack Range',
    'title_reach_distance' => 'Reach Distance',
    'title_range_distance' => 'Range Distance',
    'title_damage_dice' => 'Damage Dice',
    'title_regeneration_dice' => 'Regeneration Dice',
    'title_saving_throw_ability' => 'Ability for Save',
    'title_saving_throw_monster_ability' => 'Ability Used For Effect',
    'title_additional_saving_throw' => 'Additional Saving Throw',
    'title_targets' => 'Targets',
    'title_half_on_success' => 'Half Damage on Success',
    'title_damage_type' => 'Damage Type',
    'title_ability_bonus' => 'Ability Bonus',
    'title_saving_throw_conditions' => 'Conditions Applied',
    'title_ongoing_damage' => 'Ongoing Damage',
    'title_add_damage_die' => '+ Damage Die',
    'title_add_regeneration_die' => '+ Regeneration Die',

    'title_on_failed_save' => 'Requires Failed Save',
    'title_damage_occurance' => 'Damage Occurs',
    'title_damage_duration' => 'Duration',
    'title_condition_duration' => 'Condition Duration',


    //Features
    'name_legendary_resistance' => 'Legendary Resistance',
    'desc_legendary_resistance' => 'TODO',
    'name_spellcasting' => 'Spellcasting',
    //'desc_spellcasting' => 'TODO',
    'name_innate_spellcasting' => 'Innate Spellcasting',
    //'desc_innate_spellcasting' => 'TODO',
    'name_half_caster' => 'Spellcasting (Half Caster)',
    
    'name_amphibious' => 'Amphibious',
    'desc_amphibious' => 'TODO',
    'name_breath_water' => 'Breath Water',
    'desc_breath_water' => 'TODO',
    'name_immutable_form' => 'Immutable Form',
    'desc_immutable_form' => 'TODO',
    'name_fey_ancestry' => 'Fey Ancestry',
    'desc_fey_ancestry' => 'TODO',
    'name_stout_resilience' => 'Stout Resilience',
    'desc_stout_resilience' => 'TODO',
    'name_sunlight_sensitivity' => 'Sunlight Sensitivity',
    'desc_sunlight_sensitivity' => 'TODO',
    'name_breath_weapon' => 'Breath Weapon',
    'desc_breath_weapon' => 'TODO',
    'name_wing_attack' => 'Wing Attack',
    'desc_wing_attack' => 'TODO',
    'name_tail_attack' => 'Tail Attack',
    'desc_tail_attack' => 'TODO',

];