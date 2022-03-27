export { monsters };

let monsters = [
    {
        "name": "Projection Test",
        "shortName": "",
        "isNameProperNoun": false,
        "size": "medium",
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
            "diceType": 8,
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
            "passive": [],
            "spellcasting": [],
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
                }
            ],
            "bonus_action": [],
            "reaction": [],
            "legendary_action": [],
            "mythic_action": [],
            "lair_action": []
        },
        "averageDPR": -1,
        "damageProjection": []
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
    }
];