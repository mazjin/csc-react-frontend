
import { Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'

export const Frontpage = () => {
    const {nextStage} = useContext(CharacterContext);
    return (
        <div className="flex-column">
                <div className="flex flex-col text-center items-center">
                    <p className="my-4">Welcome to CSC! This site will walk you through the steps to create your own brand-new character for DnD 5e, as well as filling our their sheet for you in a handy-dandy PDF.</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={nextStage}
                    > 
                        Get Started
                    </Button>
                </div>
        </div>
    )
}
