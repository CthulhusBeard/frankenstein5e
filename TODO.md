//TODO: 

HIGH PRIORITY
- [ ] Reorder Features / Move features to other columns
- [ ] Allow adding text replace codes to custom description
- [ ] Minimum size for conditions (grappled, swallowed, etc)
- [ ] Prepared spellcasting class spell lists "from the cleric spell list"
- [ ] Life expectancy vs PC levels
- [ ] Make better lists: //function createConditionSentenceList
//  -> from "... and are blinded and are deafened, or half as much damage on a successful one and are not blinded and are not deafened."
//      -> to "... and becomes blinded and deafened, or half as much damage on a successful one and are not blinded or deafened."
- [ ] Common passives like regen
- [ ] Why does an export cause 4 updates to the creature model
- [ ] Adjust offensive and defensive CR calculations (beware cyclical updates)
//      -> ref: https://www.reddit.com/r/DMAcademy/comments/nc3i47/the_cr_calculator_in_the_dmg_is_wack_it_doesnt/gy34lun/
//      -> Effective health pool - DMG 277
//      -> Features that increase CR - DMG 280 ("Does this feature alter CR? By how much?")
//      -> Flying monsters with CR below 10 are considered effectively 2 AC higher
- [ ] More than 1 stat block / encounter calculator
- [ ] Merge projections for Multiattack
//      -> Consider Action Surge/Multiattack combo
- [ ] DPR Totals
//      -> total passives
//      -> top action / spellcasting +
//      -> top reaction + 
//      -> top bonus + 
//      -> top legendary/mythic combinations + 
//      -> top lair action
- [ ] Move at will spells to cantrip slots
- [ ] Clean up feature object (only export the fields needed. There are many unused fields) "template: {type: attack, damage: etc}"
- [ ] Import Monster validation

MEDIUM PRIORITY
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