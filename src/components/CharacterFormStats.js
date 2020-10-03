import { CharacterFormNavigation } from './CharacterFormNavigation';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { RaisedButton } from 'material-ui'
import React, { useContext, useState } from 'react'
import { CharacterContext } from '../context/CharacterState'
import { CharacterFormStatPicker } from './CharacterFormStatPicker'

export const CharacterFormStats = () => {

    const {character,updateCharacter} = useContext(CharacterContext);
    const [stats, setStats] = useState(character.stats)

    const rollDefinitions = {
        standard: {
            roll: '4d6L1',
            number_rolls:6
        },
        enhanced: {
            roll: '4d6L1',
            number_rolls:7,
            drop_rule:'L',
            number_drops:1
        },
        oldschool: {
            roll:'3d6',
            number_rolls:6
        },
        gambler: {
            roll:'d20',
            number_rolls:6
        },
        colville: {
            roll: '4d6L1',
            number_rolls:6,
        },
        custom: {}
    }

    const [rollDefinition, setRollDefinition] = useState('')
    const [rolledStats, setRolledStats] = useState({})
    const [usedStats] = useState({})

    const handleRollChange = (e) => {
        setRolledStats({})
        setRollDefinition(e.target.value);
    }

    const handleStatChange = e => {
        e.preventDefault();
        if (usedStats[e.target.name]) {
            rolledStats.result.push(usedStats[e.target.name]);
        }
        if (e.target.value){
            rolledStats.result.splice(rolledStats.result.indexOf(e.target.value),1)
        }
        usedStats[e.target.name] = e.target.value;
        setStats({...stats, [e.target.name]: {...stats[e.target.name], raw:e.target.value}})
    }

    const rollStats = () => {
        if (rollDefinition === 'array') {
            setRolledStats({
                result: [15,14,13,12,10,8]
            })
            setStats(character.stats);
            return;
        }
        const rollObject = rollDefinitions[rollDefinition];
        fetch(`http://localhost:7071/api/RollDice`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rollObject)
        })
        .then(res => res.json())
        .then(res => {
            const stats = {...character.stats}
            if (rollDefinition === 'colville') {
                const statNames = ['str','dex','con','int','wis','cha']
                res.result.forEach((stat, index) => {
                    stats[statNames[index]].raw = stat;
                });
            }
            setRolledStats(res)
            setStats(stats)
        })
    }

    const onNext = () => {
        updateCharacter('stats', stats)
    }


    return (
        <div className="flex flex-col items-center min-h-screen">
            <FormControl >
                <FormLabel>How do you want to roll?</FormLabel>
                <RadioGroup aria-label="rollDefinition" name="rollDefinition" value={rollDefinition} onChange={handleRollChange}>
                    <FormControlLabel value="standard" control={<Radio />} label="Standard (4d6 drop lowest x6)"/>
                    <FormControlLabel value="enhanced" control={<Radio />} label="Enhanced (4d6 drop lowest x7, drop lowest)"/>
                    <FormControlLabel value="array" control={<Radio />} label="Standard Array (fixed values, no roll)"/>
                    <FormControlLabel value="oldschool" control={<Radio />} label="Old-school (3d6 x6)"/>
                    <FormControlLabel value="gambler" control={<Radio />} label="Gambler (d20 x6, riskier)"/>
                    <FormControlLabel value="colville" control={<Radio />} label="Colville (4d6 drop lowest x6, no choice in allocation)"/>
                    <FormControlLabel value="custom" control={<Radio />} label="Custom roll (enter your own)"/>
                </RadioGroup>
                {rollDefinition === 'custom' && 
                    <>
                        <TextField id="custom-rollDefinition" label="Dice roll definition" placeholder="e.g. 4d6L1" value={rollDefinitions.roll} variant="outlined"/>
                        <TextField id="custom-numOfRolls" label="Number of times to roll" placeholder="e.g. 6" value={rollDefinitions.number_rolls} variant="outlined"/>
                        <TextField id="custom-dropRule" label="Drop the Lowest or Highest?" placeholder="L for lowest, H for highest" value={rollDefinitions.drop_rule} variant="outlined"/>
                        <TextField id="custom-numOfDrops" label="Number of dice to drop" placeholder="e.g. 1" value={rollDefinitions.number_drops} variant="outlined"/>
                    </>
                }
            </FormControl>
            <br/>
            <RaisedButton
                    label={rolledStats?.results?.length>0 ? 'Re-roll': 'Roll'}
                    primary={true}
                    onClick={rollStats}
                />
            <br/>
            {(rolledStats.result?.length > 0 || (stats && Object.keys(stats).some(stat => stats[stat]?.raw))) &&
                <div className="flex">
                    <CharacterFormStatPicker
                        stats={stats}
                        statName="str"
                        statDisplayName="Strength"
                        handleStatChange={handleStatChange}
                        rolledStats={rolledStats}
                        lock={rollDefinition==='colville'}
                    />
                    <CharacterFormStatPicker
                        stats={stats}
                        statName="dex"
                        statDisplayName="Dexterity"
                        handleStatChange={handleStatChange}
                        rolledStats={rolledStats}
                        lock={rollDefinition==='colville'}
                    />
                    <CharacterFormStatPicker
                        stats={stats}
                        statName="con"
                        statDisplayName="Constitution"
                        handleStatChange={handleStatChange}
                        rolledStats={rolledStats}
                        lock={rollDefinition==='colville'}
                    />
                    <CharacterFormStatPicker
                        stats={stats}
                        statName="int"
                        statDisplayName="Intelligence"
                        handleStatChange={handleStatChange}
                        rolledStats={rolledStats}
                        lock={rollDefinition==='colville'}
                    />
                    <CharacterFormStatPicker
                        stats={stats}
                        statName="wis"
                        statDisplayName="Wisdom"
                        handleStatChange={handleStatChange}
                        rolledStats={rolledStats}
                        lock={rollDefinition==='colville'}
                    />
                    <CharacterFormStatPicker
                        stats={stats}
                        statName="cha"
                        statDisplayName="Charisma"
                        handleStatChange={handleStatChange}
                        rolledStats={rolledStats}
                        lock={rollDefinition==='colville'}
                    />
                </div>
            }
            <CharacterFormNavigation onNext={onNext} disabledForward={Object.keys(stats).every(key => !stats[key].raw)} disabledReasonForward="Need to allocate all stats!" />
        </div>
    )
}
