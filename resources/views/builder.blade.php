<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Frankenstein 5</title>
        
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
        <script src="{{mix('js/app.js')}}" defer></script>

        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{mix('css/app.css')}}">
        <link rel="stylesheet" type="text/css" href="{{asset('css/vueform/default.css')}}">
    </head>
    <body ng-app="f5App" ng-controller="f5Ctrl">
        <div id="f5" class="main-content full-height">

            <div class="builder-controls">
                <div class="slide-button" v-bind:class="{ selected : editor.edit_mode }" @click="editor.edit_mode = !editor.edit_mode">
                    <label>@{{f5.misc.title_edit_mode}}</label>
                </div>
                <div class="slide-button" v-bind:class="{ selected : editor.spell_slots }" @click="editor.spell_slots = !editor.spell_slots">
                    <label>@{{f5.misc.title_use_spell_slots}}</label>
                </div>
                <label class="control-label" for="controls__columns">@{{f5.misc.title_columns}}: </label>
                <select v-model="editor.columns">
                        <option v-for="i in 3" :value="i">@{{i}}</option>
                </select>
            </div>

            @include('partials.statblock')

            <div class="cr-controller popup-overlay">
                <strong>@{{f5.misc.title_cr_manager}}</strong>
                <div>
                    @{{f5.misc.title_approx_dpr}}: @{{averageDPR}}<br/>
                    @{{f5.misc.title_offensive_cr}}: @{{damageCr}}<br/>
                    @{{f5.misc.title_hp_cr}}: @{{healthCr}}<br/>
                    @{{f5.misc.title_ac_cr}}: @{{armorCr}}
                </div>
                <div> 
                    <label class="option-label" for="options__set-cr">@{{f5.misc.title_set_cr}}: </label>
                    <select id="option options__set-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-o-cr">@{{f5.misc.title_set_offensive_cr}}: </label>
                    <select id="option options__set-o-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-hp-cr">@{{f5.misc.title_set_hp_cr}}: </label>
                    <select id="option options__set-hp-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-ac-cr">@{{f5.misc.title_set_ac_cr}}: </label>
                    <select id="option options__set-ac-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>@{{f5.misc.title_apply}}</button>
                </div>
            </div>
        


        </div>
        
        <script>
            window.onload = function() {
                let f5data = JSON.parse({!! json_encode($translatedData) !!}) ;
                console.log(f5data);
                let app = StatBlock.initVue(f5data);
            
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

        @include('partials.feature')

    </body>
</html>
