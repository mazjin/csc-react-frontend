import { Divider, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { CharacterContext } from "../context/CharacterState";

export const CharacterStatsSummary = () => {
    const {character} = useContext(CharacterContext);

    const getStatDisplay = (stat) => {
        return <Paper className="flex flex-col my-1 mx-1 py-1 px-1">
            <Typography variant="caption">{stat?.name}</Typography>
            <div className="flex flex-col mx-auto">
                <Typography variant="overline">{stat.total}</Typography>
                <Divider/>
                <Typography variant="overline">{stat.modifier >=0 ? '+' : ''}{stat.modifier}</Typography>
            </div>
        </Paper>
    }

    return <Paper className="my-3 mx-2 px-4 py-4">
                <Typography variant="h5">Stats</Typography>
                {Object.values(character.stats).every(stat => stat.raw) ? 
                    <div className="grid grid-cols-6">
                        {character.stats ? ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(key => getStatDisplay(character.stats[key])) : <Typography className="col-span-6" variant="h6">Nothing here yet.</Typography>}
                    </div>
                    : <Typography variant="h6">Nothing here yet.</Typography>
                }
            </Paper>;
}
  