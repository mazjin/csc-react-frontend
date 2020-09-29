
import { Paper, Tooltip, Chip } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { CharacterContext } from '../context/CharacterState';
import { CharacterMiscOptionsNavigation } from './CharacterMiscOptionsNavigation';
import { CharacterProficiencyOption } from './CharacterProficiencyOption';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export const CharacterMiscOptionsProficiencies = () => {
    const {character} = useContext(CharacterContext);

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

    const handleSelect = (optionKey,profKey, prof) => {
        const newProficiencyOptions = [...proficiencyOptions];
        newProficiencyOptions[optionKey].from.splice(profKey, 1, {...prof, proficient: !prof.proficient});
        setProficiencyOptions(newProficiencyOptions);
        if (prof.index.substring(0,6)==='skill-'){
            const newSkillsList = [...skillsList];
            const foundIndex = newSkillsList.findIndex(skill => skill.index === prof.index.substring(6))
            newSkillsList[foundIndex] = {...(newSkillsList[foundIndex]), proficient: !prof.proficient};
            setSkillsList(newSkillsList);
        } else {
            const newProficienciesList = [...proficienciesList];
            prof.proficient? newProficienciesList.splice(newProficienciesList.findIndex(skill => skill.index === prof.index), 1) : newProficienciesList.push({...(prof), proficient: !prof.proficient}) 
            setProficienciesList(newProficienciesList)
        }
    }

    return (
        <>
            <div className="grid grid-cols-3 col-gap-2 row-gap-2">
                    <div className="flex flex-col col-start-1">
                        <Paper className="py-3 px-3 my-2 mx-2">
                            <p>Skills:</p>
                            {
                                skillsList.map(skill =>
                                        <div className="flex w-auto">
                                            {skill.proficient ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon />}
                                            <Tooltip key={skill.index} title={skill.desc} placement="right">
                                                <p>{skill.name}: {character.stats[skill.ability_score.index].raw + (character.stats[skill.ability_score.index].bonus || 0) + (skill.proficient ? 2 : 0)}</p>
                                            </Tooltip>
                                        </div>
                                )
                            }
                        </Paper>
                        <Paper className="py-3 px-3 my-2 mx-2">
                            <p>Other proficiencies:</p>
                            <div>
                                {
                                    proficienciesList.map(prof =>
                                            <Chip
                                                key={prof.index}
                                                label={prof.name}
                                                color='primary'
                                            />
                                        )
                                }
                            </div>
                        </Paper>
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
            <CharacterMiscOptionsNavigation />
        </>
    )
}
