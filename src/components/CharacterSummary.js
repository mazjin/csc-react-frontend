import { CharacterDescriptionSummary } from './CharacterDescriptionSummary';
import { CharacterStatsSummary } from './CharacterStatsSummary';
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'
import { CharacterBasicsSummary } from './CharacterBasicsSummary';
import { CharacterProficienciesSummary } from './CharacterProficienciesSummary';
import { CharacterFeaturesSummary } from './CharacterFeaturesSummary';
import { CharacterSkillsSummary } from './CharacterSkillsSummary';

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
                    <div className="w-full grid xl:grid-cols-3 md:grid-cols-1 grid-cols-3">
                        <div className="col-span-1">
                            {character.proficiencies ? 
                                <CharacterSkillsSummary 
                                    character={character}
                                    skillsList={Object.values(character.skills)}
                                />
                                : <Typography variant="h6">Nothing here yet.</Typography>
                            }
                        </div>
                        <div className="xl:col-span-2 md:col-span-1 col-span-2">
                            {character.proficiencies ? 
                                <CharacterProficienciesSummary 
                                    proficienciesList={Object.values(character.proficiencies)}
                                />
                                : <Typography variant="h6">Nothing here yet.</Typography>
                            }
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            
        </div>
    )
}
