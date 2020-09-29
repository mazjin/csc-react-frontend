import { CharacterAlignmentPicker } from './CharacterAlignmentPicker';
import React, { useContext, useState } from 'react'
import { TextField } from '@material-ui/core';
import { CharacterContext } from '../context/CharacterState';
import { CharacterMiscOptionsNavigation } from './CharacterMiscOptionsNavigation';

export const CharacterMiscOptionsRP = () => {
    const {character, updateCharacter} = useContext(CharacterContext);
    const [alignment, setAlignment] = useState(character.alignment || '');
    const [name, setName] = useState(character.name || '')
    const [description, setDescription] = useState(character.description || {});

    const handleAlignmentChange = (value) => {
        value === alignment ? setAlignment('') : setAlignment(value); 
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        const newDescription = {
            ...description,
            [e.target.name]: e.target.value
        }
        setDescription(newDescription);
    }

    const onConfirm = () => {
        updateCharacter('name', name);
        updateCharacter('alignment', alignment)
        updateCharacter('description', description)
    }

    return (
        <>
            <div className="grid md:grid-cols-8 grid-cols-4 col-gap-2 row-gap-2">
                <TextField className="my-2 col-start-1 col-end-5" label="Character's Name" value={name} onChange={handleNameChange} placeholder="e.g. Dilbo Daggins"/>
                <CharacterAlignmentPicker handleAlignmentChange={handleAlignmentChange} alignment={alignment}  />
                <TextField className="my-2 col-start-1 col-end-3" label="Gender" name="gender" value={description.gender} onChange={handleDescriptionChange} placeholder="e.g. Male"/>
                <TextField className="my-2 col-start-3 col-end-5" label="Age" name="age" value={description.age} onChange={handleDescriptionChange} placeholder="e.g. 50 years"/>
                <TextField className="my-2 col-start-1 col-end-3" label="Height" name="height" value={description.height} onChange={handleDescriptionChange} placeholder={`e.g. 3'1"`}/>
                <TextField className="my-2 col-start-3 col-end-5" label="Weight" name="weight" value={description.weight} onChange={handleDescriptionChange} placeholder="e.g. 39 lbs"/>
                <TextField className="my-2 col-start-1 col-end-3" label="Eyes" name="eyes" value={description.eyes} onChange={handleDescriptionChange} placeholder="e.g. Brown"/>
                <TextField className="my-2 col-start-3 col-end-5" label="Skin" name="skin" value={description.skin} onChange={handleDescriptionChange} placeholder="e.g. Ruddy tan"/>
                <TextField className="my-2 md:col-start-5 md:col-end-7 col-start-1 col-end-3" label="Hair" name="hair" value={description.hair} onChange={handleDescriptionChange} placeholder="e.g. Brown, curly"/>
            </div>
            <CharacterMiscOptionsNavigation onConfirm={onConfirm}/>
        </>
    )
}
