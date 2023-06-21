import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js';
import StatBlockWizard from './statblock-wizard.js'
import StatBlockFeature from './statblock-feature.js'
import StatBlock from './statblock.js'
import EncounterGraph from './encounter-graph.js';
import * as SampleMonsters from './sample-monsters';

export function initVue(f5data) {
    Vue.config.devtools = true;

    Vue.mixin({
        methods: {
            generateArmorText: function (item, max) {
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

            addPlus: function (number, addSpace = false) {
                let space = addSpace ? ' ' : '';
                if(number > 0) {
                    number = '+'+space+number;
                } else if(number < 0) {
                    if(addSpace) {
                        number = String(number).replace('-','-'+space);
                    }
                }
                return number; 
            },

            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }, 

            calcAbilityMod: function (abilityScore) {
                let mod = Math.floor((abilityScore-10)/2);
                return mod;
            },

            createDefaultAbilityScores: function() {
                let abilities = {};
                for(let ability in this.f5.abilities) {
                    abilities[ability] = 10;
                }
                return abilities;
            },

            createDefaultSavingThrows: function() {
                let savingThrows = {};
                for(let ability in this.f5.abilities) {
                    savingThrows[ability] = false;
                }
                return savingThrows;
            },

            createDefaultSenses: function() {
                let senses = {};
                for(let sense in this.f5.senses) {
                    senses[sense] = {
                        distance: 0,
                        modifier: false,
                    };
                }
                return senses;
            },

            createDefaultLanguages: function() {
                let languages = {
                    spokenWritten: [],
                    cantSpeak: false,
                    telepathy: 0,
                };
                for(let lang in this.f5.languages) {
                    if(this.f5.languages[lang]['default']) {
                        languages.spokenWritten.push(lang);
                    }
                }
                return languages;
            },

            createDefaultSpeeds: function() {
                let speeds = {};
                for(let speed in this.f5.speeds) {
                    if(this.f5.speeds[speed]['default']) {
                        speeds[speed] = this.f5.speeds[speed]['default'];
                    } else {
                        speeds[speed] = 0;
                    }
                }
                return speeds;
            },

            createSimpleList: function(input, allowEmpty = false) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    if(input[i] || allowEmpty) {
                        if(descText) {;
                            descText += this.f5.misc.sentence_list_separator+' ';
                        }
                        descText += input[i];
                    }
                }
                return descText;
            },

            pluralize: function(str, pluralCount = 1) {
                let pluralBreak = str.indexOf('|');
                if(pluralBreak < 0) {
                    return str;
                }
                let retStr = str;
                if(pluralCount == 0 || pluralCount > 1) {
                    retStr = str.substr(pluralBreak+1);
                } else {
                    retStr = str.substr(0, pluralBreak);
                }
                return retStr;
            },

            ordinalNumber: function(num) {
                let ordinal = '';
                let lastDigit = String(num).slice(-1);

                if(lastDigit == 1 && num != 11) {
                    ordinal = this.f5.misc.ordinal_one;
                } else if(lastDigit == 2 && num != 12) {
                    ordinal = this.f5.misc.ordinal_two;
                } else if(lastDigit == 3 && num != 13) {
                    ordinal = this.f5.misc.ordinal_three;
                } else {
                    ordinal = this.f5.misc.ordinal_other;
                }

                return String(num)+ordinal;
            }, 

            numberOfTimesSemantics: function(num) {
                if(num == 1) {
                    return this.f5.misc.once;
                }
                if(num == 2) {
                    return this.f5.misc.twice;
                }
                return this.f5.misc.three_or_more_times.replace(':number_of_times', num);
            },

            numberToWord: function(num) {
                let words = [
                    this.f5.misc.zero, 
                    this.f5.misc.one, 
                    this.f5.misc.two, 
                    this.f5.misc.three,
                    this.f5.misc.four,
                    this.f5.misc.five,
                    this.f5.misc.six,
                    this.f5.misc.seven,
                    this.f5.misc.eight,
                    this.f5.misc.nine,
                    this.f5.misc.ten,
                ];

                if(words[num]) {
                    return words[num];
                }

                return num;
            },

            determineIndefiniteArticle: function(str, ordinalNum = false) {
                let vowels = ['a', 'e', 'i', 'o', 'u'];
                let vowelNumbers = [1,8,11,18]; //ignoring 80+
                if(ordinalNum) {
                    vowelNumbers = [8,11,18];
                }
                let firstChar = String(str).charAt(0).toLowerCase();
                if(
                    vowels.includes(firstChar) ||
                    vowelNumbers.includes(Number(str))
                ) {
                    return this.f5.misc.indefinite_article_an;
                } else {
                    return this.f5.misc.indefinite_article_a;
                }
            },

            damageList: function(input, damageTypes) {
                let sortArr = Object.keys(damageTypes);
                input.sort((a, b) => sortArr.indexOf(a) - sortArr.indexOf(b));
                let displayText = '';
                for(let i of input) {
                    if(damageTypes[i].long_name) {
                        if(displayText !== '') displayText += '; ';
                        displayText += damageTypes[i].long_name;
                    } else {
                        if(displayText !== '') displayText += ', ';
                        displayText += damageTypes[i].name;
                    }
                }
                return displayText;
            },

            conditionList: function(input, conditions) {
                let displayText = '';
                for(let i of input) {                    
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    displayText += conditions[i].name;
                }
                return displayText;
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

            getValueByHighestProperty: function(array, indexNum) { //getValueByHighestProperty([1: 'a', 5: 'b', 10: 'c'], 6) = 'b'
                indexNum = parseInt(indexNum);
                let returnVal, indexTracker;
                for(let i in array) {
                    if(indexNum >= parseInt(i) && (!indexTracker || parseInt(i) > indexTracker)) {
                        indexTracker = parseInt(i);
                        returnVal = array[i];
                    }
                }
                return returnVal;
            },

            createTrackingId: function() {
                return this.randChars(15);
            },

            randChars: function(len) {
                const base = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvyxyz0123456789"];
                const generator = (base, len) => {
                    return [...Array(len)]
                      .map(i => base[Math.random()*base.length|0])
                      .join('');
                };
                return generator(base, len);
            },

            getSpellSlotsByCR: function(cr) {
                if(this.f5.challengerating[cr].hasOwnProperty('spell_levels')) {
                    return this.f5.challengerating[cr]['spell_levels'];
                }
                return {
                    0: {slots: 1, spellList: ''}
                };
            },

            createDefaultSpellSlots: function(startingSlots = null) {
                let spellSlots = {};
                if(startingSlots) {
                    spellSlots = startingSlots;
                }
                for(let i = 0; i < 10; i++) {
                    if(!spellSlots.hasOwnProperty(i)) {
                        spellSlots[i] = {slots: 0, spellList: ''};
                    } else {
                        if(spellSlots[i].slots > 0 && spellSlots[i].spellList === '') {
                            spellSlots[i].spellList = '[Insert Spell List]';
                        }
                    }
                } 
                return spellSlots;
            },

            intersectObjectsRecursive: function(input, diffAgainst) {
                // console.log('===intersectObjectsRecursive===');
                // console.log(this.clone(input));
                // console.log(this.clone(diffAgainst));

                if(Array.isArray(input)) {
                    //console.log('array----------');
                    //for arrays
                    let dataIntersection = [];
                    if(input.length === diffAgainst.length) {
                        for(let i in input) {
                            let diff = this.intersectObjectsRecursive(input[i], diffAgainst[i]);
                            if(diff !== null) {
                                dataIntersection[i] = diff;
                            }
                        }
                    } else {
                        dataIntersection = input.filter(val => !diffAgainst.includes(val));
                    }

                    //console.log(dataIntersection);

                    if(dataIntersection.length) {
                        return dataIntersection;
                    }

                } else if(typeof input === 'object') {
                    //for objects
                    let dataIntersection = {};
                    for(let i in input) {
                        if(diffAgainst.hasOwnProperty(i)) {
                            let diff = this.intersectObjectsRecursive(input[i], diffAgainst[i]);
                            if(diff !== null) {
                                // console.log('--obj key '+i+' --');
                                dataIntersection[i] = diff;
                            }
                        }
                    }
                    if(Object.keys(dataIntersection).length) {
                        return dataIntersection;
                    }
                    
                } else if(input != diffAgainst) {
                    //other
                    return input;
                } 
                return null;
            },

            clone: function(obj) {
                return JSON.parse(JSON.stringify(obj));
            },
    
        }
    });
    
    let app = new Vue({
        el: '#f5',
        data: {
            editor: {
                activeSection: 'statblock-display',
                showCreateMenu: false, 
                editMode: true,
                usingWizard: false,
                playerData: {
                    number: 4,
                    level: 1,
                },
                measure: {
                    measureUnit: 'ft.',
                    measureIncrement: 5,
                    measureUnitUp: 5280,
                    measureUnitUpName: 'miles',
                },
                roundTracker: 7,
            },
            encounterXP: 0,
            encounterDifficulty: f5data.encounterdifficulties['easy'],
            sampleMonsters: SampleMonsters.monsters,
            statblocks: [],
            projections: [],
            f5: f5data,
        },

        components: {
            'Multiselect': Multiselect,
            'Statblockwizard': StatBlockWizard,
            'Statblock': StatBlock,
            'StatblockFeature': StatBlockFeature,
            'Encountergraph': EncounterGraph, //TODO: Find out why "Encountergraph" works and "EncounterGraph" doesnt
        },

        mounted() {
            //this.createStatBlock();
            console.log('this.sampleMonsters');
            console.log(this.clone(this.sampleMonsters));
        },

        computed: {
            sortedCRList: function () {
                let crArray = [];
                for(let i in this.f5.challengerating) {
                    crArray.push(this.f5.challengerating[i]);
                }
                return crArray.sort(function(a, b) {
                    return a.cr - b.cr;
                });
            },
        },

        methods: {

            createSentenceList: function(input, inclusive = true, modifierFunction = null) {
                let len = input.length;
                if(isNaN(len)) {
                    if(!isNaN(Object.keys(input).length)) {
                        len = Object.keys(input).length;
                    }
                }
                let descText = '';
                for(let i in input) {
                    //TODO this might need to change in other languages
                    if(descText) {
                        if(len > 2) {
                            descText += this.f5.misc.sentence_list_separator+' ';
                        }
                        if(i == len-1) {
                            if(inclusive) {
                                descText += ' '+this.f5.misc.and+' ';
                            } else {
                                descText += ' '+this.f5.misc.or+' ';
                            }
                        }
                    }
                    if(modifierFunction != null && typeof modifierFunction === 'function') {
                        descText += modifierFunction(input[i]);
                    } else {
                        descText += input[i];
                    }
                }
                return descText;
            },

            getEncounterXP: function() {
                let xpTotal = 0;
                let totalNumOfMonsters = 0;
                for(let i in this.statblocks) {
                    let numOfMonsters = (this.statblocks[i].number) ? this.statblocks[i].number : 1;
                    xpTotal += this.statblocks[i].xp * numOfMonsters;
                    totalNumOfMonsters += numOfMonsters;
                }

                let xpMultipliers = { //DMG pg 82
                    1: 1,
                    2: 1.5,
                    3: 2,
                    7: 2.5,
                    11: 3,
                    15: 4,
                };
                let xpMultiplier = this.getValueByHighestProperty(xpMultipliers, totalNumOfMonsters);

                return xpTotal * xpMultiplier;
            },

            getEncounterDifficulty: function() {
                let difficulty = 'easy';
                let xpPerPlayer = this.encounterXP / this.editor.playerData.number;
                let thresholds = this.f5.playerlevels[this.editor.playerData.level]['xp_thresholds'];
                let difficultyLevels = ['medium', 'hard', 'deadly'];
                for(let diffKey of difficultyLevels) {
                    if(xpPerPlayer >= thresholds[diffKey]) {
                        difficulty = diffKey;
                    }
                }

                return this.f5.encounterdifficulties[difficulty];
            },

            importMonster: function(monster) {
                console.log('== import monster ==');
                let importedStatBlock = this.clone(monster);
                importedStatBlock.trackingId = this.randChars(15);
                importedStatBlock.number = 1;
                console.log(this.clone(importedStatBlock));
                this.statblocks.push(importedStatBlock);
            },

            importMonsterFromClipboard: async function() {
                let monster = await navigator.clipboard.readText();

                try {
                    let parsed = JSON.parse(monster);

                    //TODO: Add better import validation
                    this.importMonster(parsed);

                } catch(e) {
                    alert('Your clipboard does not contain a valid Frankenstein 5E monster.'); // error in the above string (in this case, yes)!
                }

            },

            createStatBlock: function() {
                this.closeCreateMenu();
                let i = this.statblocks.push({
                    trackingId: this.createTrackingId(), 
                    number: 1,
                });
                return i-1;
            },

            removeStatBlock: function(id) {
                for(let i in this.statblocks) {
                    if(this.statblocks[i].trackingId === id) {
                        this.statblocks.splice(i, 1);
                    }
                }
            },

            clearAllData: function() {
                if(confirm("Are you sure you want to clear all your encounter data?")) {
                    this.statblocks = [];
                    //this.createStatBlock();
                }
            },

            updateMonsterName: function(id, name) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.name = name;
                    }
                }
            },

            updateMonsterHP: function(id, hp) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.hp = hp;
                    }
                }
            },

            updateMonsterAC: function(id, ac) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.ac = ac;
                    }
                }
            },

            updateMonsterCR: function(id, cr, xp, lairCr = null, lairXp = null) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.cr = cr;
                        statblock.xp = xp;
                        if(lairCr && lairXp) {
                            statblock.lairCr = lairCr;
                            statblock.lairXp = lairXp;
                        }
                    }
                }
                
                this.encounterXP = this.getEncounterXP();
                this.encounterDifficulty = this.getEncounterDifficulty();
            },

            updateMonsterProjections: function(id, projections, mythicRecovery) {
                for(let statblock of this.statblocks) {
                    if(statblock.trackingId == id) {
                        statblock.projections = projections;
                        statblock.mythicRecovery = mythicRecovery;
                    }
                }
            },

            changeActiveDisplay: function(activeDisplayName) {
                this.editor.activeSection = activeDisplayName;
                if(activeDisplayName == 'encounter-display') {
                    this.$refs['encounterGraph'].updateGraph();
                }
            },

            initStatBlockWizard: function () {
                this.closeCreateMenu();
                this.editor.usingWizard = true;
            },

            closeWizard: function() {
                this.editor.usingWizard = false;
            },

            closeCreateMenu: function() {
                this.editor.showCreateMenu = false;
            },

            createStatBlockFromWizardData: function(monsterData) {
                console.log('createStatBlockFromWizardData');
                console.log(monsterData);

                this.importMonster(monsterData);
                this.closeWizard();
            },
        },
    });

    return app;

}