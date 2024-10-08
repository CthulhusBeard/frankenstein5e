<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App;

class FrankensteinController extends Controller
{
    
    public function builder (Request $request) {
        $cacheKey = 'f5';
        $cacheExpiryKey = 'f5-expiry';

        if (App::environment('local')) {
            $cacheSeconds = 2;
        } else {
            $cacheSeconds = 60 * 60;
        }

        if(Cache::has($cacheKey) && Cache::has($cacheExpiryKey)) {
            $translatedData = Cache::get($cacheKey);

        } else {

            $configData = [
                'misc',
                'timepoints',
                'timeunits',
                'playerlevels',
                'encounterdifficulties',
                'tags',
                'recharge',
                'regenerate',
                'dicetypes',
                'abilities',
                'featureactiontypes',
                'featuretemplates',
                'alignments',
                'areaofeffect',
                'classes',
                'combatstyles',
                'conditions',
                'creaturesizes',
                'damagetypes',
                'durations',
                'languages',
                'skills',
                'senses',
                'speeds',
                //'tools',
                'armortypes',
                'armor',
                'challengerating',
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

            //Replace cache
            $prevCache = Cache::get($cacheKey, []);
            $dataFile = '../public/data/frankenstein5.json';

            if(!file_exists($dataFile) || md5(json_encode($prevCache)) != md5(json_encode($translatedData))) {
                file_put_contents($dataFile, json_encode($translatedData));
                Cache::forever($cacheKey, $translatedData);
            }

            Cache::put($cacheExpiryKey, true, $cacheSeconds);
            
        }

        return view('encounter-builder', [
            'translatedData' => $translatedData
        ]);
    }

    private function translateJSON($data) {
        preg_match_all('/\"f5\\\\?\/[a-z\|_\\\\]*\.[0-9a-z\|_\\\\]*\"/', $data, $output_array);

        if(isset($output_array[0])) {
            foreach($output_array[0] as $match) {
                $matchClean = str_replace('\\','', str_replace('"','',$match));
                $data = str_replace($match, '"'.trans($matchClean).'"', $data);
            }
        }

        return $data;
    }



}
