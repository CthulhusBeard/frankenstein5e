 <?php

 return [
    'proximity_target' => 'each creature within :target_area of the :creature_name',
    'touch_target' => 'the :creature_name touches a creature. The target|the :creature_name touches :target_count:friendly_hostile creatures. The targets',
    'ranged_target' => 'the :creature_name targets a creature within :target_area The target|the :creature_name targets :target_count:friendly_hostile creatures within :target_area. Each target',
    'cone_target' => 'the :creature_name creates a :target_area cone originating from itself. Each:friendly_hostile creature within the cone',
    'cube_target' => 'the :creature_name creates a :target_area cube adjecent to itself. Each:friendly_hostile creature within the cube|the :creature_name creates a :target_area cube within :target_range Each :friendly_hostile creature within the cube',
    'sphere_target' => 'the :creature_name creates a :target_area sphere centered on itself. Each:friendly_hostile creature within the sphere|the :creature_name creates a :target_area sphere within :target_range Each :friendly_hostile creature within the sphere',
    'line_target' => 'the :creature_name creates a :target_range line that is :target_area wide. Each:friendly_hostile creature in that line',
 ];