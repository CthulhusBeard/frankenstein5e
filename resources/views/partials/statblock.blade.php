<div class="stat-block-container">
    <div class="stat-block">
        <div class="stat-block__column">
            <div class="stat-block__title">@{{options.name}}</div>
            <div class="stat-block__size-alignment">@{{descriptionText}}</div>
            <div class="stat-block__line-break"></div>
            <div class="stat-block__attributes">
                <div class="stat-block__attribute"><span>@{{f5.misc.title_armor_class}}:</span>&nbsp;@{{acText}}</div>
                <div class="stat-block__attribute"><span>@{{f5.misc.title_hit_points}}:</span>&nbsp;@{{hitPointsText}}</div>
                <div class="stat-block__attribute"><span>@{{f5.misc.title_speed}}:</span>&nbsp;@{{speedText}}</div>
            </div>
            <div class="stat-block__line-break"></div>
            <div class="stat-block__ability-scores">
                <div class="stat-block__ability" v-for="(item, index) in f5.abilities">
                    <div class="stat-block__ability-name">@{{index.toUpperCase()}}</div>
                    <div class="stat-block__ability-score">@{{options.abilities[index]}} (@{{calcAbilityMod(options.abilities[index], true)}})</div>
                </div>
            </div>
            <div class="stat-block__line-break"></div>
            <div class="stat-block__attributes">
                <div v-if="savingThrowText" class="stat-block__attribute"><span>@{{f5.misc.title_saving_throws}}:</span>&nbsp;@{{savingThrowText}}</div>
                <div v-if="skillText" class="stat-block__attribute"><span>@{{f5.misc.title_skills}}:</span>&nbsp;@{{skillText}}</div>
                <div v-if="damageResistanceText" class="stat-block__attribute"><span>@{{f5.misc.title_damage_resistances}}:</span>&nbsp;@{{damageResistanceText}}</div>
                <div v-if="damageImmunitiesText" class="stat-block__attribute"><span>@{{f5.misc.title_damage_immunities}}:</span>&nbsp;@{{damageImmunitiesText}}</div>
                <div v-if="damageVulnerabilitiesText" class="stat-block__attribute"><span>@{{f5.misc.title_damage_vulnerabilities}}:</span>&nbsp;@{{damageVulnerabilitiesText}}</div>
                <div v-if="conditionImmunitiesText" class="stat-block__attribute"><span>@{{f5.misc.title_condition_immunities}}:</span>&nbsp;@{{conditionImmunitiesText}}</div>
                <div v-if="sensesText" class="stat-block__attribute"><span>@{{f5.misc.title_senses}}:</span>&nbsp;@{{sensesText}}</div>
                <div class="stat-block__attribute"><span>@{{f5.misc.title_languages}}:</span>&nbsp;@{{languageText}}</div>
                <div class="stat-block__attribute"><span>@{{f5.misc.title_challenge_rating}}:</span>&nbsp;@{{crText}}</div>
                <div class="stat-block__attribute"><span>@{{f5.misc.title_proficiency}}:</span>&nbsp;@{{proficiencyText}}</div>
            </div>
            <div class="stat-block__line-break"></div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
            <div class="stat-block__subtitle"><span>A</span>ctions</div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
        </div>
        
        <div class="stat-block__column">
            <div class="stat-block__subtitle"><span>L</span>egendary <span>A</span>ctions</div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
            <div class="stat-block__feature"><span>Innate Spellcasting (Psionics).</span> The dragon’s innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components:</div>
        </div>
    </div>
</div>
