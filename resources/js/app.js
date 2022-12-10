import * as Vue from 'vue';
window.Vue = Vue;

import * as EncounterBuilder from './encounter-builder';
window.EncounterBuilder = EncounterBuilder;

window.onload = function() {

    //Edit Fields. Allow focused objects to be editted while making others uneditable
    document.addEventListener('mousedown', function(e) {
        changeFocus(e.target);
    });
    
    //Get F5 Data file
    fetch('data/frankenstein5.json')
        .then((response) => response.json())
        .then((f5data) => init(f5data));


    //Change focused edittable element
    function changeFocus(element = null) {
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