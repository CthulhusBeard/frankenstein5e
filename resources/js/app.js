require('./bootstrap');

import $ from 'jquery';
window.$ = window.jQuery = $;

//Vue
import Vue from "vue";
window.Vue = Vue;

/*
Vue.component('ability_display', {
    props: ['item', 'ability_value'],
    template: '<div class="stat-block__ability">'+
        '<div class="stat-block__ability-name">{{item.name}}</div>'+
        '<div class="stat-block__ability-score">{{ability_value}} ({{calcAbilityModifier(ability_value)}})</div>'+
        '</div>',
    methods: {
        calcAbilityModifier: function (abilityScore) {
            console.log('abilityScore!: '+abilityScore);
            return Math.floor((abilityScore-10)/2);
        }
    }
});*/

//Custom Stuff
import * as CreatureManager from './creaturemanager.js';
window.CreatureManager = CreatureManager;