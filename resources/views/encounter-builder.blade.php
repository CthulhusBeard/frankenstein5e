<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Frankenstein 5E</title>
        
        <script src="{{mix('js/app.js')}}" defer></script>
        <link rel="stylesheet" type="text/css" href="{{mix('css/app.css')}}">
        <link rel="icon" type="image/x-icon" href="/images/favicon.png">
    </head>
    <body>

        <div id="f5" class="main-grid">
            <div id="logo">
                Logo
            </div>

            <div id="top-nav">
                Stuff here
            </div>

            <div id="side-nav">
                <div class="nav-option nav-statblocks" @click="editor.activeSection = 'statblock-display'">
                    <div></div>
                    <div>Statblocks</div>
                </div>
                <div class="nav-option nav-encounter" @click="changeActiveDisplay('encounter-display')">
                    <div></div>
                    <div>Encounter Analysis</div>
                </div>
            </div>

            <div class="main-content full-height">
                <div class="display-section encounter-display" :class="{'active-display': (editor.activeSection == 'encounter-display')}">
                    <div class="controls-holder">

                        <div class="builder-controls popup-overlay">
                            <div class="control-title">Encounter Settings</div>

                            <div class="builder-controls-group">
                                <div class="control-title">@{{f5.misc.title_player_settings}}</div>
                                <div>
                                    <label class="control-label" for="controls__player-count">@{{f5.misc.title_player_characters_count}}: </label>
                                    <select v-model="editor.playerData.number">
                                        <option v-for="i in 12" :value="i">@{{i}}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="control-label" for="controls__player-levels">@{{f5.misc.title_player_characters_level}}: </label>
                                    <select v-model="editor.playerData.level">
                                        <option v-for="(obj, i) in f5.playerlevels" :value="i">@{{i}}</option>
                                    </select>
                                </div>
                                <br/>
                                <div>@{{ f5.misc.title_average_player_hp_at_level }} @{{ this.f5.playerlevels[this.editor.playerData.level].average_hp }}</div>
                                <div>@{{ f5.misc.title_average_player_dpr_at_level }} @{{ this.f5.playerlevels[this.editor.playerData.level].average_dpr }}</div>
                            </div>
                            
                            <div class="builder-controls-group">
                                <div class="control-title">@{{f5.misc.title_monster_settings}}</div>
                                <div v-for="statblock in statblocks" >
                                    <div>
                                        <label class="control-label" for="controls__player-count">@{{ statblock.name }}: </label>
                                        <select v-model="statblock.number">
                                            <option v-for="i in 10" :value="i">@{{i}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Encountergraph 
                        :encounter-data="statblocks"
                        :player-data="editor.playerData"
                        :combat-rounds="editor.roundTracker"
                        :f5="f5"
                        ref="encounterGraph"
                    >
                    </Encountergraph>
                </div>

                <div class="display-section statblock-display" :class="{'active-display': (editor.activeSection == 'statblock-display')}">
                
                    <div class="builder-controls popup-overlay">
                        <div class="control-title">Importer</div>
                        <div>
                            <select v-model="editor.importMonster">
                                <option v-for="(monster, i) in sampleMonsters" :value="i">@{{monster.name}}</option>
                            </select>
                        </div>
                        <div>
                            <button @click="importMonster(sampleMonsters[editor.importMonster])">@{{f5.misc.title_import}}</button>
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

                    <div class="statblock-group">
                        <Statblock 
                            v-for="statblock in statblocks"
                            v-bind:key="statblock.trackingId"
                            :initial-statblock="statblock"
                            :f5="f5"
                            :player-data="editor.playerData"
                            :combat-rounds="editor.roundTracker"
                            :measure="editor.measure"
                            @remove-statblock="removeStatBlock"
                            @update-name="updateMonsterName"
                            @update-hp="updateMonsterHP"
                            @update-projections="updateMonsterProjections"
                            ref="statblocks"
                        >
                        </Statblock>
                    </div>
                </div>

            </div>
        </div>
        
        <script>
            window.onload = function() {
                fetch('data/frankenstein5.json')
                    .then((response) => response.json())
                    .then((f5data) => init(f5data));
                    
            
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

            function init(f5data) {
                f5data = JSON.parse(f5data) ;
                console.log(f5data);
                let app = EncounterBuilder.initVue(f5data);
            }
            
        </script>

        @include('partials.statblock')
        @include('partials.statblock-feature')
        @include('partials.encounter-graph')

        <footer>Frankenstein 5E is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</footer>

    </body>
</html>
