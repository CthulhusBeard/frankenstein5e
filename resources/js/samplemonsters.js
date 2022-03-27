export { monsters };

/*
Red Dragon
Ancient	Red	Dragon
Gargantuan	dragon,	chaotic	evil
Armor	Class 22	(natural	armor)
Hit	Points 546	(28d20	+	252)
Speed 40	ft.,	climb	40	ft.,	fly	80	ft.
STR DEX CON INT WIS CHA
30	(+10) 10	(+0) 29 (+9) 18	(+4) 15	(+2) 23	(+6)
Saving	Throws Dex	+7,	Con	+16,	Wis	+9,	Cha	+13
Skills Perception	+16,	Stealth	+7
Damage	Immunities fire
Senses blindsight	60	ft.,	darkvision	120	ft.,	passive	
Perception	26
Languages Common,	Draconic
Challenge 24	(62,000	XP)
Legendary	Resistance	(3/Day). If	the	dragon	fails	a	
saving	throw,	it	can	choose	to	succeed	instead.
Actions
Multiattack. The	dragon	can	use	its	Frightful	Presence.	
It	then	makes	three	attacks:	one	with	its	bite	and	two	
with	its	claws.
Bite.	Melee	Weapon	Attack: +17	to	hit,	reach	15	ft.,	
one	target.	Hit: 21	(2d10	+	10)	piercing	damage	plus	14	
(4d6)	fire	damage.
Claw.	Melee	Weapon	Attack: +17	to	hit,	reach	10	ft.,	
one	target.	Hit:	17	(2d6	+	10)	slashing	damage
Tail.	Melee	Weapon	Attack: +17	to	hit,	reach	20	ft.,	one	
target.	Hit: 19	(2d8	+	10)	bludgeoning	damage.
Frightful	Presence.	Each	creature	of	the	dragon’s	
choice	that	is	within	120	feet	of	the	dragon	and	aware	
of	it	must	succeed	on	a	DC	21	Wisdom	saving	throw	or	
become	frightened	for	1	minute.	A	creature	can	repeat	
the	saving	throw	at	the	end	of	each	of	its	turns,	ending	
the	effect	on	itself	on	a	success.	If	a	creature’s	saving	
throw	is	successful	or	the	effect	ends	for	it,	the	
creature	is	immune	to	the	dragon’s	Frightful	Presence	
for	the	next	24	hours.
Fire	Breath	(Recharge	5–6).	The	dragon	exhales	fire	in	
a	90-foot	cone.	Each	creature	in	that	area	must	make	a	
DC	24	Dexterity	saving	throw,	taking	91	(26d6)	fire	
damage	on	a	failed	save,	or	half	as	much	damage	on	a	
successful	one.
Legendary	Actions
The	dragon	can	take	3	legendary	actions,	choosing	
from	the	options	below.	Only	one	legendary	action	
option	can	be	used	at	a	time	and	only	at	the	end	of	
another	creature’s	turn.	The	dragon	regains	spent	
legendary	actions	at	the	start	of	its	turn.
Detect. The	dragon	makes	a	Wisdom	(Perception)	
check.
Tail	Attack.	The	dragon	makes	a	tail	attack.
Wing	Attack	(Costs	2	Actions). The	dragon	beats	its	
wings.	Each	creature	within	15	feet	of	the	dragon	
must	succeed	on	a	DC	25	Dexterity	saving	throw	or	
take	17	(2d6	+	10)	bludgeoning	damage	and	be	
knocked	prone.	The	dragon	can	then	fly	up	to	half	its	
flying	speed.
*/

let monsters = [
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