<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FrankensteinController extends Controller
{

    //TODO: 
    // - Create features
    // - Loc pass
    // - WOTC Fan Content legal
    // - SEO meta
    // - Change images to original
    // - Convert units
    // - Update Prof by CR (already in config)
    
    
    
    public function builder (Request $request) {
        $cacheSeconds = 2;

        if(Cache::has('f5')) {
            $translatedData = Cache::get('f5');

        } else {

            $configData = [
                'misc',
                'tags',
                'hitdice',
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
