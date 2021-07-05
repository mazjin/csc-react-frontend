import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@material-ui/core'
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'

export const CharacterFormStatPicker = ({stats, statName, statDisplayName, handleStatChange, rolledStats, lock}) => {
    const {character} = useContext(CharacterContext);

    return (
        <div className="flex min-w-md max-w-lg mx-3">
            <FormControl variant="outlined"
                    focused={lock}>
                <FormLabel 
                    id={`${statName}Stat-label`}
                    focused={lock}
                >
                    {statDisplayName}
                </FormLabel>
                <Select
                    labelId={`${statName}Stat-label`}
                    id={`${statName}Stat`}
                    value={stats[statName]?.raw}
                    onChange={handleStatChange}
                    label={statDisplayName}
                    name={statName}
                    displayEmpty
                    disabled={lock}
                    >
                        <MenuItem key={0} value={''} name={statName}>None</MenuItem>
                        {[...(rolledStats.result||[]), ...(stats?.[statName]?.raw ? [stats?.[statName]?.raw]:[])].map((stat, index) => <MenuItem key={index} value={stat} name={statName}>{stat}</MenuItem>)}
                </Select>
                {character.stats[statName]?.bonus > 0 && stats[statName]?.raw > 0 &&
                    <>
                        <FormHelperText>Bonus: {character.stats[statName].bonus > 0 && '+'}{character.stats[statName].bonus}</FormHelperText>
                        <FormHelperText>Total: {character.stats[statName].bonus + stats[statName].raw}</FormHelperText>
                    </>    
                }
                <FormHelperText>Required</FormHelperText>
            </FormControl>
        </div>
    )
}
