import { SummaryProperty } from './SummaryProperty';
import { Paper } from '@material-ui/core';
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'

export const CharacterBasicsSummary = () => {

    const {character} = useContext(CharacterContext);

    return (
        <>
            <Paper className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-6 my-3 mx-2 px-1 py-1">
                <SummaryProperty innerText={character.name||'The Nameless Wonder'} variant='h5' captionText='Character Name' width="3" />
                {character.level && <SummaryProperty innerText={character.level} variant='h5' captionText='Level' />}
                <SummaryProperty innerText={character.class?.name} variant='h6' captionText='Class' />
                <SummaryProperty innerText={character.race?.name} variant='h6' captionText='Race' />
                <div className="col-span-3"/>
                {character.alignment ? 
                    <SummaryProperty innerText={character.alignment} variant='h5' captionText='Alignment' width="1" />
                    : <div className="col-span-1"/>
                }
                {character.class?.subclasses.length > 0 && <SummaryProperty innerText={character.subclass?.name} variant='h6' captionText='Subclass' />}
                {character.race?.subraces.length > 0 && <SummaryProperty innerText={character.subrace?.name} variant='h6' captionText='Subrace' />}
            </Paper>
        </>
    )
}
