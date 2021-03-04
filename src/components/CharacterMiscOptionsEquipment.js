import { List } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { CharacterContext } from '../context/CharacterState';
import { RepositoryContext } from '../context/RepositoryState';
import { EquipmentDetails } from './EquipmentDetails';

export const CharacterMiscOptionsEquipment = () => {
    const {character} = useContext(CharacterContext);
    const { getData } = useContext(RepositoryContext);
    const [equipment, setEquipment] = useState(character.starting_equipment);
    const [equipmentOptions, setEquipmentOptions] = useState(character.starting_equipment_options);
    
    useEffect(() => {
        async function fetchEquipmentDetail(equipmentEntry) {
            let detail = equipmentEntry.equipment || equipmentEntry.item || (equipmentEntry.equipment_option && equipmentEntry.equipment_option.from.equipment_category) || equipmentEntry;
            if (detail.populated) { return; }
            return getData(detail.url)
                .then(res => {
                    Object.assign(detail, res);
                    detail.populated = true;
                    ["contents","equipment","properties"].forEach(property => {
                        if (detail[property]) {
                            populateList(detail[property]).then(res => detail[property] = res)
                        }
                    });
                    return detail;
                })
        }

        async function populateList(items){
            return Promise.all(items.map(opt => fetchEquipmentDetail(opt)));
        }

        async function populateEquipmentDetails() {
            let newEquipment = [...equipment];
            let newEquipmentOptions = [...equipmentOptions]
            Promise.all([
                populateList(newEquipment),
                Promise.all(newEquipmentOptions.map(choice => choice.from && populateList(choice.from)))
            ]).then(
                res => {
                    console.log("promise.all result", res)
                    setEquipment(res[0]);
                    setEquipmentOptions(res[1]);
                }
            )
        }
        populateEquipmentDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="flex flex-col">
            <div className="w-full">
                <List component="nav">
                    {equipment && equipment.map((item, key) => 
                        <EquipmentDetails item={item.equipment || item} key={key} quantity={item.quantity}/>
                    )}
                </List>
            </div>
            {equipmentOptions && equipmentOptions.length && equipmentOptions.map(choice => choice.length && choice.map(opt =>
            <EquipmentDetails item={opt.equipment || opt} key={opt.index} quantity={opt.quantity}/>
            ))}
        </div>
    )
}
