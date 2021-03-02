import { Card, CardContent,  List, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { CharacterContext } from '../context/CharacterState';

export const CharacterMiscOptionsEquipment = () => {
    const {character} = useContext(CharacterContext);
    const [equipment, setEquipment] = useState(character.starting_equipment);
    const [equipmentOptions, setEquipmentOptions] = useState(character.starting_equipment_options);
    
    useEffect(() => {
        async function fetchEquipmentDetail(equipmentEntry) {
            let detail = equipmentEntry.equipment || equipmentEntry.item || (equipmentEntry.equipment_option && equipmentEntry.equipment_option.from.equipment_category) || equipmentEntry;
            if (detail.populated) { return; }
            return fetch(`https://www.dnd5eapi.co${detail.url}`)
                .then(res => res.json())
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
                    {equipment && equipment.map((eqp, key) => 
                        <Card variant="outlined" key={key}>
                            <CardContent className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <Typography variant="h5">
                                        {eqp && eqp.name}
                                    </Typography>
                                    { eqp.quantity && <Typography variant="h6">
                                        {eqp.quantity}
                                    </Typography>}
                                </div>
                                {eqp.contents && <ul>
                                    {eqp && eqp.contents && Object.keys(eqp.contents).map(x => <li>{x.name}</li>)}
                                </ul>}
                                {eqp && eqp.equipment_category && <Typography variant="subtitle1">
                                    {eqp.equipment_category.name}
                                    ({(eqp.weapon_category && eqp.weapon_category.name)||(eqp.armor_category && eqp.armor_category.name)||eqp.gear_category && eqp.gear_category.name||"-"})
                                 </Typography>}
                            </CardContent>
                        </Card>
                    )}
                </List>
            </div>
            {equipmentOptions && equipmentOptions.length && equipmentOptions.map(choice => choice.length && choice.map(opt =><div key={opt.index}>{opt.index}</div>))}
        </div>
    )
}
