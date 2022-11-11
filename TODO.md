//TODO: 

- [ ] Multiattack graph reactivity
- [ ] Don't count Mythics in the first few actions

HIGH PRIORITY
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
//      -> Effective health pool - DMG 277
//      -> Features that increase CR - DMG 280 ("Does this feature alter CR? By how much?")
- [ ] Encounter calculator
- [ ] Merge projections for Multiattack
//      -> Consider Action Surge/Multiattack combo
- [ ] Clean up feature object (only export the fields needed. There are many unused fields) "template: {type: attack, damage: etc}"
- [ ] Import Monster validation

BUG FIXES
- [ ] Make element ids unique between different statblocks
- [ ] Multiattack is not considered to be expending limited resources. Multiattack push out ability projections that are being used. (one 5th level spell slot/spell. Multiattack with 2 spell uses. Will display two uses of the 5th level slot in the multiattack and then use of the spell slot in turn 2)
- [ ] Restrict Recharge abilities on multiattack
- [ ] Fix multiple uses of spells on multiattack (one 5th level spell slot with 2 spell uses will display two uses of the 5th level slot)

MEDIUM PRIORITY
- [ ] Move Buttons to Reorder Features / Move features to other columns
- [ ] Automatic column org or manual moving
- [ ] Fix semantic usage on Conditions plus additional conditions

FINAL TOUCHES
- [ ] Make a logo (no bolts)
- [ ] WOTC Fan Content legal
- [ ] SEO meta
- [ ] Clean up label "for"s
- [ ] Replace some drop downs with input number fields

OPTIONAL
- [ ] Loc cleanup
- [ ] Convert units
- [ ] Regional effects