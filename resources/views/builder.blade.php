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

            
            <div class="creature-options">

                <label class="option-label" for="options__resistances">@{{f5.misc.title_damage_resistances}}</label>
                <div class="option options-row options__resistances">
                    <div :class="'options__resistance option-box '+index" v-for="(item, index) in f5.damagetypes">
                        <label :for="'resistance_'+index">@{{item.name}}</label>
                        <input :id="'resistance_'+index" type="checkbox" v-on:click="unsetDamages(index, 'resistance')" v-model="options.damageResistances[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__immunities">@{{f5.misc.title_damage_immunities}}</label>
                <div class="option options-row options__immunities">
                    <div :class="'options__immunity option-box '+index" v-for="(item, index) in f5.damagetypes">
                        <label :for="'immunity_'+index">@{{item.name}}</label>
                        <input :id="'immunity_'+index" type="checkbox" v-on:click="unsetDamages(index, 'immunity')" v-model="options.damageImmunities[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__vulnerabilities">@{{f5.misc.title_damage_vulnerabilities}}</label>
                <div class="option options-row options__vulnerabilities">
                    <div :class="'options__vulnerability option-box '+index" v-for="(item, index) in f5.damagetypes">
                        <label :for="'vulnerability_'+index">@{{item.name}}</label>
                        <input :id="'vulnerability_'+index" type="checkbox" v-on:click="unsetDamages(index, 'vulnerability')" v-model="options.damageVulnerabilites[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__condition_immunities">@{{f5.misc.title_condition_immunities}}</label>
                <div class="option options-row options__condition_immunities">
                    <div :class="'options__condition_immunity option-box '+index" v-for="(item, index) in f5.conditions">
                        <label :for="'condition_immunity_'+index">@{{item.name}}</label>
                        <input :id="'condition_immunity_'+index" type="checkbox" v-model="options.conditionImmunities[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__senses">Senses</label>
                <div class="option options-row options__senses">
                    <div :class="'options__senses option-box '+index" v-for="(item, index) in f5.senses">
                        <label :for="'sense_'+index">@{{item.name}}</label>
                        <select :name="'options__sense_'+index" v-model="options.senses[index]">
                            <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+options.measure.measureUnit}}</option>
                        </select>
                    </div>
                </div>

                <label class="option-label" for="options__skills">Skill Proficiencies</label>
                <div class="option options-row options__skills">
                    <div :class="'options__skill option-box '+index" v-for="(item, index) in f5.skills">
                        <label :for="'skill_'+index">@{{item.name}}</label>
                        <input :id="'skill_'+index" type="checkbox" id="checkbox" v-model="options.skills[index]">
                    </div>
                </div>

                <button class="add-feature-btn">+ Feature</button>
    
            </div>

            @include('partials.featurebuilder')

        </div>
        

        <script>
            window.onload = function() {
                let f5data = JSON.parse({!! json_encode($translatedData) !!}) ;
                console.log(f5data);
                let app = StatBlock.initVue(f5data);


                    //Listeners
            
                //Edit Fields. Allow focused objects to be editted while making others uneditable
                document.addEventListener('click', function(e) {
                    if(!e.target.closest(".focusEdit")) {   //Click on any object other than an edittable one
                        const editFields = document.querySelectorAll(".focusEdit.focused");
                        editFields.forEach(function(el) { 
                            el.classList.remove('focused');
                        });
                    }
                });

                const editFields = document.querySelectorAll(".focusEdit"); //Get all edittable elements
                for (const editField of editFields) {
                    editField.addEventListener('click', clearEditFields); 
                }

                function clearEditFields(e) { //Clear other edittable fields
                    const editFields = document.querySelectorAll(".focusEdit.focused");
                    editFields.forEach(function(el) { 
                        el.classList.remove('focused');
                    });
                    e.target.closest(".focusEdit").classList.add('focused');
                }

                //Add Feature
                document.querySelector(".add-feature-btn").addEventListener('click', function() {
                    document.querySelector(".add-feature").classList.add('show');
                });


            };
        </script>
    </body>
</html>
