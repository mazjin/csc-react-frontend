import { CharacterDescriptionSummary } from './CharacterDescriptionSummary';
import { CharacterStatsSummary } from './CharacterStatsSummary';
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'
import { CharacterBasicsSummary } from './CharacterBasicsSummary';
import { CharacterProficienciesSummary } from './CharacterProficienciesSummary';
import { CharacterFeaturesSummary } from './CharacterFeaturesSummary';

export const CharacterSummary = () => {
    const {character} = useContext(CharacterContext);

    return (
        <div className="flex flex-col">
            <CharacterBasicsSummary />
            <CharacterStatsSummary  />
            <Accordion className="my-3 mx-2 px-1 py-1">
                <AccordionSummary>
                    <Typography variant="h5">Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CharacterDescriptionSummary />
                </AccordionDetails>
            </Accordion>
            <Accordion className="my-3 mx-2 px-1 py-1">
                <AccordionSummary>
                    <Typography variant="h5">Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <div className="flex flex-col">
                            <CharacterFeaturesSummary />
                        </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className="my-3 mx-2 px-1 py-1">
                <AccordionSummary>
                    <Typography variant="h5">Proficiencies</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col">
                        {character.proficiencies || character.skills ? 
                            <CharacterProficienciesSummary 
                                character={character}
                                proficienciesList={Object.values(character.proficiencies)}
                                skillsList={Object.values(character.skills)}
                            />
                            : <Typography variant="h6">Nothing here yet.</Typography>
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
            
        </div>
    )
}
