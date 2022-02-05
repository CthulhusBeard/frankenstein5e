<div class="add-feature popup-overlay">
    <strong class="title-size">Create New Feature</strong><br/>

    <div class="feature-section">
        <label>Name:</label>
        <input type="text" v-model="newFeature.name" />
    </div>
    
    <div class="feature-section">
        <label>Action Type:</label>
        <select name="featureAction" v-model="newFeature.action">
            <option v-for="(item, index) in f5.featureactiontypes" :value="index">@{{item.name}}</option>
        </select>
    </div>

    <div class="feature-section">
        <label>Template Type:</label>
        <select name="featureTemplate" v-model="newFeature.template">
            <option v-for="(item, index) in f5.featuretemplates" :value="index">@{{item.name}}</option>
        </select>
        <div class="feature-specifics" v-if="newFeature.template === 'attack'">
            <select name="featureAttackMeleeRanged" v-model="newFeature.attack.meleeRanged">
                <option value="melee">Melee</option>
                <option value="ranged">Ranged</option>
                <option value="meleeranged">Melee or Ranged</option>
            </select>
            <select name="featureAttackWeaponSpell" v-model="newFeature.attack.weaponSpell">
                <option value="weapon">Weapon</option>
                <option value="spell">Spell</option>
            </select>
            <span v-if="newFeature.attack.meleeRanged !== 'ranged'" >
                <label>Attack Reach:</label>
                <select name="featureAttackReach" v-model="newFeature.attack.reach">
                    <option v-for="i in 5" :value="i*5">@{{i*5 + options.measure.measureUnit}}</option>
                </select>
            </span>
            <span v-if="newFeature.attack.meleeRanged !== 'melee'" >
                <label>Attack Range:</label>
                Short: 
                <select name="featureAttackRangeShort" v-model="newFeature.attack.rangeShort">
                    <option v-for="i in 10" :value="i*5">@{{i*5 + options.measure.measureUnit}}</option>
                </select>
                Long: 
                <select name="featureAttackRangeLong" v-model="newFeature.attack.rangeLong">
                    <option v-for="i in 10" :value="i*5">@{{i*5 + options.measure.measureUnit}}</option>
                </select>
            </span>
            <br/>
            <label>Targets:</label>
            <select name="featureAttackTargets" v-model="newFeature.attack.targets">
                <option v-for="i in 5" :value="i">@{{i}}</option>
            </select>
            <label>Ability:</label>
            <select name="featureAttackAbility" v-model="newFeature.attack.ability">
                <option v-for="(item, index) in f5.abilities" :value="index">@{{item.name}}</option>
            </select>

            <br/>
            <label>Damage:</label>
            <label>@{{f5.misc.amount}}:</label>
            <select name="featureAttackDiceAmount" v-model="newFeature.attack.diceAmount">
                <option v-for="i in 30" :value="i" >@{{i}}</option>
            </select>
            <label>@{{f5.misc.type}}:</label>
            <select name="featureAttackDamageDice" v-model="newFeature.attack.damageDice">
                <option v-for="i in f5.hitdice" :value="i" >@{{i}}</option>
            </select>

            <div v-html="newFeatureAttackText"></div>
        </div>
        
        <div class="feature-specifics" v-if="newFeature.template === 'spellcasting'">
            <?php /*
            <label>Range:</label>
            <select name="featureSpellAOE" v-model="newFeature.spell.areaOfEffect">
                <option v-for="(item, index) in f5.areaofeffect" :value="index">@{{item.name}}</option>
            </select>
            <span v-if="newFeature.spell.areaOfEffect !== 'melee'">
                <label>Target Area:</label>
                <select name="featureSpellRange" v-model="newFeature.spell.range">
                    <option v-for="i in f5.areaofeffect[newFeature.spell.areaOfEffect].ranges" :value="i">@{{i}}</option>
                </select>
            </span>
            */ ?>
            <label>Ability:</label>
            <select name="featureSpellAbility" v-model="newFeature.spell.ability">
                <option v-for="(item, index) in f5.abilities" :value="index">@{{item.name}}</option>
            </select>

            <div v-html="newFeatureSpellText"></div>
        </div>
    </div>

    <div class="feature-section">
        <label>Recharge:</label>
        <select v-model="newFeature.recharge">
            <option :val="i-1" v-for="i in 7">@{{i-1}}</option>
        </select>
    </div>

    <div class="feature-section feature-text">
        <label>Feature Text:</label>
        <textarea type="text" v-model="newFeature.desc" >@{{newFeature.desc}}</textarea>
    </div>
    
    <div class="feature-section">
        <button class="add-roll">Add Condition Effect</button>
    </div>
    <div class="feature-section">
        <button class="add-roll">Add Roll</button>
    </div>
    
    <div class="feature-section">
        <button class="add-feature-button">Add Feature</button>
    </div>
</div>