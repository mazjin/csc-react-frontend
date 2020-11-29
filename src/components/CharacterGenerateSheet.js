import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'
import { Paper, Button } from '@material-ui/core';

export const CharacterGenerateSheet = () => {
    const {character} = useContext(CharacterContext);

    const generateSheet = () => {
        fetch(`http://localhost:7071/api/GenerateSheet`, {
            method: 'POST',
            headers: {
                'Accept':'application/pdf, application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({character})
        }).then(async(response) => {
            // console.log(response)
            // console.log(await response.blob('application/pdf'))
            // console.log(response)
            let a = document.createElement('a')
            a.download = "character_sheet.pdf"
            a.href=window.URL.createObjectURL(await response.blob('application/pdf'))
            a.click()
            a.remove()
        })
    }

    return (
        <Paper class="flex items-center justify-center m-6 col-span-2">
            <Button
                color="primary"
                variant="contained"
                onClick={generateSheet}
            >
                Generate Sheet
            </Button>
        </Paper>
    )
}
