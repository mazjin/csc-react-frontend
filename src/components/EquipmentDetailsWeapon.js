import React, { useContext } from 'react';
// import { CharacterContext } from '../context/CharacterState';

export const EquipmentDetailsWeapon = ({item}) => {
    // const {character} = useContext(CharacterContext);
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-between">
                <div>
                    Damage: {item.damage.damage_dice}{item.two_handed_damage && " (" + item.two_handed_damage + "2-handed"} {item.damage.damage_type.name}
                </div>
                <div>
                    Range: {(item.weapon_range === "Ranged" && item.range.normal + "ft normal, " + item.range.long + "ft disadvantage") || "Melee"}
                </div>
                <div>
                    {item.properties && item.properties.map(x => x.name).join(", ")}
                </div>
            </div>
        </div>
    )
}