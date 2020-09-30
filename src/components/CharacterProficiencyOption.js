import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';

export const CharacterProficiencyOption = ({option, optionKey, handleSelect}) => {
    const numSelected = option.from.filter(prof => prof.proficient).length;
    // return <div className="col-start-2">
        return <Accordion key={optionKey} className="w-full">
            <div className={`${numSelected === +option.choose ? 'bg-green-600 text-white':''}${numSelected > +option.choose ? 'bg-red-700 text-white':''}`}>
                <AccordionSummary
                    classes={{content:'justify-between leading-9'}}
                    expandIcon={<ExpandMoreIcon className={`${numSelected >= +option.choose ? 'text-white':''}}`}/>}
                >
                <p>Choose {option.choose} from:</p>
                {numSelected === +option.choose ? <DoneIcon className="text-white" fontSize="large" /> : numSelected > +option.choose && <ClearIcon className="text-white" fontSize="large" />}
                </AccordionSummary>
            </div>
            <AccordionDetails>
                <Paper component="ul" className="py-1 px-1">
                    {option.from.map((prof,profKey) =>
                                <Chip
                                    key={profKey}
                                    label={prof.name}
                                    clickable
                                    onDelete={prof.proficient ? ()=>{} : undefined}
                                    deleteIcon={<DoneIcon />}
                                    color="primary"
                                    variant={prof.proficient ? undefined:'outlined'}
                                    onClick={() => handleSelect(optionKey, option, profKey, prof)}
                                />
                    )}
                </Paper>
            </AccordionDetails>
        </Accordion>
    // </div>
}
