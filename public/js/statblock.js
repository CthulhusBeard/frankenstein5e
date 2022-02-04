function initVue(f5data) {

    let vueData = {
        options: {
            name: 'Monster',
            size: '',
            type: '',
            subtype: '',
            typeCategory: '',
            showtypeCategory: true,
            alignment: '',
            showTypicalAlignment: true,
            armorClass: {
                type: 'none',
                manual: '10',
                name: f5data.armor.none.name,
                bonus: '0',
                stealthDis: false,
            },
            hitPoints: {
                type: 4,
                amount: 1,
                additional: 0,
            },
            abilities: {},
            savingThrows: {},
            damageResistances: {},
            damageImmunities: {},
            damageVulnerabilites: {},
            conditionImmunities: {},
            skills: {},
            languages: {},
            speeds: {},
            senses: {},

            measureUnit: 'ft.',
            showNonCombat: true,
            proficiency: 2,
            targetCR: {
                offensive: {
                }, 
                defensive: {
                }
            },
        },
        newFeature: {
            name: 'Name',
            action: 'action',
            template: 'attack',
            desc: '',
            recharge: 0,
            attack: {
                meleeRanged: 'melee',
                weaponSpell: 'weapon',
                reach: '5',
                rangeShort: '5',
                rangeLong: '5',
                ability: 'str',
                targets: '1',
                diceAmount: '1',
                damageDice: '4',
            }, 
            spell: {
                areaOfEffect: 'melee',
                range: '5',
                ability: 'str',
            },
        },
        f5: f5data,
    };

    for(let ability in f5data.abilities) {
        vueData.options.abilities[ability] = 10;
        vueData.options.savingThrows[ability] = false;
    }

    /*
    for(let type in f5data.damagetypes) {
        vueData.options.damageResistances[type] = false;
    }

    for(let type in f5data.damagetypes) {
        vueData.options.damageImmunities[type] = false;
    }

    for(let skill in f5data.skills) {
        vueData.options.skills[skill] = false;
    }
    */

    for(let sense in f5data.senses) {
        vueData.options.senses[sense] = 0;
    }

    for(let lang in f5data.languages) {
        if(f5data.languages[lang]['hidden']) {
            continue;
        }
        if(f5data.languages[lang]['default']) {
            vueData.options.languages[lang] = f5data.languages[lang]['default'];
        } else {
            vueData.options.languages[lang] = false;
        }
    }

    for(let speed in f5data.speeds) {
        if(f5data.speeds[speed]['default']) {
            vueData.options.speeds[speed] = f5data.speeds[speed]['default'];
        } else {
            vueData.options.speeds[speed] = 0;
        }
    }
    vueData.options.hover = false;
    
    let app = new Vue({
        el: '#f5',
        data: vueData,
        components: {
            'Multiselect': Multiselect
        },

        computed: {

            //Feature
            generateFeatureTemplate: function() {
                return this.newFeature.action + this.newFeature.template;
            },

            //Challenge Rating
            damageCr: function() {
                //TODO: Factor in DPR and offensive features
                return 'O-CR';
            },

            healthCr: function() {
                //TODO: Factor in AC, HP, and defensive features
                let hp = this.getHP;

                let approxCr = 31;

                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(hp >= cr.hp.low && hp <= cr.hp.high) {
                        approxCr = i;
                        break;
                    }
                }

                return approxCr;
            },

            armorCr: function() {
                //TODO: Factor in AC, HP, and defensive features
                let ac = this.getAC;
                if(!ac) {
                    return 'Unset';
                } else if(ac < this.f5.challengerating[0].ac) {
                    return '0';
                } else if(ac > this.f5.challengerating[20].ac) {
                    return '> 30';
                }
                let crLow = 31;
                let crHigh = 0;

                for(let i in this.f5.challengerating) {
                    let cr = this.f5.challengerating[i];
                    if(ac == cr.ac) {
                        if(cr.cr > crHigh) {
                            crHigh = cr.cr;
                        }
                        if(cr.cr < crLow) {
                            crLow = cr.cr;
                        }
                    }
                }

                if(crLow == crHigh) return crLow; 
                return crLow+'-'+crHigh;
            },



            averageCR: function() {
                //Average CRs
                return 'A-CR';
            },

            //Description Text
            descriptionText: function() {
                let descStr = '';
                if(this.options.size) {
                    descStr += this.getProp(this.f5.creaturesizes[this.options.size]);
                    this.options.hitPoints.diceType = this.f5.creaturesizes[this.options.size].hit_dice;
                }
                if(this.options.type) {
                    if(descStr != '') descStr += ' '; 
                    descStr += this.getProp(this.f5.creaturetypes[this.options.type]);
                }
                if(this.options.subtype /*|| (this.options.showtypeCategory && this.options.typeCategory)*/) { 
                    if(descStr != '') descStr += ' '; 
                    descStr += '('
                    if(this.options.subtype) {
                        descStr += this.getProp(this.f5.creaturesubtypes[this.options.subtype]);
                    }
                    /* Do something with category?
                    if(this.options.subtype && (this.options.showtypeCategory && this.options.typeCategory)) { 
                        str += ', ';
                    }
                    */
                    descStr += ')';
                }

                if(this.options.alignment) {
                    if(descStr != '') descStr += ', '; 
                    descStr += this.getProp(this.f5.alignments[this.options.alignment]);
                }
                
                return this.capitalize(descStr);
    
            },

            //Armor Class
            allowAcSelector: function() {
                if(this.options.armorClass && this.options.armorClass.type && this.f5.armor[this.options.armorClass.type]) {
                    return (this.f5.armor[this.options.armorClass.type].range);
                }
                return false;
            },

            allowAcBonus: function() {
                if(this.f5.armor[this.options.armorClass.type] && this.f5.armor[this.options.armorClass.type].allow_bonus) {
                    return true;
                }
                return false;
            },

            getAcRange: function() {
                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type] && 
                    this.f5.armor[this.options.armorClass.type].range &&
                    this.f5.armor[this.options.armorClass.type].range.low &&
                    this.f5.armor[this.options.armorClass.type].range.high
                ) {
                    let arr = [];
                    for(let i = this.f5.armor[this.options.armorClass.type].range.low; i < this.f5.armor[this.options.armorClass.type].range.high+1; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
                return 30;
            },

            getAC: function() {
                let acValue = 0;
                let statBonus = 0;

                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type]
                ) {

                    //set AC value
                    if(this.f5.armor[this.options.armorClass.type].range) {
                        //manual value
                        acValue = parseFloat(this.options.armorClass.manual);

                    } else if(this.f5.armor[this.options.armorClass.type].base) {
                        //base value
                        acValue = this.f5.armor[this.options.armorClass.type].base;
                        if(this.f5.armor[this.options.armorClass.type].bonus && this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]) {
                            //get stat bonus
                            statBonus = this.getAbilityMod(this.f5.armor[this.options.armorClass.type].bonus);
                            if(this.f5.armor[this.options.armorClass.type].max_bonus && statBonus > this.f5.armor[this.options.armorClass.type].max_bonus) {
                                //set to max bonus
                                statBonus = this.f5.armor[this.options.armorClass.type].max_bonus;
                            }
                            acValue += parseFloat(statBonus);
                        }
                    } else {
                        console.error('Couldn\'t calculate AC');
                    }
                    
                    if(this.allowAcBonus && this.options.armorClass.bonus && this.options.armorClass.bonus > 0) {
                        acValue += parseFloat(this.options.armorClass.bonus);
                    }

                }
                return acValue;
            },

            acText: function() {
                let acText = '';
                let name = '';
                let acValue = 0;
                let magicalBonus = '';
                let statBonus = 0;
                let stealthDis = '';

                if(
                    this.options.armorClass && 
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type]
                ) {
                    //set name
                    if(this.options.armorClass.type === 'custom' && this.options.armorClass.name) {
                        name = this.options.armorClass.name;
                    } else if(this.f5.armor[this.options.armorClass.type].name) {
                        name = this.f5.armor[this.options.armorClass.type].name;
                    }

                    //set AC value
                    if(this.f5.armor[this.options.armorClass.type].range) {
                        //manual value
                        acValue = parseFloat(this.options.armorClass.manual);
                        if(this.options.armorClass.stealthDis) {
                            stealthDis = ' ('+this.f5.misc.stealth_dis+')';
                        }

                    } else if(this.f5.armor[this.options.armorClass.type].base) {
                        //base value
                        acValue = this.f5.armor[this.options.armorClass.type].base;
                        if(this.f5.armor[this.options.armorClass.type].bonus && this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]) {
                            //get stat bonus
                            statBonus = this.getAbilityMod(this.f5.armor[this.options.armorClass.type].bonus);
                            if(this.f5.armor[this.options.armorClass.type].max_bonus && statBonus > this.f5.armor[this.options.armorClass.type].max_bonus) {
                                //set to max bonus
                                statBonus = this.f5.armor[this.options.armorClass.type].max_bonus;
                            }
                            acValue += parseFloat(statBonus);
                        }
                        if(this.f5.armor[this.options.armorClass.type].stealth_dis) {
                            stealthDis = ' ('+this.f5.misc.stealth_dis+')';
                        }
                    } else {
                        console.error('Couldn\'t calculate AC');
                    }
                    
                    if(this.allowAcBonus && this.options.armorClass.bonus && this.options.armorClass.bonus > 0) {
                        acValue += parseFloat(this.options.armorClass.bonus);
                        magicalBonus = "+"+this.options.armorClass.bonus+' ';
                    }

                    acText = acValue + ' (' + magicalBonus + name +')';// +stealthDis;
                }
                return acText;
            },

            //Hit Points
            getHP: function() {
                let type = this.options.hitPoints.diceType;
                let amount = this.options.hitPoints.diceAmount;
                let additionalHP = this.options.hitPoints.additional > 0 ? Math.floor(this.options.hitPoints.additional) : 0;
                if(additionalHP > 9999) {
                    this.options.hitPoints.additional = additionalHP = 9999;
                }
                let conMod = this.getAbilityMod('con');
                let conHP = 0;
                if(conMod > 0) {
                    conHP = conMod * amount;
                }
                let hp = (Math.round((type / 2 + .5) * amount) + conHP) + additionalHP;
                return hp;
            },

            hitPointsText: function() {
                let type = this.options.hitPoints.diceType;
                let amount = this.options.hitPoints.diceAmount;
                let additionalHP = this.options.hitPoints.additional > 0 ? Math.floor(this.options.hitPoints.additional) : 0;
                if(additionalHP > 9999) {
                    this.options.hitPoints.additional = additionalHP = 9999;
                }
                let conMod = this.getAbilityMod('con');
                let conHP = 0;
                if(conMod > 0) {
                    conHP = conMod * amount;
                }

                let hp = (Math.round((type / 2 + .5) * amount) + conHP) + additionalHP;
                if(isNaN(hp)) {
                    return this.f5.misc.undefined_health; 
                }
                let conText = '';
                if(conHP > 0) {
                    conText = ' + '+conHP;
                }
                let hpText = hp+' ('+amount+this.f5.misc.die_symbol+type+conText;
                if(additionalHP > 0) {
                    hpText += ' + '+additionalHP;
                }
                hpText += ')';
                return hpText;
            },

            //Damages
            //TODO have a fix for redundancies
            //If in immunity, then remove from resistance and vulnerability
            //If in resistance, then remove from vulnerability
            damageResistanceText: function() {   
                return this.damageList(this.options.damageResistances);
            },
            damageImmunitiesText: function() { 
                return this.damageList(this.options.damageImmunities);
            },
            damageVulnerabilitiesText: function() { 
                return this.damageList(this.options.damageVulnerabilites);
            },
            conditionImmunitiesText: function() {
                return this.conditionList(this.options.conditionImmunities);
            },


            //Speeds
            speedText: function() {
                let displayText = '';
                for(let i in this.options.speeds) {
                    if(!this.options.speeds[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    if(!this.f5.speeds[i]['hide_name']) {
                        displayText += this.f5.speeds[i].name+' ';
                    }
                    displayText += this.options.speeds[i]+' '+this.options.measureUnit; 
                    if(i === 'fly' && this.options.hover) {
                        displayText += ' ('+this.f5.misc.hover+')';
                    }
                }
                if(!displayText) {
                    displayText = this.f5.misc.cant_move;
                }
                return displayText;
            },

            //Senses
            sensesText: function() {                
                let displayText = '';
                for(let i in this.options.senses) {
                    if(!this.options.senses[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    if(!this.f5.senses[i]['hide_name']) {
                        displayText += this.f5.senses[i].name+' ';
                    }
                    displayText += this.options.senses[i]+' '+this.options.measureUnit;
                }
                return displayText;
            },

            //Subtypes
            orderedSubtypes: function() {
                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type]['subtypes']) {
                    let topSubtypes = [];
                    let count = 0;

                    for (let i in this.$data.f5.creaturesubtypes) {
                        
                        let subtypeObj = this.$data.f5.creaturesubtypes[i];
                        subtypeObj.id = i;

                        if(this.$data.f5.creaturetypes[this.options.type]['subtypes'].includes(i)) {
                            console.log('splice '+i);
                            topSubtypes.splice(count, 0, subtypeObj);
                            count++;
                        } else {
                            topSubtypes.push(subtypeObj);
                        }
                    }

                    return topSubtypes;
                }
        
                return this.f5.creaturesubtypes;
            },

            //Type Options
            typeCategoryList: function() {
                let optionsList = [];

                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type].hasOwnProperty('options')) {
                    for (let i in this.$data.f5.creaturetypes[this.options.type]['options']) {
                        let data = this.$data.f5.creaturetypes[this.options.type]['options'][i];
                        data.id = i;
                        optionsList.push(data);
                    }
                }

                if(this.$data.f5.creaturesubtypes.hasOwnProperty(this.options.subtype) && this.$data.f5.creaturesubtypes[this.options.subtype].hasOwnProperty('options')) {
                    for (let i in this.$data.f5.creaturesubtypes[this.options.subtype]['options']) {
                        let data = this.$data.f5.creaturesubtypes[this.options.subtype]['options'][i];
                        data.id = i;
                        optionsList.push(data);
                    }
                }

                return optionsList;
            },

            //Languages
            languageText: function() {
                let displayText = '';

                if(this.options.languages['all']) {
                    return this.$data.f5.languages['all'].name;
                }

                for(let i in this.options.languages) {
                    if(!this.options.languages[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.$data.f5.languages[i].name; 
                }
                return displayText;
            },

            //Skills
            skillText: function() {
                let displayText = '';

                for(let i in this.options.skills) {
                    if(!this.options.skills[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }

                    displayText += this.$data.f5.skills[i].name + ' '+this.calcSkillMod(i, true); 
                }
                return displayText;
            },

            //Saving Throw
            savingThrowText: function() {
                let displayText = '';

                for(let i in this.options.savingThrows) {
                    if(!this.options.savingThrows[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }

                    displayText += i.toUpperCase() + ' +'+(this.getAbilityMod(i) + this.options.proficiency); 
                }
                return displayText;
            },

            //
            proficiencyText: function() {
                return "+"+this.options.proficiency;
            },

            //Challenge Rating
            crText: function() {
                return 'CR ?? ';
            },

            ///////////////// NEW FEATURE /////////////////
            newFeatureAttackText: function() {
                let abilityMod = this.getAbilityMod(this.newFeature.attack.ability);
                let str = '<span class="i">';
                if(this.newFeature.attack.meleeRanged == 'meleeranged') {
                    str += 'Melee or Ranged';
                } else if(this.newFeature.attack.meleeRanged == 'melee') {
                    str += 'Melee';
                } else if(this.newFeature.attack.meleeRanged == 'ranged') {
                    str += 'Ranged';
                }
                if(this.newFeature.attack.weaponSpell == 'weapon') {
                    str += ' Weapon ';
                } else if(this.newFeature.attack.weaponSpell == 'spell') {
                    str += ' Spell ';
                }
                str += 'Attack:</span> +';
                str += (abilityMod+this.options.proficiency);
                str += ' to hit';

                if(this.newFeature.attack.meleeRanged !== 'ranged') {
                    str += ', reach '+this.newFeature.attack.reach+' '+this.options.measureUnit;
                    str += ', '+this.newFeature.attack.targets+' target';
                    if(this.newFeature.attack.targets !== 1) {
                        str += 's';
                    }
                }

                if(this.newFeature.attack.meleeRanged !== 'melee') {
                    str += ', range ';
                    str += this.newFeature.attack.rangeShort;
                    if(this.newFeature.attack.rangeLong > this.newFeature.attack.rangeShort) {
                        str += '/'+this.newFeature.attack.rangeLong;
                    }
                    str += ' '+this.options.measureUnit;
                    str += ', '+this.newFeature.attack.targets+' target';
                    if(this.newFeature.attack.targets !== 1) {
                        str += 's';
                    }
                }

                str += '. <span class="i">Hit: </span> (';
                str += this.newFeature.attack.diceAmount+'d'+this.newFeature.attack.damageDice;
                if(abilityMod > 0) {
                    str += ' + '+abilityMod;
                } else if(abilityMod < 0) {
                    str += ' - '+(abilityMod*-1);
                } 
                str += ')';

                return str;
            },

            newFeatureSpellText: function() {
                let str = '';

                return str;
            },
        },

        methods: {
            showEdit: function() {
                console.log('showEdit');
            },

            hideEdit: function() {
                console.log('hideEdit');
            },

            damageList: function(input) {
                let list = '';
                for(let i in input) {
                    if(!input[i]) continue;
                    if(this.f5.damagetypes[i].long_name) {
                        if(list !== '') list += '; ';
                        list += this.f5.damagetypes[i].long_name;
                    } else {
                        if(list !== '') list += ', ';
                        list += this.f5.damagetypes[i].name;
                    }
                }
                return list;
            },

            unsetDamages: function(i, type = null) {
                if(type != "resistance" && this.options.damageResistances[i]) {
                    this.options.damageResistances[i] = false;
                }
                if(type != "immunity" && this.options.damageImmunities[i]) {
                    this.options.damageImmunities[i] = false;
                }
                if(type != "vulnerability" && this.options.damageVulnerabilites[i]) {
                    this.options.damageVulnerabilites[i] = false;
                }
            },

            conditionList: function(input) {
                let list = '';
                for(let i in input) {
                    if(!input[i]) continue;                    
                    if(list !== '') list += ', ';
                    list += this.f5.conditions[i].name;
                }
                return list;
            },

            listReturn: function (list) {
                let displayText = '';
                
                console.log('listReturn '+list);
                console.log(this.$data.options[list]);
                if(this.$data.options[list].hasOwnProperty('all')) {
                    return this.$data.f5[list]['all'].name;
                }

                for(let i in this.options[list]) {
                    if(!this.options[list][i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += this.$data.f5[list][i].name; 
                }
                return displayText;
            },

            generateArmourText: function (item, max) {
                let text = item.name;
                if(item.range && item.range.low && item.range.high) {
                    text += ' ('+item.range.low+'-'+item.range.high+')';
                }
                if(item.base) {
                    text += ' ('+item.base;
                    if(item.bonus) {
                        text += '+'+item.bonus.toUpperCase();
                        if(item.max_bonus) {
                            text += ' - '+max+' '+item.max_bonus;
                        }
                    }
                    text += ')';
                }
                return text;
            }, 

            generateWarnings: function() {
                //Warning for armor that's too heavy 'str_requirement' vs STR
                if(
                    this.options.armorClass.type && 
                    this.f5.armor[this.options.armorClass.type] && 
                    this.f5.armor[this.options.armorClass.type].str_requirement && 
                    this.abilities.str < this.f5.armor[this.options.armorClass.type].str_requirement
                ) {
                    //TODO CREATE WARNING
                }
            },

            calcSkillMod: function (skill, addPlus = false) {
                let ability = this.$data.f5.skills[skill].ability;
                let abilityMod = this.getAbilityMod(ability);
                if(this.options.skills[skill]) {
                    abilityMod += this.options.proficiency;
                }
                if(addPlus) abilityMod = this.addPlus(abilityMod);
                return abilityMod;
            },

            calcAbilityMod: function (abilityScore, addPlus = false) {
                let mod = Math.floor((abilityScore-10)/2);
                if(addPlus && mod > 0) {
                    mod = this.addPlus(mod);
                }
                return mod;
            },

            getAbilityMod: function (ability, addPlus = false) {
                let score = this.options.abilities[ability];
                return this.calcAbilityMod(score, addPlus);
            },

            addPlus: function (number) {
                if(number > 0) {
                    number = '+'+number;
                }
                return number; 
            },

            getProp: function (obj, prop = 'name') {
                if(obj === undefined) {
                    return '';
                }
                if(obj[prop]) {
                    return obj[prop];
                }
                
                return obj;
            },

            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            },
        }
    });


    document.addEventListener('click', function(e) {
        if(!e.target.closest(".focusEdit")) {
            const editFields = document.querySelectorAll(".focusEdit.focused");
            editFields.forEach(function(el) { 
                el.classList.remove('focused');
            });
        }
    });

    const editFields = document.querySelectorAll(".focusEdit");
    for (const editField of editFields) {
        editField.addEventListener('click', clearEditFields);
    }

    function clearEditFields(e) {
        const editFields = document.querySelectorAll(".focusEdit.focused");
        editFields.forEach(function(el) { 
            el.classList.remove('focused');
        });
        e.target.closest(".focusEdit").classList.add('focused');
    }

    return app;

}