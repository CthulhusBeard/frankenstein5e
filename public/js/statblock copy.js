var app;

function initVue(data) {
    
    app = new Vue({
        el: '#f5',
        data: vueData,

        computed: {
            allowAcSelector: function () {
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
                            statBonus = this.calcAbilityModifier(this.options.abilities[this.f5.armor[this.options.armorClass.type].bonus]);
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

            speedText: function() {
                console.log('---');
                let displayText = '';
                //console.log(this.f5.speeds);
                for(let i in this.options.speeds) {
                    //console.log('i: '+i);
                    if(!this.options.speeds[i]) {
                        continue;
                    }
                    if(displayText !== '') {
                        displayText += ', ';
                    }
                    //console.log('speeds: ');
                    //console.log(this.f5.speeds[i]);
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

            orderedSubtypes: function() {
                if(this.$data.f5.creaturetypes.hasOwnProperty(this.options.type) && this.$data.f5.creaturetypes[this.options.type]['subtypes']) {
                    let topSubtypes = [];
                    let otherSubtypes = [];
                    let count = 0;
                    for (let i in this.$data.f5.creaturesubtypes) {
                        console.log(i+' - '+this.$data.f5.creaturesubtypes[i]);
                        if(this.$data.f5.creaturetypes[this.options.type]['subtypes'].hasOwnProperty(i)) {
                            console.log('splice');
                            topSubtypes.splice(count, 0, this.$data.f5.creaturesubtypes[i]);
                            count++;
                        } else {
                            topSubtypes.push(this.$data.f5.creaturesubtypes[i]);
                        }
                    }

                    console.log('topSubtypes');
                    console.log(topSubtypes);

                    return topSubtypes;
                }
        
                //TODO: make this order
                return this.f5.creaturesubtypes;
            },
        },

        methods: {
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
                    //CREATE WARNING
                }
            },

            calcAbilityModifier: function (abilityScore) {
                return Math.floor((abilityScore-10)/2);
            },

            calcAbilityModWithPlus: function (abilityScore) {
                let mod = this.calcAbilityModifier(abilityScore);
                if(mod > 0) {
                    return '+'+mod;
                }
                return mod;
            },

            getProp: function (obj, prop = 'name') {
                if(obj === undefined) {
                    return '';
                }
                if(obj[prop]) {
                    return obj[prop];
                }
                
                return obj;
            }
        }
    });


}