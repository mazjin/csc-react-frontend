import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Paper, Tooltip, Chip } from '@material-ui/core';

export const CharacterProficienciesSummary = ({character, skillsList, proficienciesList}) => {
    return (
        <>
            {skillsList && skillsList.length > 0 && <Paper className="py-3 px-3 my-2 mx-2">
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
            </Paper>}
            {proficienciesList && proficienciesList.length > 0 && <Paper className="py-3 px-3 my-2 mx-2">
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
            </Paper>}
        </>
    )
}
