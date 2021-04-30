<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

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

            $translatedData = translateJSON(json_encode($rawData));

            Cache::put('f5', $translatedData, $cacheSeconds);
            
        }

        return view('builder', [
            'translatedData' => $translatedData
        ]);
    }
}