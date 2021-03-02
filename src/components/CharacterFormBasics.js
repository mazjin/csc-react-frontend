import React, { useContext, useEffect, useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CharacterContext } from '../context/CharacterState';
import { CharacterFormNavigation } from './CharacterFormNavigation';
import { CharacterFormBasicsSummary } from './CharacterFormBasicsSummary';

export const CharacterFormBasics = () => {
    const {character, updateCharacter} = useContext(CharacterContext);
    const [races, setRaces] = useState([])
    const [classes, setClasses] = useState([])

    const fetchDetails = (url) => fetch(url).then(res => res.json())
        .catch((err) => {
            console.log(err);
            return {};
        })

    const subclassLinkPhrase = {
        barbarian: ['taking the Path of the'],
        paladin: ['taking the Oath of'],
        bard: ['of the College of'],
        cleric: ['of the', 'domain'],
        druid: ['of the Circle of the'],
        monk: ['of the Way of the'],
        artificer: ['specialising as a'],
        fighter: ['specialising as a'],
        rogue: ['specialising as a'],
        ranger: ['specialising as a'],
        sorcerer:['powered by', 'origins'],
        warlock: ['bound to a'],
        wizard: ['specialising in'],
    }

    useEffect(() => {
        fetchDetails(`https://www.dnd5eapi.co/api/races`)
        // fetchDetails(`${process.env.REACT_APP_SRD_LOOKUP_API_URL_BASE}/api/races`)
        .then(res=>setRaces(res.results))
        .catch(err => console.log(err));

        fetchDetails(`https://www.dnd5eapi.co/api/classes`)
        // fetchDetails(`${process.env.REACT_APP_SRD_LOOKUP_API_URL_BASE}/api/classes`)
        .then(res=>setClasses(res.results))
        .catch(err => console.log(err));
    }, [])

    const updateNewCharacterArray = (characterArray, newValuesArrays, source, additionalSourcesToFilter=[]) => {
        characterArray = (characterArray?.filter(val => ![source,...additionalSourcesToFilter].includes(val.source)) || []);
        newValuesArrays.filter(arr => arr && arr.length)
            .forEach(arr => characterArray = [...characterArray, ...arr.map(val => ({...val, source}))])
        return characterArray;
    }

    const updateNewCharacterObject = (characterObj, newValuesObjs, source, additionalSourcesToFilter) => {
        characterObj = (characterObj ? Object.keys(characterObj).filter(key => ![source,...additionalSourcesToFilter].includes(characterObj[key].source)).reduce((obj, key) => obj={...obj, [key]: characterObj[key]}, {}) : {});
        newValuesObjs.filter(obj => obj && Object.keys(obj).length).forEach(obj => characterObj = {...characterObj, ...obj});
        return characterObj;
    }

    const handleBasicsChange = async(source, values, additionalSourcesToFilter=[]) => {
        const newCharacter = character;
        newCharacter[source] = values;
        newCharacter.languages = updateNewCharacterArray(newCharacter.languages, [values.languages], source, additionalSourcesToFilter)
        newCharacter.language_options = updateNewCharacterArray(newCharacter.language_options, [values.language_options ? [values.language_options]:[]], source, additionalSourcesToFilter)
        const newFeatures = await Promise.all([...(values.traits||[]), ...(values.features||[]), ...(values.racial_traits||[])].map(async(feature) => await fetchDetails(`https://www.dnd5eapi.co${feature.url}`).then(res => ({...feature, ...res}))))
        newCharacter.features = updateNewCharacterArray(newCharacter.features, [newFeatures],source, additionalSourcesToFilter);
        
        const newProficiencies = (values.proficiencies || values.starting_proficiencies || []).filter(prof => prof.index.substring(0,6)!=='skill-').reduce((obj, prof) => obj ={...obj, [prof.index]: {...prof, proficient: true, source:source}}, {});
        const newSkills = (values.proficiencies || values.starting_proficiencies || []).filter(prof => prof.index.substring(0,6)==='skill-').reduce((obj, prof) => obj ={...obj, [prof.index.substring(6)]: {...prof, index: prof.index.substring(6), proficient: true, source:source}}, {});
        newCharacter.proficiencies = updateNewCharacterObject(newCharacter.proficiencies, [newProficiencies], source, additionalSourcesToFilter);
        newCharacter.skills = updateNewCharacterObject(newCharacter.skills, [newSkills], source, additionalSourcesToFilter);

        
        newCharacter.proficiency_options = updateNewCharacterArray(newCharacter.proficiency_options, [values.proficiency_choices, values.starting_proficiency_options ? [values.starting_proficiency_options]:[]], source, additionalSourcesToFilter)
        newCharacter.saving_throws = updateNewCharacterObject(
            newCharacter.saving_throws, 
            [(values.saving_throws||[]).reduce((obj, save) => obj = {...obj, [save.index]: {proficient: true, source: source, name: save.name}}, {})],
            source,
            additionalSourcesToFilter
        );
        (Object.values(newCharacter.stats)).forEach((stat) => {
            if ([source,...additionalSourcesToFilter].includes(stat.source)) {
                newCharacter.stats[stat.index].bonus = 0;
                newCharacter.stats[stat.index].source = undefined;
            }
        })
        if (values.ability_bonuses){
            values.ability_bonuses.forEach(bonus => {
                newCharacter.stats[bonus.ability_score.index].bonus = bonus.bonus;
                newCharacter.stats[bonus.ability_score.index].source = source;

            })
        }

        newCharacter.ability_bonus_options = updateNewCharacterObject(newCharacter.ability_bonus_options, [values.ability_bonus_options && {...values.ability_bonus_options, source} ], source, additionalSourcesToFilter);
        newCharacter.starting_equipment = updateNewCharacterArray(newCharacter.starting_equipment, values.starting_equipment ? [values.starting_equipment]:[], source, additionalSourcesToFilter);
        newCharacter.starting_equipment_options = updateNewCharacterArray(newCharacter.starting_equipment_options, values.starting_equipment_options ? [values.starting_equipment_options]:[], source, additionalSourcesToFilter);
        newCharacter.ability_score_increases = values.ability_score_bonuses || newCharacter.ability_score_increases;
        newCharacter.hit_die = values.hit_die || newCharacter.hit_die;
        newCharacter.base_speed = values.speed || newCharacter.base_speed;
        newCharacter.size = values.size || newCharacter.size;
        newCharacter.prof_bonus = values.prof_bonus || newCharacter.prof_bonus;
        newCharacter.class_specific = values.class_specific || newCharacter.class_specific;
        
        updateCharacter('', newCharacter)
    }

    const handleClassChange = async(e) => {
        e.preventDefault();
        Promise.all([
            fetchDetails(`https://www.dnd5eapi.co/api/classes/${e.target.value.index}`),            
            fetchDetails(`https://www.dnd5eapi.co/api/classes/${e.target.value.index}/levels/${character.level}`),
            fetchDetails(`https://www.dnd5eapi.co/api/starting-equipment/${e.target.value.index}`)
        ])
        .then(res => ({...res[1], ...res[0], starting_equipment: res[2].starting_equipment, starting_equipment_options: res[2].starting_equipment_options}))
        .then(res=> handleBasicsChange('class', res, ['subclass']))
    }
    const handleSubClassChange = async(e) => {
        e.preventDefault();
        Promise.all([
            fetchDetails(`https://www.dnd5eapi.co/api/subclasses/${e.target.value.index}`),            
            fetchDetails(`https://www.dnd5eapi.co/api/subclasses/${e.target.value.index}/levels/${character.level}`)
        ])
        .then(res => ({...res[1], ...res[0]}))
        .then(res=> handleBasicsChange('subclass', res))
    }
    const handleRaceChange = async(e) => {
        e.preventDefault();
        fetchDetails(`https://www.dnd5eapi.co/api/races/${e.target.value.index}`)
        // fetchDetails(`${process.env.REACT_APP_SRD_LOOKUP_API_URL_BASE}/api/races`)
        .then(res=> handleBasicsChange('race', res, ['subrace']))
    }
    const handleSubRaceChange = async(e) => {
        e.preventDefault();
        fetchDetails(`https://www.dnd5eapi.co/api/subraces/${e.target.value.index}`)
        // fetchDetails(`${process.env.REACT_APP_SRD_LOOKUP_API_URL_BASE}/api/subraces`)
        .then(res=> handleBasicsChange('subrace', res))
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <p className="my-4">I want to play a{'aeiou'.includes(character.race?.name.toLowerCase()[0]) && 'n'}</p>
                <div className="flex flex-col">
                    <div className="flex">
                        <div className="min-w-md max-w-lg mx-3">
                            <FormControl variant="outlined">
                                <InputLabel id="selectRace-label">Race</InputLabel>
                                <Select
                                    labelId="selectRace-label"
                                    id="selectRace"
                                    value={character.race}
                                    onChange={handleRaceChange}
                                    label="Race"
                                >
                                    {races.map(race => <MenuItem key={race.index} value={race}>{race.name}</MenuItem>)}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </div>
                        {character.race?.subraces?.length >0 && <>
                            <p className="my-4">(specifically a{'aeiou'.includes(character.race?.subrace?.name.toLowerCase()[0]) && 'n'}</p>
                            <div className="min-w-md max-w-lg mx-3">
                                <FormControl variant="outlined">
                                    <InputLabel id="selectSubRace-label">Sub-race</InputLabel>
                                    <Select
                                        labelId="selectSubRace-label"
                                        id="selectSubRace"
                                        value={character.race.subrace}
                                        onChange={handleSubRaceChange}
                                        label="Sub-race"
                                    >
                                        {character.race.subraces.map(race => <MenuItem key={race.index} value={race}>{race.name}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </div>
                            <p className="my-4">)</p>
                        </>}
                    </div>
                    {/* {character.race && <CharacterRaceSummary race={character.race}/>} */}
                </div>
                <div className="flex flex-col mx-1">
                    <div className="flex">
                        <div className="min-w-md max-w-lg mx-3">
                            <FormControl variant="outlined" className="min-w-sm max-w-lg mx-3">
                                <InputLabel id="selectClass-label">Class</InputLabel>
                                <Select
                                    labelId="selectClass-label"
                                    id="selectClass"
                                    value={character.class}
                                    onChange={handleClassChange}
                                    label="Class"
                                    >
                                    {classes.map(cls => <MenuItem key={cls.index} value={cls}>{cls.name}</MenuItem>)}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </div>
                        {
                            character.class?.subclasses?.length >0 && <>
                                <p className="my-4">{subclassLinkPhrase[character.class.index][0]}</p>
                                <div className="min-w-md max-w-lg mx-3">
                                    <FormControl variant="outlined" className="min-w-sm max-w-lg mx-3">
                                        <InputLabel id="selectSubClass-label">Sub-class</InputLabel>
                                        <Select
                                            labelId="selectSubClass-label"
                                            id="selectSubClass"
                                            value={character.class.subclass}
                                            onChange={handleSubClassChange}
                                            label="Sub-class"
                                            >
                                            {character.class.subclasses.map(cls => <MenuItem key={cls.index} value={cls}>{cls.name}</MenuItem>)}
                                        </Select>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>
                                </div>
                                {subclassLinkPhrase[character.class.index][1] && <p className="my-4">{subclassLinkPhrase[character.class.index][1]}.</p>}
                            </>
                        }
                    </div>
                    {/* {character.class && <CharacterClassSummary cls={character.class}/>} */}
                </div>
            </div>
                {(character.class || character.race) && <CharacterFormBasicsSummary />}
                <CharacterFormNavigation disabledForward={(!character.class || (character.class.subclasses?.length>0 && !character.subclass) || !character.race || (character.race.subraces?.length>0 && !character.subrace))}
                    disabledReasonForward="Need to select a class and race!" />
        </div>
    )

}

