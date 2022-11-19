//TODO: 

HIGH PRIORITY
- [ ] Figure out why spells are breaking after you add 12 of them
- [ ] Design UI
- [ ] Tips and suggestions
- [ ] Consider displaying assumed average target count for AOE attacks (to make better sense of DPR). Consider having "single target DPR" vs "total DPR"
- [ ] Allow adding text replace codes to custom description (make this easier)
- [ ] Figure out which dpr events are actually necessary
- [ ] Minimum creature size for conditions (grappled, swallowed, etc)
- [ ] hasInstantKillPotential
- [ ] Make better lists: //function createConditionSentenceList
//  -> from "... and are blinded and are deafened, or half as much damage on a successful one and are not blinded and are not deafened."
//      -> to "... and becomes blinded and deafened, or half as much damage on a successful one and are not blinded or deafened."
- [ ] Adjust offensive and defensive CR calculations (beware cyclical updates)
//      -> ref: https://www.reddit.com/r/DMAcademy/comments/nc3i47/the_cr_calculator_in_the_dmg_is_wack_it_doesnt/gy34lun/
//      -> Features that increase CR - DMG 280 ("Does this feature alter CR? By how much?")
- [ ] Encounter calculator
- [ ] Merge projections for Multiattack
//      -> Consider Action Surge/Multiattack combo
- [ ] Clean up feature object (only export the fields needed. There are many unused fields) "template: {type: attack, damage: etc}"
- [ ] Import Monster validation

BUG FIXES
- [ ] Make element ids unique between different statblocks

MEDIUM PRIORITY
- [ ] Automatic column org or manual moving
- [ ] Fix semantic usage on Conditions plus additional conditions

FINAL TOUCHES
- [ ] Make a logo (no bolts)
- [ ] SEO meta
- [ ] Clean up label "for"s
- [ ] Replace some drop downs with input number fields

OPTIONAL
- [ ] Loc cleanup
- [ ] Convert units
- [ ] Regional effects