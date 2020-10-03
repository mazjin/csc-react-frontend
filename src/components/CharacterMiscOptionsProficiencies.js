import React, { useContext, useEffect, useState } from 'react'
import { CharacterContext } from '../context/CharacterState';
import { CharacterMiscOptionsNavigation } from './CharacterMiscOptionsNavigation';
import { CharacterProficienciesSummary } from './CharacterProficienciesSummary';
import { CharacterProficiencyOption } from './CharacterProficiencyOption';
import { CharacterSkillsSummary } from './CharacterSkillsSummary';

export const CharacterMiscOptionsProficiencies = () => {
    const {character, updateCharacter} = useContext(CharacterContext);

    const [proficiencyOptions, setProficiencyOptions] = useState(character.proficiency_options);
    const [skillsList, setSkillsList] = useState([]);
    const [proficienciesList, setProficienciesList] = useState(Object.values(character.proficiencies));
    
    useEffect(() => {
        async function populateSkillsList() {
            let newSkillsList = await fetch(`https://www.dnd5eapi.co/api/skills`).then(res => res.json());
            newSkillsList = await Promise.all(newSkillsList.results.map(async(skill) => await fetch(`https://www.dnd5eapi.co${skill.url}`).then(res => res.json()).then(res => ({...res, proficient: character.skills[res.index] && character.skills[res.index].proficient}))))
            setSkillsList(newSkillsList);
        }
        populateSkillsList();
    }, [])

    const handleSelect = (optionKey, option, profKey, prof) => {
        const newProficiencyOptions = [...proficiencyOptions];
        newProficiencyOptions[optionKey].from.splice(profKey, 1, {...prof, proficient: !prof.proficient});
        setProficiencyOptions(newProficiencyOptions);
        if (prof.index.substring(0,6)==='skill-'){
            const newSkillsList = [...skillsList];
            const foundIndex = newSkillsList.findIndex(skill => skill.index === prof.index.substring(6))
            newSkillsList[foundIndex] = {...(newSkillsList[foundIndex]), proficient: !prof.proficient, source: option.source};
            setSkillsList(newSkillsList);
        } else {
            const newProficienciesList = [...proficienciesList];
            prof.proficient? newProficienciesList.splice(newProficienciesList.findIndex(skill => skill.index === prof.index), 1) : newProficienciesList.push({...(prof), proficient: !prof.proficient, source: option.source}) 
            setProficienciesList(newProficienciesList)
        }
    }

    const onConfirm = async () => {
        const newSkills = skillsList.reduce((obj, skill) => obj = {...obj, [skill.index]: skill}, {})
        updateCharacter('skills', newSkills);
        const newProficiencies = await Promise.all(proficienciesList.map(async(prof) => await fetch(`https://www.dnd5eapi.co${prof.url}`).then(res => res.json()).then(res => ({...prof, ...res}))));
        updateCharacter('proficiencies', newProficiencies);
    }

    return (
        <>
            <div className="grid grid-cols-3 col-gap-2 row-gap-2">
                    <div className="flex flex-col col-start-1">
                        <CharacterSkillsSummary
                            character={character}
                            skillsList={skillsList}
                        />
                        <CharacterProficienciesSummary
                            proficienciesList={proficienciesList}
                        />
                    </div>
                    <div className="flex flex-col col-start-2 col-end-4">
                        {proficiencyOptions && proficiencyOptions.map((option, optionKey) => 
                            <CharacterProficiencyOption
                                key={optionKey}
                                option={option}
                                optionKey={optionKey}
                                handleSelect={handleSelect}
                            />
                        )}
                    </div>
                </div>
            <CharacterMiscOptionsNavigation onConfirm={onConfirm}/>
        </>
    )
}
