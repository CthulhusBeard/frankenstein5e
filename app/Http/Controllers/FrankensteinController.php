<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App;

class FrankensteinController extends Controller
{

    //TODO: 
    // - Create features
    // - Loc pass
    // - WOTC Fan Content legal
    // - SEO meta
    // - Change images to original ( add repeating ripped edge)
    // - Convert units
    // - Update Prof by CR (already in config)
    // - Reorder Features
    // - Mage armour
    // - Automatic column org or manual moving
    // - Fix semantic usage on Conditions plus additional conditions
    // - Remove external CDN references
    // - Clean up label "for"s
    // - Minimum size for conditions (grappled, swallowed, etc)
    // - Make better lists: //function createConditionSentenceList
    //    -> from "... and are blinded and are deafened, or half as much damage on a successful one and are not blinded and are not deafened."
    //    -> to "... and becomes blinded and deafened, or half as much damage on a successful one and are not blinded or deafened."
    
    
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
                'spells',
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
