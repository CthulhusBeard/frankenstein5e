<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App;

class FrankensteinController extends Controller
{

    //TODO: 
    // - Create features
    //      -> Add multiattack
    // - Loc pass
    // - WOTC Fan Content legal
    // - SEO meta
    // - Change images to original ( add repeating ripped edge)
    // - Convert units
    // - Update Prof by CR (already in config)
    // - Reorder Features / Move features to other columns
    // - Mage armour ac?
    // - Automatic column org or manual moving
    // - Fix semantic usage on Conditions plus additional conditions
    // - Remove external CDN references
    // - Clean up label "for"s
    // - Minimum size for conditions (grappled, swallowed, etc)
    // - Prepared spellcasting class spell lists "from the cleric spell list"
    // - Life expectancy vs PC levels
    // - Make better lists: //function createConditionSentenceList
    //  -> from "... and are blinded and are deafened, or half as much damage on a successful one and are not blinded and are not deafened."
    //      -> to "... and becomes blinded and deafened, or half as much damage on a successful one and are not blinded or deafened."
    // - Common passives like regen
    // - Why does an export cause 4 updates to the creature model
    // - Adjust offensive and defensive CR calculations (beware cyclical updates)
    //      -> ref: https://www.reddit.com/r/DMAcademy/comments/nc3i47/the_cr_calculator_in_the_dmg_is_wack_it_doesnt/gy34lun/
    //      -> Effective health pool - DMG 277
    //      -> Features that increase CR - DMG 280 ("Does this feature alter CR? By how much?")
    //      -> Flying monsters with CR below 10 are considered effectively 2 AC higher
    // - More than 1 stat block / encounter calculator
    // - Merge projections for Multiattack
    //      -> Consider Action Surge/Multiattack combo
    
    public function builder (Request $request) {
        if (App::environment('local')) {
            $cacheSeconds = 2;
        } else {
            $cacheSeconds = 60 * 60;
        }

        if(Cache::has('f5')) {
            $translatedData = Cache::get('f5');

        } else {

            $configData = [
                'misc',
                'timepoints',
                'playerlevels',
                'tags',
                'recharge',
                'dicetypes',
                'challengerating',
                'abilities',
                'featureactiontypes',
                'featuretemplates',
                'alignments',
                'areaofeffect',
                'conditions',
                'creaturesizes',
                'damagetypes',
                'durations',
                'languages',
                'skills',
                'senses',
                'speeds',
                'tools',
                'armortypes',
                'armor',
                'creaturetypes',
                'creaturesubtypes',
                'features',
                'featuremodifiers',
                'spelllevels',
                'attacktypes',

                'defaultmonster',
            ];

            $rawData = [];

            foreach($configData as $config) {
                $rawData[$config] = config('f5.'.$config);
            }

            $translatedData = $this->translateJSON(json_encode($rawData));

            Cache::put('f5', $translatedData, $cacheSeconds);
            
        }

        return view('builder', [
            'translatedData' => $translatedData
        ]);
    }

    private function translateJSON($data) {
        preg_match_all('/\"f5\\\\?\/[a-z\|_\\\\]*\.[a-z\|_\\\\]*\"/', $data, $output_array);

        if(isset($output_array[0])) {
            foreach($output_array[0] as $match) {
                $matchClean = str_replace('\\','', str_replace('"','',$match));
                $data = str_replace($match, '"'.trans($matchClean).'"', $data);
            }
        }

        return $data;
    }



}
