export { monsters };

let monsters = [
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
        "measure": {
            "measureUnit": "ft.",
            "measureIncrement": 5,
            "measureUnitUp": 5280,
            "measureUnitUpName": "miles"
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
        "measure": {
            "measureUnit": "ft.",
            "measureIncrement": 5,
            "measureUnitUp": 5280,
            "measureUnitUpName": "miles"
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
                    "id": "vMY2qzoft7XlbXy",
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
                        [
                            {
                                "index": 1,
                                "uses": 2
                            },
                            {
                                "index": 2,
                                "uses": 2
                            }
                        ],
                        [
                            {
                                "index": 1,
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
                    "averageDPR": 28,
                    "damageProjection": []
                },
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
        "measure": {
            "measureUnit": "ft.",
            "measureIncrement": 5,
            "measureUnitUp": 5280,
            "measureUnitUpName": "miles"
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
            "manual": 17,
            "name": "No Armor",
            "bonus": "0",
            "stealthDis": false,
            "shield": false
        },
        "hitPoints": {
            "diceType": 20,
            "diceAmount": 28,
            "additional": "0"
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
                "common"
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
            "darkvision": 120,
            "blindsight": 60,
            "tremorsense": 0,
            "truesight": 0
        },
        "measure": {
            "measureUnit": "ft.",
            "measureIncrement": 5,
            "measureUnitUp": 5280,
            "measureUnitUpName": "miles"
        },
        "showNonCombat": true,
        "manualOverride": {
            "proficiency": 9,
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
            "passive": [],
            "spellcasting": [],
            "action": [
                {
                    "id": "ImEiH7PlXShaliO",
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
                    "averageDPR": -1,
                    "damageProjection": []
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        }
    },
    {
        "id": "sBWlsgjzkPDqLBR",
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
            "name": "No Armor",
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
            "climb": 30,
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
        "measure": {
            "measureUnit": "ft.",
            "measureIncrement": 5,
            "measureUnitUp": 5280,
            "measureUnitUpName": "miles"
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
                    "id": "ECPsauQX7J6Js8c",
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
            "action": [
                {
                    "id": "pCVAqHFlJtxM8F2",
                    "actionType": "action",
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
                                "index": 1,
                                "uses": 1
                            },
                            {
                                "index": 2,
                                "uses": 1
                            }
                        ],
                        []
                    ],
                    "legendaryActionCost": 1,
                    "manualDPR": -1,
                    "averageDPR": 0,
                    "damageProjection": []
                },
                {
                    "id": "QQDk4D01gimSAfA",
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
                    "id": "kuuJBrymrRRaviv",
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
            "columns": 1
        },
        "averageDPR": -1,
        "damageProjection": []
    }
];