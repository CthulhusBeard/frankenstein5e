<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Frankenstein 5E</title>
        
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
        <script src="{{mix('js/app.js')}}" defer></script>
        <link rel="stylesheet" type="text/css" href="{{mix('css/app.css')}}">
    </head>
    <body ng-app="f5App" ng-controller="f5Ctrl">

        <div id="main-grid">
            <div id="logo">
                Logo
            </div>

            <div id="top-nav">
                Stuff here
            </div>

            <div id="side-nav">
                <div class="nav-option">
                    <div></div>
                    <div>Statblocks</div>
                </div>
                <div class="nav-option">
                    <div></div>
                    <div>Player Characters</div>
                </div>
                <div class="nav-option">
                    <div></div>
                    <div>Combat Analysis</div>
                </div>
                <div class="nav-option">
                    <div></div>
                    <div>Tips & Recommendations</div>
                </div>
            </div>

            <div id="f5" class="main-content full-height">

                <div class="controls-holder">

                    <!-- <div class="builder-controls popup-overlay">
                        <div class="control-title">Stat Block</div>
                        <div class="slide-button" v-bind:class="{ selected : editor.edit_mode }" @click="editor.edit_mode = !editor.edit_mode">
                            <label>@{{f5.misc.title_edit_mode}}</label>
                        </div>
                    </div> -->

                    <div class="builder-controls popup-overlay">
                        <div class="control-title">Encounter Settings</div>
                        <div>@{{f5.misc.title_player_characters}}</div>
                        <div class="builder-controls_player-characters">
                            <div>
                                <label class="control-label" for="controls__player-count">@{{f5.misc.title_player_characters_count}}: </label>
                                <select v-model="editor.player_characters.number">
                                    <option v-for="i in 12" :value="i">@{{i}}</option>
                                </select>
                            </div>
                            <div>
                                <label class="control-label" for="controls__player-levels">@{{f5.misc.title_player_characters_level}}: </label>
                                <select v-model="editor.player_characters.level">
                                    <option v-for="(obj, i) in f5.playerlevels" :value="i">@{{i}}</option>
                                </select>
                            </div>
                        </div>

                        <div>Monster Count</div>
                        <div>                    
                            <div v-for="statblock in statblocks.slice().reverse()">
                                <label class="control-label" for="controls__monsters">@{{statblock.name}}: </label>
                                <select>
                                    <option v-for="i in 10" :value="i">@{{i}}</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="builder-controls popup-overlay">
                        <div class="control-title">Importer</div>
                        <div>
                            <select v-model="editor.import_monster">
                                <option v-for="(monster, i) in SampleMonsters.monsters" :value="i">@{{monster.name}}</option>
                            </select>
                        </div>
                        <div>
                            <button @click="importMonster(SampleMonsters.monsters[editor.import_monster])">@{{f5.misc.title_import}}</button>
                        </div>
                        <div>
                            <br/>
                            <button @click="createStatBlock()">@{{f5.misc.title_new_statblock}}</button>
                        </div>
                        <div>
                            <br/>
                            <button @click="clearAllData()">@{{f5.misc.title_clear_all}}</button>
                        </div>
                    </div>
                </div>

                <component 
                    v-for="statblock in statblocks.slice().reverse()"
                    :is="statblockclass"
                    v-bind:f5="f5"
                    v-bind:player_data="editor.player_characters"
                    v-bind:combat_rounds="editor.round_tracker"
                    v-bind:measure="editor.measure"
                    v-on:remove-statblock="removeStatBlock"
                    ref="statblocks"
                >
                </component>
<!-- 
                <encounter-graph 
                    v-bind:encounter_data="encounterData"
                    v-bind:player_data="editor.player_characters"
                    v-bind:combat_rounds="editor.round_tracker"
                    v-bind:f5="f5"
                    ref="graph"
                >
                </encounter-graph> -->

            </div>
        </div>
        
        <script>
            window.onload = function() {
                let f5data = JSON.parse({!! json_encode($translatedData) !!}) ;
                console.log(f5data);
                let app = EncounterBuilder.initVue(f5data);
            
                //Edit Fields. Allow focused objects to be editted while making others uneditable
                document.addEventListener('click', function(e) {
                    removeFocus(e.target);
                });

                function removeFocus(element = null) {
                    const editFields = document.querySelectorAll(".focus-edit.focused");
                    editFields.forEach(function(el) { 
                        el.classList.remove('focused');
                    });

                    if(
                        element && 
                        element.closest(".focus-edit") &&
                        !element.closest(".feature__remove") &&
                        !element.closest(".feature__save")
                    ) {   //Click on any object other than an edittable one
                        element.closest(".focus-edit").classList.add('focused');
                    }
                }

            };
        </script>

        @include('partials.statblock')
        @include('partials.feature')
        @include('partials.projection-graph')

    </body>
</html>
