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

                <label class="option-label" for="options__names">Creature Name</label>
                <div class="option options__names">
                    <input type="text" id="options__name" name="options__name" v-model="options.name" />
                </div>

                <label class="option-label" for="options__sizes">Size</label>
                <div class="option options__sizes">
                    <select id="options__size" name="options__size" v-model="options.size">
                        <option disabled value="">Please select one</option>
                        <option v-for="(item, index) in f5.creaturesizes" :value="index">@{{item.name}}</option>
                    </select>
                </div>

                <label class="option-label" for="options__types">Type</label>
                <div class="option options__types">
                    <select id="options__type" name="options__type" v-model="options.type">
                        <option disabled value="">Please select one</option>
                        <option v-for="(item, index) in f5.creaturetypes" :value="index">@{{item.name}}</option>
                    </select>
                </div>

                <label class="option-label" for="options__subtypes">Subtype</label>
                <div class="option options__subtypes">
                    <select id="options__subtype" name="options__subtype" v-model="options.subtype">
                        <option selected value="">None</option>
                        <option v-for="(item, index) in f5.creaturesubtypes" :value="index">@{{item.name}}</option>
                    <!--<option v-for="item in orderedSubtypes" :value="item.id">@{{item.name}}</option>-->
                    </select>
                </div>

                <label class="option-label" v-if="typeOptionList.length > 0" for="options__typeOption">Type Option</label>
                <div class="option options__type-option" v-if="typeOptionList.length > 0">
                    <select id="options__type-option" name="options__typeOption" v-model="options.typeOption">
                        <option value="">None</option>
                        <option v-for="item in typeOptionList" :value="item.id">@{{item.name}}</option>
                    </select>
                    <input type="checkbox" v-model="options.showTypeOption">
                </div>

                <label class="option-label" for="options__alignments">Alignment</label>
                <div class="option options__alignments">
                    <select id="options__alignment" name="options__alignment" v-model="options.alignment">
                        <option value="">None</option>
                        <option v-for="(item, index) in f5.alignments" :value="index">@{{item.name}}</option>
                    </select>
                </div>
                
                <label class="option-label" for="options__armorclass">@{{f5.misc.title_armor_class}}</label>
                <div class="option options__armorclass">
                    <select id="options__armorclass" name="options__armorclass" v-model="options.armorClass.type">
                        <option disabled value="">Please select one</option>
                        <option v-for="(item, index) in f5.armor" :value="index" >@{{generateArmourText(item, f5.misc.max)}}</option>
                    </select>
                    <div v-if="options.armorClass.type === 'custom'" >
                        Armor Name: <input v-model='options.armorClass.name'/><br/>
                        <!--Disadvantage on Stealth: <input type="checkbox" v-model="options.armorClass.stealthDis">-->
                    </div>
                    <span v-if="allowAcSelector">
                        @{{f5.misc.title_armor_class}}: <select name="options__armorclass_range" v-model="options.armorClass.manual">
                            <option v-for="(val, i) in getAcRange" :value="val" >@{{val}}</option>
                        </select>
                    </span>
                    <span v-if="allowAcBonus">
                        Magical Bonus: +<select name="options__armorclass_range" v-model="options.armorClass.bonus" >
                            <option v-for="i in 6" :value="i-1" >@{{i-1}}</option>
                        </select>     
                    </span>           
                </div>

                <label class="option-label" for="options__hitpoints">@{{f5.misc.title_hit_dice}}</label>
                <div class="option options__hitpoints">
                    <label>@{{f5.misc.amount}}:</label>
                    <select id="options__hitdice-amount" name="options__hitdice-amount" v-model="options.hitDice.amount">
                        <option v-for="i in 30" :value="i" >@{{i}}</option>
                    </select>
                    <label>@{{f5.misc.type}}:</label>
                    <select id="options__hitdice-type" name="options__hitdice-type" v-model="options.hitDice.type">
                        <option v-for="i in f5.hitdice" :value="i" >@{{i}}</option>
                    </select>
                </div>

                <label class="option-label" for="options__abilities">@{{f5.misc.title_abilities}}</label>
                <div class="option options-row options__abilities">
                    <div :class="'options__ability option-box '+index" v-for="(item, index) in f5.abilities">
                        @{{item.name}}
                        <select :name="'options__ability_'+index" v-model="options.abilities[index]">
                            <option v-for="i in 31" :value="i-1" >@{{i-1}}</option>
                        </select>
                    </div>
                </div>
                
                <label class="option-label" for="options__speeds">@{{f5.misc.title_speed}}</label>
                <div class="option options-row options__speeds">
                    <div :class="'options__speed option-box '+index" v-for="(item, index) in f5.speeds">
                        <label :for="index">@{{item.name}}</label>
                        <select :name="'options__speed_'+index" v-model="options.speeds[index]">
                            <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+options.measureUnit}}</option>
                        </select>
                        <span v-if="index === 'fly' && options.speeds['fly'] > 0">
                            @{{f5.misc.hover}}: <input type="checkbox" v-model="options.hover">
                        </span>
                    </div>
                </div>
                
                <label class="option-label" for="options__resistances">@{{f5.misc.title_damage_resistances}}</label>
                <div class="option options-row options__resistances">
                    <div :class="'options__resistance option-box '+index" v-for="(item, index) in f5.damagetypes">
                        <label :for="'resistance_'+index">@{{item.name}}</label>
                        <input :id="'resistance_'+index" type="checkbox" v-model="options.damageResistances[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__immunities">@{{f5.misc.title_damage_immunities}}</label>
                <div class="option options-row options__immunities">
                    <div :class="'options__immunity option-box '+index" v-for="(item, index) in f5.damagetypes">
                        <label :for="'immunity_'+index">@{{item.name}}</label>
                        <input :id="'immunity_'+index" type="checkbox" v-model="options.damageImmunities[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__vulnerabilities">@{{f5.misc.title_damage_vulnerabilities}}</label>
                <div class="option options-row options__vulnerabilities">
                    <div :class="'options__vulnerability option-box '+index" v-for="(item, index) in f5.damagetypes">
                        <label :for="'vulnerability_'+index">@{{item.name}}</label>
                        <input :id="'vulnerability_'+index" type="checkbox" v-model="options.damageVulnerabilites[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__condition_immunities">@{{f5.misc.title_condition_immunities}}</label>
                <div class="option options-row options__condition_immunities">
                    <div :class="'options__condition_immunity option-box '+index" v-for="(item, index) in f5.conditions">
                        <label :for="'condition_immunity_'+index">@{{item.name}}</label>
                        <input :id="'condition_immunity_'+index" type="checkbox" v-model="options.conditionImmunities[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__languages">Languages</label>
                <div class="option options-row options__languages">
                    <div :class="'options__language option-box '+index" v-for="(item, index) in f5.languages">
                        <label :for="'language_'+index">@{{item.name}}</label>
                        <input :id="'language_'+index" type="checkbox" v-model="options.languages[index]">
                    </div>
                </div>
                
                <label class="option-label" for="options__senses">Senses</label>
                <div class="option options-row options__senses">
                    <div :class="'options__senses option-box '+index" v-for="(item, index) in f5.senses">
                        <label :for="'sense_'+index">@{{item.name}}</label>
                        <select :name="'options__sense_'+index" v-model="options.senses[index]">
                            <option v-for="(val, i) in [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200,250,300]" :value="val" >@{{val+' '+options.measureUnit}}</option>
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

            @include('partials.statblock')

        </div>
        
        <script src="{{mix('js/app.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/statblock.js')}}" type="text/javascript"></script>

        <script>
            let f5data = JSON.parse({!! json_encode($translatedData) !!}) ;
            initVue(f5data);

            $('.add-feature-btn').click(function() {
                $('.add-feature').addClass('show');
            });
        </script>
    </body>
</html>
