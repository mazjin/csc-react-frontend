import React, { useContext } from 'react';
import { CharacterContext } from '../context/CharacterState';

export const EquipmentDetailsArmor = ({item}) => {
    const {character} = useContext(CharacterContext);
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div>
                    Armor Class (AC): {item.armor_class.base}{item.armor_class.dex_bonus && "+ Dex (" + (character.stats.dex.modifier)+")"}
                </div>
                <div>
                    Min Strength: {item.str_minimum || 'No'}
                </div>
                <div>
                    Stealth Disadvantage: {item.stealth_disadvantage}
                </div>
            </div>
        </div>
    )
}