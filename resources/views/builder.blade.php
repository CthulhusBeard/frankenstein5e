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

            <div class="slide-button" v-bind:class="{ selected : editor.edit_mode }" @click="editor.edit_mode = !editor.edit_mode">
                <label>Edit Mode</label>
            </div>

            @include('partials.statblock')

            <div class="cr-controller popup-overlay">
                <strong>Challenge Rating Manager</strong>
                <div>
                    Approx. Offensive CR: @{{damageCr}}<br/>
                    Approx. Health CR: @{{healthCr}}<br/>
                    Approx. Armor CR: @{{armorCr}}
                </div>
                <div> 
                    <label class="option-label" for="options__set-cr">Set CR: </label>
                    <select id="option options__set-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>Apply</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-cr">Set Offensive CR: </label>
                    <select id="option options__set-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>Apply</button>
                </div>
                <div> 
                    <label class="option-label" for="options__set-cr">Set Defensive CR: </label>
                    <select id="option options__set-cr" name="options__set-cr">
                        <option v-for="(item, index) in f5.challengerating" :value="index">@{{index}}</option>
                    </select>
                    <button>Apply</button>
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
                    const editFields = document.querySelectorAll(".focus-edit.focused");
                    editFields.forEach(function(el) { 
                        el.classList.remove('focused');
                    });

                    if(e.target.closest(".focus-edit") && !e.target.closest(".feature__remove")) {   //Click on any object other than an edittable one
                        e.target.closest(".focus-edit").classList.add('focused');
                    }
                });

            };
        </script>

        @include('partials.feature')

    </body>
</html>
