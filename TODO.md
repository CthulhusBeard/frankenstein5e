//TODO: 

HIGH PRIORITY
- [ ] Multiattack projection: Multiattack projection isn't changing because MA property values aren't changing. Requires an event or some sort of connective reactivity to multiattack reference features.
- [ ] Fix Glabrezu import
- [ ] Restrict Recharge abilities on multiattack
- [ ] Design UI
- [ ] DPR Projection Graph
- [ ] Tips and suggestions
- [ ] Allow adding text replace codes to custom description
- [ ] Figure out which dpr events are actually necessary
- [ ] Minimum size for conditions (grappled, swallowed, etc)
- [ ] Life expectancy vs PC levels
- [ ] hasInstantKillPotential
- [ ] Min/max damage as well as average
- [ ] Make better lists: //function createConditionSentenceList
//  -> from "... and are blinded and are deafened, or half as much damage on a successful one and are not blinded and are not deafened."
//      -> to "... and becomes blinded and deafened, or half as much damage on a successful one and are not blinded or deafened."
- [ ] Common passives like regen
- [ ] Adjust offensive and defensive CR calculations (beware cyclical updates)
//      -> ref: https://www.reddit.com/r/DMAcademy/comments/nc3i47/the_cr_calculator_in_the_dmg_is_wack_it_doesnt/gy34lun/
//      -> Effective health pool - DMG 277
//      -> Features that increase CR - DMG 280 ("Does this feature alter CR? By how much?")
//      -> Flying monsters with CR below 10 are considered effectively 2 AC higher
- [ ] Encounter calculator
- [ ] Merge projections for Multiattack
//      -> Consider Action Surge/Multiattack combo
- [ ] Clean up feature object (only export the fields needed. There are many unused fields) "template: {type: attack, damage: etc}"
- [ ] Import Monster validation

BUG FIXES
- [ ] Make element ids unique between different statblocks

MEDIUM PRIORITY
- [ ] Move Buttons to Reorder Features / Move features to other columns
- [ ] Automatic column org or manual moving
- [ ] Fix semantic usage on Conditions plus additional conditions

FINAL TOUCHES
- [ ] WOTC Fan Content legal
- [ ] SEO meta
- [ ] Change images to original ( add repeating ripped edge)
- [ ] Remove external CDN references
- [ ] Clean up label "for"s

OPTIONAL
- [ ] Loc cleanup
- [ ] Convert units