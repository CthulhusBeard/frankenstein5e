<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Frankenstein 5</title>

        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{mix('css/app.css')}}">
    </head>
    <body ng-app="f5App" ng-controller="f5Ctrl">
        <div id="f5" class="main-content full-height">
            <div class="creature-options">

                <div>
                    <label for="options__name">Creature Name</label>
                    <input type="text" id="options__name" name="options__name" ng-model="options__name" />
                </div>

                <div>
                    <label for="options__size">Size  @{{message}}</label>
                    
                </div>

                <div>
                    <label for="options__size">Size</label>
                    <select id="options__size" name="options__size" ng-model="options__size">
                        @foreach(config('f5.creaturesizes') as $key => $val)
                            @if(isset($val['name']))<option value="{{$key}}">{{trStr($val['name'])}}</option>@endif
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="options__type">Type</label>
                    <select id="options__type" name="options__type" ng-model="options__type">
                        @foreach(config('f5.creaturetypes') as $key => $val)
                            @if(isset($val['name']))<option value="{{$key}}">{{trStr($val['name'])}}</option>@endif
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="options__subtype">Subtype</label>
                    <select id="options__subtype" name="options__subtype" ng-model="options__subtype">
                        @foreach(config('f5.creaturesubtypes') as $key => $val)
                            @if(isset($val['name']))<option value="{{$key}}">{{trStr($val['name'])}}</option>@endif
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="options__alignment">Alignment</label>
                    <select id="options__alignment" name="options__alignment" ng-model="options__alignment">
                        @foreach(config('f5.alignments') as $key => $val)
                            @if(isset($val['name']))<option value="{{$key}}">{{trStr($val['name'])}}</option>@endif
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="options__armorclass">Armour Class</label>
                    <select id="options__armorclass" name="options__armorclass" ng-model="options__armorclass">
                        @foreach(config('f5.armortypes') as $key => $val)
                            @if(isset($val['name']))
                                <option value="{{$key}}">{{trStr($val['name'])}}
                                    @if(isset($val['range']))
                                        ({{trStr('range').' '.$val['range']['low'].'-'.$val['range']['high'].')'}}
                                    @endif
                                    @if(isset($val['base']))
                                        @if(isset($val['bonus']))
                                            @if(isset($val['max-bonus']))
                                                ({{$val['base'].' + '.strtoupper($val['bonus']).' '.trStr('f5/misc.max').' '.$val['max-bonus'].')'}}
                                            @else
                                                ({{$val['base'].' + '.strtoupper($val['bonus']).')'}}
                                            @endif
                                        @else
                                            ({{$val['base'].')'}}
                                        @endif
                                    @endif
                                </option>
                            @endif
                        @endforeach
                    </select>
                </div>
                
            </div>

            @include('partials.statblock')

        </div>
        
        <script src="{{mix('js/app.js')}}" type="text/javascript"></script>

        <script>

            var app = new Vue({
                el: '#f5',
                data: {
                    message: 'Hello Vue!'
                }
            });

            $(function() {
                let f5data = JSON.parse({!! json_encode($translatedData) !!}) ;
                console.log(f5data) ;

                /*
                var app = new Vue({
                    el: '#f5',
                    data: {
                        message: 'Hello Vue!'
                    }
                })
                */

                /*
                var f5App = angular.module('f5App', []);
                f5App.controller('f5Ctrl', function($scope) {
                    $scope.options__name= "Monster";
                    $scope.options__armorclass = "none";
                    $scope.rawData = f5data;
                    $scope.creaturetypes = [
                        { id: '1', name: 'order 1' },
                        { id: '2', name: 'order 2' },
                        { id: '3', name: 'order 3' },
                        { id: '4', name: 'order 4' }
                    ];
                });*/

                CreatureManager.test('creatures');
            });
        </script>
    </body>
</html>
