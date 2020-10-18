import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'

export const CharacterFeaturesSummary = () => {
    const {character} = useContext(CharacterContext);

    return (
        <>
            {character.features && character.features.filter(val => val).length > 0 ? 
                character.features.map(feature => <>
                    <Accordion>
                        <AccordionSummary>
                            <Typography variant="h6">{feature.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="flex flex-col">
                            <Typography variant="overline">{character[feature.source].name || feature.source}</Typography>
                            {feature.desc.map(descSection =>
                                <p>{descSection}</p>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </>)
                : <Typography variant="h6">Nothing here yet.</Typography>
            }
        </>
    )
}
