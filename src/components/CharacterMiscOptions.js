import React, { useContext } from 'react'
import { CharacterContext } from '../context/CharacterState'
import { CharacterMiscOptionsClass } from './CharacterMiscOptionsClass'
import { CharacterMiscOptionsEquipment } from './CharacterMiscOptionsEquipment'
import { CharacterMiscOptionsHub } from './CharacterMiscOptionsHub'
import { CharacterMiscOptionsProficiencies } from './CharacterMiscOptionsProficiencies'
import { CharacterMiscOptionsRP } from './CharacterMiscOptionsRP'

export const CharacterMiscOptions = () => {
    const {stageOption} = useContext(CharacterContext);

    const parseStep = (option) => {
        switch(option) {
          case 'rp':
            return <CharacterMiscOptionsRP />
          case 'prof':
            return <CharacterMiscOptionsProficiencies />
          case 'class':
            return <CharacterMiscOptionsClass />
          case 'equip': 
            return <CharacterMiscOptionsEquipment />
          default:
            return <CharacterMiscOptionsHub />
        }
      }
    return (
        <>
            {parseStep(stageOption)}
        </>
    )
}
