export { monsters };

let monsters = [

    {"name":"Owl","size":"tiny","type":"beast","alignment":"unaligned","abilities":{"str":3,"dex":13,"con":8,"int":2,"wis":12,"cha":7},"skills":["perception","stealth"],"senses":{"darkvision":{"distance":"120"}},"features":{"passive":[{"name":"Flyby","custom":{"description":"The :creature_name doesn't provoke opportunity attacks when it flies out of an enemy's reach."}},{"name":"Keen Hearing and Sight","custom":{"description":"The :creature_name has advantage on Wisdom (Perception) checks that rely on hearing or sight."}}],"action":[{"name":"Talons","template":"attack","attack":{"ability":"dex","damage":[{"diceAmount":"0"}]}}]}},

    


];