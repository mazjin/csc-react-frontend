import React, { useContext } from 'react';
// import { CharacterContext } from '../context/CharacterState';
import { EquipmentDetailsWeapon } from './EquipmentDetailsWeapon';
import { EquipmentDetailsArmor } from './EquipmentDetailsArmor';
import { Card, CardContent, Typography } from '@material-ui/core';

export const EquipmentDetails = ({item, key, quantity=1}) => {
    // const {character} = useContext(CharacterContext);

    function renderDetails(item) {
        switch (item.equipment_category.index) {
            case 'armor':
                return <EquipmentDetailsArmor item={item}/>;
            case 'weapon':
                return <EquipmentDetailsWeapon item={item}/>;
            default:
                return <div>Unrecognised category: {item.equipment_category.index}</div>
        }
    }

    return (
        <Card variant="outlined" key={key}>
            <CardContent className="flex flex-col">
                <div>
                    <div className="flex justify-between items-center">
                        <Typography variant="h5">
                            {item && item.name}
                        </Typography>
                        {item && item.equipment_category && <Typography variant="subtitle1">
                            {item.equipment_category.name} 
                            ({item.category_range||(item.armor_category)||(item.gear_category && item.gear_category.name)||"-"})
                        </Typography>}
                        {item && <Typography variant="h4">
                            {item.quantity}
                        </Typography>}
                    </div>
                    {item && <div className="flex mx-4">
                    <div>
                        { item.equipment_category && renderDetails(item)}
                    </div>
                    </div>}
                    <div className="flex mx-4">
                        {item && item.contents && item.contents.length && <ul>
                            {item.contents.map(thing => {
                                if (thing.item) {
                                    return <li>{thing.item.name}{thing.quantity && " x " + thing.quantity}</li>;
                                }
                                else {
                                    return <li>{thing.name}</li>;
                                }
                            })
                        }
                        </ul>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
