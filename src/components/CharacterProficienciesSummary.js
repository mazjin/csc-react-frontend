import React from 'react'
import { Paper, Chip } from '@material-ui/core';

export const CharacterProficienciesSummary = ({proficienciesList}) => {
    return (
        <>
            {proficienciesList && proficienciesList.length > 0 && <Paper className="py-3 px-3 my-2 mx-2">
                <p>Other proficiencies:</p>
                <div>
                    {
                        proficienciesList.map(prof =>
                                <Chip
                                    key={prof.index}
                                    label={prof.name}
                                    color='primary'
                                />
                            )
                    }
                </div>
            </Paper>}
        </>
    )
}
