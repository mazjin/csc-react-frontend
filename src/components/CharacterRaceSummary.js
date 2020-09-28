import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export const CharacterRaceSummary = ({race}) => {
    // const {race} = useContext(CharacterContext).character;
    const {ability_bonuses, ability_bonus_options, speed, languages, size} = race;

    return (
        <Card variant="outlined">
            <CardContent className="overflow-y-scroll max-w-md" style={{'max-height': '20rem'}}>
                { ability_bonuses && ability_bonuses.length && <>
                    <p className="font-semibold">Ability Bonuses</p>
                    <ul>
                        {ability_bonuses.map(bonus => 
                            <li key={bonus.index}
                                className="px-1"
                            >{bonus.name}: {bonus.bonus>0 ? '+':''}{bonus.bonus}
                            </li>)}
                    </ul>
                    </>
                }
                {
                    ability_bonus_options && ability_bonus_options.length > 0 &&
                    <>
                        <p className="text-sm">
                            Choose {ability_bonus_options.choose} from:
                        </p>
                        <ul>
                            {ability_bonus_options.from.map(bonus => 
                                <li key={bonus.index}
                                className="px-1">{bonus.name}: {bonus.bonus>0 ? '+':''}{bonus.bonus}</li>)}
                        </ul>
                    </>
                }
                <p><span className="font-semibold">Size:</span> {size}</p>
                <p><span className="font-semibold">Base Speed:</span> {speed}</p>
                <p className="font-semibold">Languages:</p>
                <ul>
                    {languages.map(language => 
                        <li 
                            key={language.index}
                            className="px-1"
                        >{language.name}</li>)}
                </ul>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}
