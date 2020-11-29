import { Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'
import { CharacterFormNavigation } from './CharacterFormNavigation';
import GavelIcon from '@material-ui/icons/Gavel';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PetsIcon from '@material-ui/icons/Pets';
import { CharacterGenerateSheet } from './CharacterGenerateSheet';


export const CharacterMiscOptionsHub = () => {
    const {goToStageOption} = useContext(CharacterContext);

    return (
        <>
            <div className="grid w-full grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-cols-2 col-gap-2 row-gap-2">
                <Button className="w-full h-64" variant="outlined" color="primary" onClick={() => goToStageOption('rp')}><NaturePeopleIcon fontSize="large"/> Personality & Backstory</Button>
                <Button className="w-full h-64" variant="outlined" color="primary" onClick={() => goToStageOption('prof')}><MenuBookIcon fontSize="large"/>Proficiencies & Skills</Button>
                <Button className="w-full h-64" variant="outlined" color="primary" onClick={() => goToStageOption('class')}><PetsIcon fontSize="large"/>Class Features & Options</Button>
                <Button className="w-full h-64" variant="outlined" color="primary" onClick={() => goToStageOption('equip')}><GavelIcon fontSize="large"/>Starting Equipment</Button>
                <CharacterGenerateSheet />
            </div>
            <CharacterFormNavigation />
        </>
    )
}
