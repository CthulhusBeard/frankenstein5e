export { monsters };

let monsters = [

{"name":"Brown Bear","shortName":"","isNameProperNoun":false,"size":"large","type":"beast","subtype":"","typeCategory":"mammal","alignment":"unaligned","showTypicalAlignment":false,"armorClass":{"type":"natural","manual":11,"bonus":"0","stealthDis":false,"shield":false,"mageArmor":false},"hitPoints":{"diceType":10,"diceAmount":"4","additional":0},"abilities":{"str":19,"dex":10,"con":16,"int":2,"wis":13,"cha":7},"savingThrows":{"str":false,"dex":false,"con":false,"int":false,"wis":false,"cha":false},"damageResistances":[],"damageImmunities":[],"damageVulnerabilites":[],"conditionImmunities":[],"skills":["perception"],"languages":{"spokenWritten":["common"],"doesntSpeak":[],"telepathy":0},"speeds":{"walk":40,"fly":0,"swim":0,"climb":30,"burrow":0},"hover":false,"senses":{"darkvision":{"distance":0,"modifier":false},"blindsight":{"distance":0,"modifier":false},"tremorsense":{"distance":0,"modifier":false},"truesight":{"distance":0,"modifier":false}},"manualOverride":{"proficiency":0,"casterLevel":0},"targetCR":{"offensive":{},"defensive":{}},"mythicTrait":{"name":"Mythic Trait","description":"When the :creature_name is reduced to 0 hit points, it doesn't die or fall unconscious. Instead, it does something epic.","recharge":"short_rest","restoreHitPoints":true},"legendaryActions":3,"reactions":1,"actions":1,"bonusActions":1,"features":{"passive":[{"actionType":"passive","name":"Keen Smell","template":"custom","passiveTrigger":"start_of_turn","attackAbility":"str","targetType":"melee","attackType":"weapon","attackRange":{"low":20,"high":60},"attackReach":5,"attackDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":true,"type":"slashing"}],"attackSavingThrow":false,"attackTargets":1,"aoeRange":30,"savingThrowMonsterAbility":"str","savingThrowSaveAbilities":["str"],"savingThrowDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"savingThrowHalfOnSuccess":true,"savingThrowConditions":[],"hasOngoingDamage":false,"ongoingDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"ongoingDamageOccurs":"start_of_turn","ongoingDamageOnFailedSave":true,"ongoingDamageRepeatSave":false,"ongoingDamageDuration":"ongoing","recharge":{"type":"none","diceType":6,"minRoll":5,"uses":1},"regenerate":{"type":"none","amount":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false}],"customText":"The :creature_name regains :regenerate_hit_point_amount hit points."},"spellcastingAbility":"int","innateSpellcasting":false,"spellcastingClass":"","spellList":[],"spellSlots":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"customDamage":[],"customDescription":"The\t:creature_name has advantage on Wisdom (Perception) checks that rely on smell.","additionalDescription":"","multiattackReferences":[[],[]],"existingFeatureReferenceId":null,"legendaryActionCost":1,"legendaryResistances":3,"manualDPR":-1,"manualMaxDPR":-1,"trackingId":"r1vy3WI834j36s3"}],"multiattack":[{"actionType":"multiattack","name":"Multiattack","template":"multiattack","passiveTrigger":"start_of_turn","attackAbility":"str","targetType":"melee","attackType":"weapon","attackRange":{"low":20,"high":60},"attackReach":5,"attackDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":true,"type":"slashing"}],"attackSavingThrow":false,"attackTargets":1,"aoeRange":30,"savingThrowMonsterAbility":"str","savingThrowSaveAbilities":["str"],"savingThrowDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"savingThrowHalfOnSuccess":true,"savingThrowConditions":[],"hasOngoingDamage":false,"ongoingDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"ongoingDamageOccurs":"start_of_turn","ongoingDamageOnFailedSave":true,"ongoingDamageRepeatSave":false,"ongoingDamageDuration":"ongoing","recharge":{"type":"none","diceType":6,"minRoll":5,"uses":1},"regenerate":{"type":"none","amount":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false}],"customText":"The :creature_name regains :regenerate_hit_point_amount hit points."},"spellcastingAbility":"int","innateSpellcasting":false,"spellcastingClass":"","spellList":[],"spellSlots":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"customDamage":[],"customDescription":"","additionalDescription":"","multiattackReferences":[[{"id":"Jo5icelufXkT88m","uses":1},{"id":"V8MkmB1EDLbDJ8E","uses":1}],[]],"existingFeatureReferenceId":null,"legendaryActionCost":1,"legendaryResistances":3,"manualDPR":-1,"manualMaxDPR":-1,"trackingId":"9FEy5QqVjySGWdc"}],"action":[{"actionType":"action","name":"Bite","template":"attack","passiveTrigger":"start_of_turn","attackAbility":"str","targetType":"melee","attackType":"weapon","attackRange":{"low":20,"high":60},"attackReach":5,"attackDamage":[{"diceType":8,"diceAmount":1,"additional":0,"abilityBonus":true,"type":"slashing"}],"attackSavingThrow":false,"attackTargets":1,"aoeRange":30,"savingThrowMonsterAbility":"str","savingThrowSaveAbilities":["str"],"savingThrowDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"savingThrowHalfOnSuccess":true,"savingThrowConditions":[],"hasOngoingDamage":false,"ongoingDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"ongoingDamageOccurs":"start_of_turn","ongoingDamageOnFailedSave":true,"ongoingDamageRepeatSave":false,"ongoingDamageDuration":"ongoing","recharge":{"type":"none","diceType":6,"minRoll":5,"uses":1},"regenerate":{"type":"none","amount":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false}],"customText":"The :creature_name regains :regenerate_hit_point_amount hit points."},"spellcastingAbility":"int","innateSpellcasting":false,"spellcastingClass":"","spellList":[],"spellSlots":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"customDamage":[],"customDescription":"","additionalDescription":"","multiattackReferences":[[],[]],"existingFeatureReferenceId":null,"legendaryActionCost":1,"legendaryResistances":3,"manualDPR":-1,"manualMaxDPR":-1,"trackingId":"Jo5icelufXkT88m"},{"actionType":"action","name":"Claws","template":"attack","passiveTrigger":"start_of_turn","attackAbility":"str","targetType":"melee","attackType":"weapon","attackRange":{"low":20,"high":60},"attackReach":5,"attackDamage":[{"diceType":6,"diceAmount":2,"additional":0,"abilityBonus":true,"type":"slashing"}],"attackSavingThrow":false,"attackTargets":1,"aoeRange":30,"savingThrowMonsterAbility":"str","savingThrowSaveAbilities":["str"],"savingThrowDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"savingThrowHalfOnSuccess":true,"savingThrowConditions":[],"hasOngoingDamage":false,"ongoingDamage":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false,"type":"slashing"}],"ongoingDamageOccurs":"start_of_turn","ongoingDamageOnFailedSave":true,"ongoingDamageRepeatSave":false,"ongoingDamageDuration":"ongoing","recharge":{"type":"none","diceType":6,"minRoll":5,"uses":1},"regenerate":{"type":"none","amount":[{"diceType":4,"diceAmount":1,"additional":0,"abilityBonus":false}],"customText":"The :creature_name regains :regenerate_hit_point_amount hit points."},"spellcastingAbility":"int","innateSpellcasting":false,"spellcastingClass":"","spellList":[],"spellSlots":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"customDamage":[],"customDescription":"","additionalDescription":"","multiattackReferences":[[],[]],"existingFeatureReferenceId":null,"legendaryActionCost":1,"legendaryResistances":3,"manualDPR":-1,"manualMaxDPR":-1,"trackingId":"V8MkmB1EDLbDJ8E"}]},"display":{"columns":1},"number":1},



    {
        "id": "Oznkd8ZvXj68D73",
        "name": "Devourer",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "large",
        "type": "fiend",
        "subtype": "",
        "typeCategory": "",
        "alignment": "chaotic_evil",
        "showTypicalAlignment": false,
        "armorClass": {
            "type": "natural",
            "manual": 16,
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 10,
            "diceAmount": 17,
            "additional": 0
        },
        "abilities": {
            "str": 20,
            "dex": 12,
            "con": 20,
            "int": 13,
            "wis": 10,
            "cha": 16
        },
        "savingThrows": {
            "str": false,
            "dex": false,
            "con": false,
            "int": false,
            "wis": false,
            "cha": false
        },
        "damageResistances": [
            "fire",
            "cold",
            "lightning"
        ],
        "damageImmunities": [
            "poison"
        ],
        "damageVulnerabilites": [],
        "conditionImmunities": [
            "poisoned"
        ],
        "skills": [],
        "languages": {
            "spokenWritten": [
                "abyssal"
            ],
            "doesntSpeak": [],
            "telepathy": 120
        },
        "speeds": {
            "walk": 30,
            "fly": 0,
            "swim": 0,
            "climb": 0,
            "burrow": 0
        },
        "hover": false,
        "senses": {
            "darkvision": {
                "distance": 0,
                "modifier": false
            },
            "blindsight": {
                "distance": 0,
                "modifier": false
            },
            "tremorsense": {
                "distance": 0,
                "modifier": false
            },
            "truesight": {
                "distance": 0,
                "modifier": false
            }
        },
        "manualOverride": {
            "proficiency": 0,
            "casterLevel": 0
        },
        "targetCR": {
            "offensive": {},
            "defensive": {}
        },
        "hasLegendaryActions": true,
        "hasMythicActions": false,
        "legendaryActions": 3,
        "reactions": 1,
        "actions": 1,
        "bonusActions": 1,
        "features": {
            "passive": [],
            "spellcasting": [],
            "multiattack": [
                {
                    "id": "IPDynjbgtqzN9d8",
                    "actionType": "multiattack",
                    "name": "Multiattack",
                    "template": "multiattack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [
                            {
                                "index": 0,
                                "uses": 2
                            },
                            {
                                "index": 1,
                                "uses": 1
                            }
                        ],
                        [
                            {
                                "index": 0,
                                "uses": 2
                            },
                            {
                                "index": 2,
                                "uses": 1
                            }
                        ]
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "maxDPR": 110
                }
            ],
            "action": [
                {
                    "id": "KZl4BaPjEVp7Dej",
                    "actionType": "action",
                    "name": "Claw",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 6,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        },
                        {
                            "diceType": 6,
                            "diceAmount": 6,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "necrotic"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "maxDPR": 53
                },
                {
                    "id": "OHUVFsCqqNsZGWA",
                    "actionType": "action",
                    "name": "Imprison Soul",
                    "template": "custom",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "The devourer chooses a living humanoid with 0 hit points that it can see within 30 feet of it. That creature is teleported inside the devourer’s ribcage and imprisoned there. A creature imprisoned in this manner has disadvantage on death saving throws. If it dies while imprisoned, the devourer regains 25 hit points, immediately recharges Soul Rend, and gains an additional action on its next turn. Additionally, at the\nstart of its next turn, the devourer regurgitates the slain creature as a bonus action, and the creature becomes an undead. If the victim had 2 or fewer Hit Dice, it becomes a zombie. If it had 3 to 5 Hit Dice, it becomes a ghoul. Otherwise, it becomes a wight. A devourer can imprison only one creature at a time.",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "maxDPR": 0
                },
                {
                    "id": "D9Hpd09e45BhVIC",
                    "actionType": "action",
                    "name": "Soul Rend",
                    "template": "custom",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "dice_roll",
                        "diceType": 6,
                        "minRoll": 6,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [
                        {
                            "diceType": 10,
                            "diceAmount": 8,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "necrotic"
                        }
                    ],
                    "customDescription": "The devourer creates a vortex of life-draining energy in a 20-foot radius centered on itself. Each humanoid in that area must make a DC 18 Constitution saving throw, taking 44 (8d10) necrotic damage on a failed save, or half as much damage on a successful one. Increase the damage by 10 for each living humanoid with 0 hit points in that area.",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "maxDPR": 80
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "display": {
            "columns": 2
        }
    },
    {
        "id": "0rCTajunzGnVKZO",
        "name": "Fire Giant",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "huge",
        "type": "giant",
        "subtype": "",
        "typeCategory": "",
        "alignment": "lawful_evil",
        "showTypicalAlignment": false,
        "armorClass": {
            "type": "plate",
            "manual": "10",
            "name": "No Armor",
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 12,
            "diceAmount": 13,
            "additional": 0
        },
        "abilities": {
            "str": 25,
            "dex": 9,
            "con": 23,
            "int": 10,
            "wis": 14,
            "cha": 13
        },
        "savingThrows": {
            "str": false,
            "dex": true,
            "con": true,
            "int": false,
            "wis": false,
            "cha": true
        },
        "damageResistances": [],
        "damageImmunities": [
            "fire"
        ],
        "damageVulnerabilites": [],
        "conditionImmunities": [],
        "skills": [
            "athletics",
            "perception"
        ],
        "languages": {
            "spokenWritten": [
                "giant"
            ],
            "doesntSpeak": [],
            "telepathy": 0
        },
        "speeds": {
            "walk": 30,
            "fly": 0,
            "swim": 0,
            "climb": 0,
            "burrow": 0
        },
        "hover": false,
        "senses": {
            "darkvision": {
                "distance": 0,
                "modifier": false
            },
            "blindsight": {
                "distance": 0,
                "modifier": false
            },
            "tremorsense": {
                "distance": 0,
                "modifier": false
            },
            "truesight": {
                "distance": 0,
                "modifier": false
            }
        },      
        "manualOverride": {
            "proficiency": 0,
            "casterLevel": 0
        },
        "targetCR": {
            "offensive": {},
            "defensive": {}
        },
        "hasLegendaryActions": true,
        "hasMythicActions": false,
        "legendaryActions": 3,
        "reactions": 1,
        "actions": 1,
        "bonusActions": 1,
        "features": {
            "passive": [],
            "spellcasting": [],
            "action": [
                {
                    "id": "SilYqbrexyQihQs",
                    "actionType": "action",
                    "name": "Greatsword",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 10,
                    "attackDamage": [
                        {
                            "diceType": 6,
                            "diceAmount": 6,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 28,
                    "damageProjection": [
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        },
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        },
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        },
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        },
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        },
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        },
                        {
                            "name": "Greatsword",
                            "damage": 28,
                            "actionCost": 1
                        }
                    ]
                },
                {
                    "id": "NlyI2UjBt1RXcnD",
                    "actionType": "action",
                    "name": "Rock",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "ranged",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 60,
                        "high": 250
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 10,
                            "diceAmount": 4,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "bludgeoning"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 29,
                    "damageProjection": [
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        },
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        },
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        },
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        },
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        },
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        },
                        {
                            "name": "Rock",
                            "damage": 29,
                            "actionCost": 1
                        }
                    ]
                },
            ],
            "multiattack": [
                {
                    "id": "iA1zFqhhnyd3m3L",
                    "actionType": "multiattack",
                    "name": "Multiattack",
                    "template": "multiattack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [
                            {
                                "index": 0,
                                "uses": 2
                            }
                        ],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 56,
                    "damageProjection": []
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "display": {
            "columns": 2
        },
        "averageDPR": -1,
        "damageProjection": []
    },
    {
        "id": "exu75CiNirEFDeY",
        "name": "Glabrezu",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "large",
        "type": "fiend",
        "subtype": "demon",
        "typeCategory": "",
        "alignment": "chaotic_evil",
        "showTypicalAlignment": false,
        "armorClass": {
            "type": "natural",
            "manual": 17,
            "name": "No Armor",
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 10,
            "diceAmount": 15,
            "additional": 0
        },
        "abilities": {
            "str": 20,
            "dex": 15,
            "con": 21,
            "int": 19,
            "wis": 17,
            "cha": 16
        },
        "savingThrows": {
            "str": true,
            "dex": false,
            "con": true,
            "int": false,
            "wis": true,
            "cha": true
        },
        "damageResistances": [
            "fire",
            "cold",
            "lightning",
            "physical_non_magical"
        ],
        "damageImmunities": [
            "poison"
        ],
        "damageVulnerabilites": [],
        "conditionImmunities": [
            "poisoned"
        ],
        "skills": [],
        "languages": {
            "spokenWritten": [
                "abyssal"
            ],
            "doesntSpeak": [],
            "telepathy": 60
        },
        "speeds": {
            "walk": 40,
            "fly": 0,
            "swim": 0,
            "climb": 0,
            "burrow": 0
        },
        "hover": false,
        "senses": {
            "darkvision": {
                "distance": 0,
                "modifier": false
            },
            "blindsight": {
                "distance": 0,
                "modifier": false
            },
            "tremorsense": {
                "distance": 0,
                "modifier": false
            },
            "truesight": {
                "distance": 120,
                "modifier": false
            }
        },
        "manualOverride": {
            "proficiency": 0,
            "casterLevel": 0
        },
        "targetCR": {
            "offensive": {},
            "defensive": {}
        },
        "hasLegendaryActions": true,
        "hasMythicActions": false,
        "legendaryActions": 3,
        "reactions": 1,
        "actions": 1,
        "bonusActions": 1,
        "features": {
            "passive": [
                {
                    "id": "M9yTsRg7xfkC6F7",
                    "actionType": "passive",
                    "name": "Magic Resistance",
                    "template": "custom",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "The :creature_name has advantage on saving throws against spells and other magical effects.",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 0,
                    "damageProjection": [
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Magic Resistance",
                            "damage": 0,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "spellcasting": [
                {
                    "id": "cQmrOCWMvMf25oy",
                    "actionType": "spellcasting",
                    "name": "Innate Spellcasting",
                    "template": "spellcasting",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": true,
                    "spellList": [
                        {
                            "name": "Darkness",
                            "level": "1",
                            "cast_before": false,
                            "at_will": true,
                            "uses": 1
                        },
                        {
                            "name": "Detect Magic",
                            "level": "2",
                            "cast_before": false,
                            "at_will": true,
                            "uses": 1
                        },
                        {
                            "name": "Dispel Magic",
                            "level": "3",
                            "cast_before": false,
                            "at_will": true,
                            "uses": 1
                        },
                        {
                            "name": "Confusion",
                            "level": "4",
                            "cast_before": false,
                            "at_will": false,
                            "uses": 1
                        },
                        {
                            "name": "Fly",
                            "level": "3",
                            "cast_before": false,
                            "at_will": false,
                            "uses": 1
                        },
                        {
                            "name": "Power Word Stun",
                            "level": "5",
                            "cast_before": false,
                            "at_will": false,
                            "uses": 1
                        }
                    ],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 30,
                    "damageProjection": [
                        {
                            "name": "Spellcasting: 5th Level",
                            "damage": 30,
                            "spellLevel": "5",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 4th Level",
                            "damage": 18,
                            "spellLevel": "4",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 2nd Level",
                            "damage": 9,
                            "spellLevel": "2",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 1st Level",
                            "damage": 7,
                            "spellLevel": "1",
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "multiattack": [
                {
                    "id": "x8p8cosVgzYrXdN",
                    "actionType": "multiattack",
                    "name": "Multiattack",
                    "template": "multiattack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [
                            {
                                "index": 0,
                                "uses": 2
                            },
                            {
                                "index": 1,
                                "uses": 2
                            }
                        ],
                        [
                            {
                                "index": 0,
                                "uses": 2
                            },
                            {
                                "index": "spellcasting",
                                "uses": 1
                            }
                        ]
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 62,
                    "damageProjection": []
                }
            ],
            "action": [
                {
                    "id": "xn6a7ZKckpTAAl2",
                    "actionType": "action",
                    "name": "Pincer",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 10,
                    "attackDamage": [
                        {
                            "diceType": 10,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "bludgeoning"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 16,
                    "damageProjection": [
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Pincer",
                            "damage": 16,
                            "actionCost": 1
                        }
                    ],
                    "additionalDescription": "If the target is a Medium or smaller creature, it is grappled (escape DC 15). The :creature_name has two pincers, each of which can grapple only one target."
                },
                {
                    "id": "WFW8sinyVmRAQF7",
                    "actionType": "action",
                    "name": "Fist",
                    "template": "attack",
                    "attackAbility": "dex",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 2,
                            "additional": "0",
                            "abilityBonus": true,
                            "type": "bludgeoning"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 7,
                    "damageProjection": [
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Fist",
                            "damage": 7,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "display": {
            "columns": 2
        },
        "averageDPR": -1,
        "damageProjection": []
    },
    {
        "id": "iQKF3rSyy2PWMA4",
        "name": "Dragon Mage",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "huge",
        "type": "dragon",
        "subtype": "",
        "typeCategory": "",
        "alignment": "",
        "showTypicalAlignment": true,
        "armorClass": {
            "type": "none",
            "manual": "10",
            "name": "No Armor",
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 12,
            "diceAmount": 1,
            "additional": 0
        },
        "abilities": {
            "str": 10,
            "dex": 10,
            "con": 10,
            "int": 10,
            "wis": 10,
            "cha": 10
        },
        "savingThrows": {
            "str": false,
            "dex": false,
            "con": false,
            "int": false,
            "wis": false,
            "cha": false
        },
        "damageResistances": [],
        "damageImmunities": [],
        "damageVulnerabilites": [],
        "conditionImmunities": [],
        "skills": [],
        "languages": {
            "spokenWritten": [
                "common"
            ],
            "doesntSpeak": [],
            "telepathy": 0
        },
        "speeds": {
            "walk": 30,
            "fly": 0,
            "swim": 0,
            "climb": 0,
            "burrow": 0
        },
        "hover": false,
        "senses": {
            "darkvision": 0,
            "blindsight": 0,
            "tremorsense": 0,
            "truesight": 0
        },  
        "manualOverride": {
            "proficiency": 0,
            "casterLevel": 0
        },
        "targetCR": {
            "offensive": {},
            "defensive": {}
        },
        "hasLegendaryActions": true,
        "hasMythicActions": false,
        "legendaryActions": 3,
        "reactions": 1,
        "actions": 1,
        "features": {
            "passive": [
                {
                    "id": "cLtMx9zADxhDeTD",
                    "actionType": "passive",
                    "name": "New Feature",
                    "template": "custom",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 0,
                    "damageProjection": [
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "New Feature",
                            "damage": 0,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "spellcasting": [
                {
                    "id": "VnHzeF9yqPMtTxt",
                    "actionType": "spellcasting",
                    "name": "Spellcasting",
                    "template": "spellcasting",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [
                        {
                            "name": "Meteor Swarm",
                            "level": "9",
                            "cast_before": false,
                            "at_will": false,
                            "uses": 1
                        },
                        {
                            "name": "Flame Strike",
                            "level": "5",
                            "cast_before": false,
                            "at_will": false,
                            "uses": 1
                        },
                        {
                            "name": "Fireball",
                            "level": "3",
                            "cast_before": false,
                            "at_will": false,
                            "uses": 1
                        }
                    ],
                    "spellSlots": {
                        "0": 1,
                        "1": 0,
                        "2": 0,
                        "3": 3,
                        "4": 0,
                        "5": 2,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 1
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 90,
                    "damageProjection": [
                        {
                            "name": "Spellcasting: 9th Level",
                            "damage": 90,
                            "spellLevel": "9",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 5th Level",
                            "damage": 30,
                            "spellLevel": "5",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 5th Level",
                            "damage": 30,
                            "spellLevel": "5",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        },
                        {
                            "name": "Spellcasting: 3rd Level",
                            "damage": 14,
                            "spellLevel": "3",
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "action": [
                {
                    "id": "Eb5Aj01lmAkmHtZ",
                    "actionType": "action",
                    "name": "Medium Attack",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 10,
                            "diceAmount": 3,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "necrotic"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "limited_use",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 2
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 1,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 16,
                    "damageProjection": [
                        {
                            "name": "Medium Attack",
                            "damage": 16,
                            "actionCost": 1
                        },
                        {
                            "name": "Medium Attack",
                            "damage": 16,
                            "actionCost": 1
                        }
                    ]
                },
                {
                    "id": "4HQMzGebPygWx5k",
                    "actionType": "action",
                    "name": "Big Save",
                    "template": "saving_throw",
                    "attackAbility": "str",
                    "targetType": "line",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str",
                        "dex"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 6,
                            "diceAmount": 6,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "fire"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "dice_roll",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 1,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 31.5,
                    "damageProjection": [
                        {
                            "name": "Big Save",
                            "damage": 31.5,
                            "actionCost": 1
                        },
                        null,
                        null,
                        {
                            "name": "Big Save",
                            "damage": 31.5,
                            "actionCost": 1
                        },
                        null,
                        null,
                        {
                            "name": "Big Save",
                            "damage": 31.5,
                            "actionCost": 1
                        }
                    ]
                },
                {
                    "id": "hfL8tEVQOIDn48N",
                    "actionType": "action",
                    "name": "Small Attack",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 1,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 2,
                    "damageProjection": [
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        },
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        },
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        },
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        },
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        },
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        },
                        {
                            "name": "Small Attack",
                            "damage": 2,
                            "actionCost": 1
                        }
                    ]
                },
            ],
            "multiattack": [
                {
                    "id": "3iBiI8VrYTy5XKO",
                    "actionType": "multiattack",
                    "name": "Multiattack",
                    "template": "multiattack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 1,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [
                        [
                            {
                                "index": 0,
                                "uses": 1
                            },
                            {
                                "index": 1,
                                "uses": 1
                            },
                            {
                                "index": 2,
                                "uses": 2
                            }
                        ],
                        [
                            {
                                "index": 0,
                                "uses": 1
                            },
                            {
                                "index": 2,
                                "uses": 1
                            },
                            {
                                "index": "spellcasting",
                                "uses": 2
                            }
                        ]
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 198,
                    "damageProjection": []
                }
            ],
            "bonus_action": [
                {
                    "id": "q6W1uOfFIGK8j9W",
                    "actionType": "bonus_action",
                    "name": "Bonus Attack",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "spell",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "cold"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [],
                    "useMultiattackAlternative": false,
                    "multiattackAltReferences": [],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 5,
                    "damageProjection": [
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bonus Attack",
                            "damage": 5,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "reaction": [
                {
                    "id": "Oi44Y3Q9b2H07oF",
                    "actionType": "reaction",
                    "name": "Hellish Rebuke",
                    "template": "saving_throw",
                    "attackAbility": "str",
                    "targetType": "cone",
                    "attackType": "none",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "cha",
                    "savingThrowSaveAbilities": [
                        "dex"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 6,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "fire"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "multiattackReferences": [],
                    "useMultiattackAlternative": false,
                    "multiattackAltReferences": [],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 14,
                    "damageProjection": [
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        },
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        },
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        },
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        },
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        },
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        },
                        {
                            "name": "Hellish Rebuke",
                            "damage": 14,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "averageDPR": -1,
        "damageProjection": [],
        "display": {
            "columns": 2
        }
    },
    {
        "id": "qAmbWRKRL0qKOeH",
        "name": "Ancient Red Dragon",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "gargantuan",
        "type": "dragon",
        "subtype": "",
        "typeCategory": "red",
        "alignment": "chaotic_evil",
        "showTypicalAlignment": false,
        "armorClass": {
            "type": "natural",
            "manual": 22,
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 20,
            "diceAmount": 28,
            "additional": 0
        },
        "abilities": {
            "str": 30,
            "dex": 10,
            "con": 29,
            "int": 18,
            "wis": 15,
            "cha": 23
        },
        "savingThrows": {
            "str": false,
            "dex": true,
            "con": true,
            "int": false,
            "wis": true,
            "cha": true
        },
        "damageResistances": [],
        "damageImmunities": [
            "fire"
        ],
        "damageVulnerabilites": [],
        "conditionImmunities": [],
        "skills": [
            "perception",
            "stealth"
        ],
        "languages": {
            "spokenWritten": [
                "common",
                "draconic"
            ],
            "doesntSpeak": [],
            "telepathy": 0
        },
        "speeds": {
            "walk": 40,
            "fly": 80,
            "swim": 0,
            "climb": 40,
            "burrow": 0
        },
        "hover": false,
        "senses": {
            "darkvision": {
                "distance": 120,
                "modifier": false
            },
            "blindsight": {
                "distance": 60,
                "modifier": false
            },
            "tremorsense": {
                "distance": 0,
                "modifier": false
            },
            "truesight": {
                "distance": 0,
                "modifier": false
            }
        },
        "showNonCombat": true,
        "manualOverride": {
            "proficiency": 0,
            "casterLevel": 0
        },
        "targetCR": {
            "offensive": {},
            "defensive": {}
        },
        "hasLegendaryActions": true,
        "hasMythicActions": false,
        "legendaryActions": 3,
        "reactions": 1,
        "actions": 1,
        "bonusActions": 1,
        "features": {
            "passive": [],
            "spellcasting": [],
            "multiattack": [
                {
                    "id": "7329E999fHmuhpA",
                    "actionType": "multiattack",
                    "name": "Multiattack",
                    "template": "multiattack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellcastingClass": "",
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [
                            {
                                "index": 3,
                                "uses": 1
                            },
                            {
                                "index": 0,
                                "uses": 1
                            },
                            {
                                "index": 1,
                                "uses": 2
                            }
                        ],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "manualMaxDPR": -1,
                    "maxDPR": 106
                }
            ],
            "action": [
                {
                    "id": "KKlx3syxYqHGefD",
                    "actionType": "action",
                    "name": "Bite",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 15,
                    "attackDamage": [
                        {
                            "diceType": 10,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "piercing"
                        },
                        {
                            "diceType": 6,
                            "diceAmount": 4,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "fire"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "maxDPR": 54
                },
                {
                    "id": "xsUNW80WEeGcGsm",
                    "actionType": "action",
                    "name": "Claw",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 10,
                    "attackDamage": [
                        {
                            "diceType": 8,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellcastingClass": "",
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "manualMaxDPR": -1,
                    "maxDPR": 26
                },
                {
                    "id": "R0cS1dxnHX4S98L",
                    "actionType": "action",
                    "name": "Tail",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 20,
                    "attackDamage": [
                        {
                            "diceType": 8,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellcastingClass": "",
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "manualMaxDPR": -1,
                    "maxDPR": 26
                },
                {
                    "id": "NTZOExy5Sk5NtyF",
                    "actionType": "action",
                    "name": "Frightful Presence",
                    "template": "custom",
                    "attackAbility": "str",
                    "targetType": "touch",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellcastingClass": "",
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "manualMaxDPR": -1,
                    "maxDPR": 0
                },
                {
                    "id": "vmWqDjXQpMsCpdO",
                    "actionType": "action",
                    "name": "Fire Breath",
                    "template": "saving_throw",
                    "attackAbility": "str",
                    "targetType": "cone",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "con",
                    "savingThrowSaveAbilities": [
                        "dex"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 6,
                            "diceAmount": 26,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "fire"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "dice_roll",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellcastingClass": "",
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "manualMaxDPR": -1,
                    "maxDPR": 312
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "display": {
            "columns": 1
        }
    },
    {
        "id": "jO6DHIFtePHqNOf",
        "name": "Black Bear",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "medium",
        "type": "beast",
        "subtype": "",
        "typeCategory": "mammal",
        "alignment": "unaligned",
        "showTypicalAlignment": false,
        "armorClass": {
            "type": "natural",
            "manual": 11,
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 8,
            "diceAmount": 3,
            "additional": 0
        },
        "abilities": {
            "str": 15,
            "dex": 10,
            "con": 14,
            "int": 2,
            "wis": 12,
            "cha": 7
        },
        "savingThrows": {
            "str": false,
            "dex": false,
            "con": false,
            "int": false,
            "wis": false,
            "cha": false
        },
        "damageResistances": [],
        "damageImmunities": [],
        "damageVulnerabilites": [],
        "conditionImmunities": [],
        "skills": [
            "perception"
        ],
        "languages": {
            "spokenWritten": [],
            "doesntSpeak": [],
            "telepathy": 0
        },
        "speeds": {
            "walk": 40,
            "fly": 0,
            "swim": 0,
            "climb": 0,
            "burrow": 0
        },
        "hover": false,
        "senses": {
            "darkvision": {
                "distance": 0,
                "modifier": false
            },
            "blindsight": {
                "distance": 0,
                "modifier": false
            },
            "tremorsense": {
                "distance": 0,
                "modifier": false
            },
            "truesight": {
                "distance": 0,
                "modifier": false
            }
        },
        "showNonCombat": true,
        "manualOverride": {
            "proficiency": 0,
            "casterLevel": 0
        },
        "targetCR": {
            "offensive": {},
            "defensive": {}
        },
        "hasLegendaryActions": true,
        "hasMythicActions": false,
        "legendaryActions": 3,
        "reactions": 1,
        "actions": 1,
        "bonusActions": 1,
        "features": {
            "passive": [
                {
                    "id": "T3TKjjq2Px4rE1X",
                    "actionType": "passive",
                    "name": "Keen Smell",
                    "template": "custom",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 0,
                    "damageProjection": [
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        },
                        {
                            "name": "Keen Smell",
                            "damage": 0,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "spellcasting": [],
            "multiattack": [
                {
                    "id": "adXufG2Jk9vTaNs",
                    "actionType": "multiattack",
                    "name": "Multiattack",
                    "template": "multiattack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [
                            {
                                "index": 0,
                                "uses": 1
                            },
                            {
                                "index": 1,
                                "uses": 1
                            }
                        ],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 12,
                    "damageProjection": []
                }
            ],
            "action": [
                {
                    "id": "oInAX6OmpFRtvOh",
                    "actionType": "action",
                    "name": "Bite",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 6,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "piercing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 5,
                    "damageProjection": [
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        },
                        {
                            "name": "Bite",
                            "damage": 5,
                            "actionCost": 1
                        }
                    ]
                },
                {
                    "id": "3TJv85Tl3YIMQ1f",
                    "actionType": "action",
                    "name": "Claw",
                    "template": "attack",
                    "attackAbility": "str",
                    "targetType": "melee",
                    "attackType": "weapon",
                    "attackRange": {
                        "low": 20,
                        "high": 60
                    },
                    "attackReach": 5,
                    "attackDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 2,
                            "additional": 0,
                            "abilityBonus": true,
                            "type": "slashing"
                        }
                    ],
                    "attackSavingThrow": false,
                    "attackTargets": 1,
                    "aoeRange": 30,
                    "savingThrowMonsterAbility": "str",
                    "savingThrowSaveAbilities": [
                        "str"
                    ],
                    "savingThrowDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "savingThrowHalfOnSuccess": true,
                    "savingThrowConditions": [],
                    "hasOngoingDamage": false,
                    "ongoingDamage": [
                        {
                            "diceType": 4,
                            "diceAmount": 1,
                            "additional": 0,
                            "abilityBonus": false,
                            "type": "slashing"
                        }
                    ],
                    "ongoingDamageOccurs": "start_of_turn",
                    "ongoingDamageOnFailedSave": true,
                    "ongoingDamageRepeatSave": false,
                    "ongoingDamageDuration": "ongoing",
                    "recharge": {
                        "type": "none",
                        "diceType": 6,
                        "minRoll": 5,
                        "uses": 1
                    },
                    "spellcastingAbility": "int",
                    "innateSpellcasting": false,
                    "spellList": [],
                    "spellSlots": {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 0,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0
                    },
                    "customDamage": [],
                    "customDescription": "",
                    "additionalDescription": "",
                    "multiattackReferences": [
                        [],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 7,
                    "damageProjection": [
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        },
                        {
                            "name": "Claw",
                            "damage": 7,
                            "actionCost": 1
                        }
                    ]
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "display": {
            "columns": 2
        }
    }
];