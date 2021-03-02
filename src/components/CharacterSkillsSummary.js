import { Paper, Tooltip } from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React from 'react'

export const CharacterSkillsSummary = ({character, skillsList}) => {
    return (
        <>
            {skillsList && skillsList.length > 0 && <Paper className="py-3 px-3 my-2 mx-2">
                <p>Skills:</p>
                {
                    skillsList.map(skill =>
                            <div className="flex w-auto">
                                {skill.proficient ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon />}
                                <Tooltip key={skill.index} title={skill.desc} placement="right">
                                    <p>{skill.name}: {skill.ability_score ? (character.stats[skill.ability_score.index].raw + (character.stats[skill.ability_score.index].bonus || 0) + (skill.proficient ? 2 : 0)) : "-"}</p>
                                </Tooltip>
                            </div>
                    )
                }
            </Paper>}
        </>
    )
}
