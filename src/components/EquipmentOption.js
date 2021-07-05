import React from 'react'
import { Accordion, List, ListItem, AccordionSummary, AccordionDetails, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EquipmentDetails } from './EquipmentDetails';

export const EquipmentOption = ({name = "", choice, choiceKey, handleSelect}) => {

    return (
        <Accordion className="w-full">
            {/* TODO: sort out data structure so options passed as objects, need to set variables on them */}
            {/* <div className={`${choice.filter(x => x.selected).length === requiredSelections ? 'bg-green-600 text-white':''}${choice.filter(x => x.selected).length > requiredSelections ? 'bg-red-700 text-white':''}`}> */}
                <AccordionSummary
                    classes={{content:'justify-between leading-9'}}
                    expandIcon={<ExpandMoreIcon className={`${ choice.filter(x=>x.selected).length >= (+choice.choose ?? 1)  ? 'text-white':''}}`}
                    />}
                >
                    {name  && 
                        <Typography variant ="h5">{name}</Typography>
                    }
                </AccordionSummary>
            {/* </div> */}
            <AccordionDetails>
                <Paper component="ul" className="py-1 px-1 w-full">
                    {choice.map((opt, optionKey) =>
                    <List 
                    >
                        <ListItem 
                            button
                            selected={choice.selected}
                            key={"choice-" + choiceKey + "-option-" + opt.index}
                        >
                            <EquipmentDetails item={opt} 
                                optionKey={optionKey} 
                                choiceKey={choiceKey} 
                                quantity={opt.quantity} 
                                handleSelect={opt.equipment ? () => {} : handleSelect}/>
                        </ListItem>
                    </List>
                    )}
                </Paper>
            </AccordionDetails>
        </Accordion>
    )
}
