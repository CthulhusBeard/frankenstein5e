//TODO: 

HIGH PRIORITY
- [ ] Healing effects as template
- [ ] Create pop up for monster templates
- [ ] Factor "half on success" saves vs "save or suck" into average damage
- [ ] Allow Custom damage dice to select an ability bonus (display ability bonus on selected attacks)
- [ ] Design UI
- [ ] Consider displaying assumed average target count for AOE attacks (to make better sense of DPR). Consider having "single target DPR" vs "total DPR"
- [ ] Figure out which dpr events are actually necessary
- [ ] Minimum creature size for conditions (grappled, swallowed, etc)
- [ ] hasInstantKillPotential
- [ ] Make better lists: //function createConditionSentenceList
//  -> from "... and are blinded and are deafened, or half as much damage on a successful one and are not blinded and are not deafened."
//      -> to "... and becomes blinded and deafened, or half as much damage on a successful one and are not blinded or deafened."
- [ ] Adjust offensive and defensive CR calculations (beware cyclical updates)
//      -> ref: https://www.reddit.com/r/DMAcademy/comments/nc3i47/the_cr_calculator_in_the_dmg_is_wack_it_doesnt/gy34lun/
//      -> Features that increase CR - DMG 280 ("Does this feature alter CR? By how much?")
- [ ] Encounter graph needs work for multiples of a monster
- [ ] Merge projections for Multiattack
//      -> Consider Action Surge/Multiattack combo
- [ ] Clean up feature object (only export the fields needed. There are many unused fields) "template: {type: attack, damage: etc}"

BUG FIXES
- [ ] Removing a Multiselect item closes the lightbox
- [ ] Make element ids unique between different statblocks
- [ ] Remove physical damage when B/P/S is already chosen

MEDIUM PRIORITY
- [ ] Allow user to enter HP and have hit dice calculated
- [ ] Suggest legendary resistances on single creature encounters in encounter analysis
- [ ] Fix semantic usage on Conditions plus additional conditions
- [ ] Clean up export to remove unneeded info
- [ ] Move template options to it's own menu like the wizard
- [ ] Saving throws increase AC (3-4 +2, 5-6 +4)
- [ ] Spell crits? (AOE Spells can't crit. No good way to tell them apart)
- [ ] Creatures immune to ____ are immune to this
- [ ] Creature type ___ make the saving throw at advantage

FINAL TOUCHES
- [ ] Make a logo (no bolts)
- [ ] SEO meta
- [ ] Clean up label "for"s
- [ ] Replace some drop downs with input number fields
- [ ] Remove trademarked creatures?
- [ ] Refactor wizard to not use a bunch different of divs

OPTIONAL
- [ ] Loc cleanup
- [ ] Monster intelligence profile (how smart will the enemy fight? instinctively attack threats/target casters/attack downed creatures/ etc)
- [ ] Convert units
- [ ] Regional effects