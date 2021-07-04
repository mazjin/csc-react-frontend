import React, { useContext } from 'react';
// import { CharacterContext } from '../context/CharacterState';
import { EquipmentDetailsWeapon } from './EquipmentDetailsWeapon';
import { EquipmentDetailsArmor } from './EquipmentDetailsArmor';
import { Card, CardContent, Typography } from '@material-ui/core';
import { EquipmentOption } from './EquipmentOption';
import DoneIcon from '@material-ui/icons/Done';

export const EquipmentDetails = ({item, optionKey, choiceKey, quantity=1, handleSelect = () => {}}) => {
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

    function handleSelectSub(subChoiceKey, subKey) {
        item.equipment[subKey].selected = !item.equipment[subKey].selected;
        handleSelect(choiceKey, subChoiceKey);
    }

    return (
        <Card variant="outlined" key={item.index+"-card"} className="w-full">
            <CardContent className="flex flex-col w-full">
                <div className="flex flex-col" onClick={() => handleSelect(choiceKey, optionKey)}>
                    <div className="flex justify-between items-center">
                        {item && !item.equipment && item.name && <div >
                                <Typography variant="h5">
                                    {item.name}
                                </Typography>
                            </div>
                        }
                        {item && item.selected && <DoneIcon />}
                    </div>
                    {item && item.equipment_category && <Typography variant="subtitle1">
                        {item.equipment_category.name} 
                        ({item.category_range||(item.armor_category)||(item.gear_category && item.gear_category.name)||"-"})
                    </Typography>}
                    {item && <Typography variant="h4">
                        {item.quantity}
                    </Typography>}
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
                    <div className="w-full">
                        {item && item.equipment && item.equipment.length && 
                            <EquipmentOption name={item.name} choice={item.equipment} choiceKey={optionKey} handleSelect={handleSelectSub ?? {}}/>
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
