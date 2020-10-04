import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { CharacterContext } from "../context/CharacterState";
import { SummaryProperty } from "./SummaryProperty";

export function CharacterDescriptionSummary() {
    const {character} = useContext(CharacterContext);

  return <>
        {character.description && Object.values(character.description).filter(val => val).length > 0 ? <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-6 w-full">
            {character.description.age && <SummaryProperty innerText={character.description.age} variant="h6" captionText="Age" />}
            {character.description.height && <SummaryProperty innerText={character.description.height} variant="h6" captionText="Height" />}
            {character.description.weight && <SummaryProperty innerText={character.description.weight} variant="h6" captionText="Weight" />}
            {character.description.eyes && <SummaryProperty innerText={character.description.eyes} variant="h6" captionText="Eyes" />}
            {character.description.skin && <SummaryProperty innerText={character.description.skin} variant="h6" captionText="Skin" />}
            {character.description.hair && <SummaryProperty innerText={character.description.hair} variant="h6" captionText="Hair" />}
        </div> : <Typography variant="h6">Nothing here yet.</Typography>}
    </>;
}
  