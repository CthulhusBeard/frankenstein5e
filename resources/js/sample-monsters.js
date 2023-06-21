export { monsters };

let monsters = [

    {"name":"Owl","size":"tiny","type":"beast","alignment":"unaligned","abilities":{"str":3,"dex":13,"con":8,"int":2,"wis":12,"cha":7},"skills":["perception","stealth"],"senses":{"darkvision":{"distance":"120"}},"features":{"passive":[{"actionType":"passive","name":"Flyby","custom":{"description":"The :creature_name doesn't provoke opportunity attacks when it flies out of an enemy's reach."},"trackingId":"y2eu1imIXYWVmv5"},{"actionType":"passive","name":"Keen Hearing and Sight","custom":{"description":"The :creature_name has advantage on Wisdom (Perception) checks that rely on hearing or sight."},"trackingId":"sD2sjVfTbfDPfPs"}],"action":[{"actionType":"action","name":"Talons","template":"attack","attack":{"ability":"dex","damage":[{"diceAmount":"0"}]},"trackingId":"JxkQWZLAOaTtSJX"}]},"cr":0},
    {"name":"Bandit","type":"humanoid","subtypes":["any"],"alignment":"non_lawful","showTypicalAlignment":false,"armorClass":{"type":"leather"},"hitPoints":{"diceType":8,"diceAmount":"2"},"abilities":{"str":11,"dex":12,"con":12},"features":{"action":[{"actionType":"action","name":"Scimitar","template":"attack","attack":{"ability":"dex"},"trackingId":"vc2tjxovD1PZL54"},{"actionType":"action","name":"Light Crossbow","template":"attack","targetType":"ranged","attack":{"ability":"dex","range":{"low":"80","high":"320"},"damage":[{"diceType":8,"type":"piercing"}]},"trackingId":"rGNCsLMvgMncyaH"}]},"cr":"1/8"},
    {"name":"Skeleton","type":"undead","alignment":"lawful_evil","armorClass":{"type":"custom","manual":13},"hitPoints":{"diceType":8,"diceAmount":"2"},"abilities":{"dex":14,"con":15,"int":6,"wis":8,"cha":5},"damageImmunities":["poison"],"damageVulnerabilites":["bludgeoning"],"conditionImmunities":["exhaustion","poisoned"],"languages":{"spokenWritten":["languages_it_knew_in_life"],"cantSpeak":true},"senses":{"darkvision":{"distance":"60"}},"features":{"action":[{"actionType":"action","name":"Shortsword","template":"attack","attack":{"ability":"dex"},"trackingId":"cS5DbJ6dSX1uhOo"},{"actionType":"action","name":"Shortbow","template":"attack","targetType":"ranged","attack":{"ability":"dex","range":{"low":"80","high":"320"}},"trackingId":"EikSQkeb1dgOO0k"}]},"cr":"1/2"},
    
];