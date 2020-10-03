import React, { useContext } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CharacterContext } from '../context/CharacterState';

export const CharacterFormBasicsSummary = () => {
    const {character} = useContext(CharacterContext);
    
    const {hit_die, proficiencies, proficiency_choices, saving_throws, stats, size, base_speed, languages, language_options, ability_bonus_options} = character;

    return (
        <Card variant="outlined">
            <CardContent className="overflow-y-auto max-w-md flex" style={{'max-height': '20rem'}}>
                <div className="flex flex-col mx-2">
                { stats && <>
                    <p className="font-semibold">Ability Bonuses</p>
                    <ul>
                        {Object.values(stats).filter(stat => stat.bonus).map(stat => 
                            <li key={stat.index}
                                className="px-1"
                            >{stat.name}: {stat.bonus>0 ? '+':''}{stat.bonus}
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
                <p><span className="font-semibold">Base Speed:</span> {base_speed}</p>
                <p className="font-semibold">Languages:</p>
                <ul>
                    {languages.map(language => 
                        <li 
                            key={language.index}
                            className="px-1"
                        >{language.name}</li>)}
                </ul>
                {
                    language_options?.length > 0 && language_options.map(choice =>
                        <>
                            <p className="text-sm">
                                Choose {choice.choose} from:
                            </p>
                            <ul>
                                {choice.from.map(lang => 
                                    <li key={lang.index}
                                    className="px-1">{lang.name}</li>)}
                            </ul>
                        </>
                        )
                }
                </div>
                <div className="flex flex-col mx-2">
                    {hit_die && <p><span className="font-semibold">Hit Die:</span> {hit_die}</p>}
                    {saving_throws &&  <>
                        <p className="font-semibold">Saves:</p>
                        <ul>
                            {Object.keys(saving_throws).map(key => 
                                <li 
                                    key={key}
                                    className="px-1"
                                >{saving_throws[key].name}</li>)}
                        </ul>
                    </>}
                    {proficiencies && Object.keys(proficiencies)?.length && <>
                        <p className="font-semibold">Proficiencies</p>
                        <ul>
                            {Object.keys(proficiencies).map(key => 
                                <li key={key}
                                    className="px-1"
                                >{proficiencies[key].name}
                                </li>)}
                        </ul>
                    </>}
                    {
                        proficiency_choices &&
                        <>
                            { proficiency_choices.map(choice =>
                                <>
                                    <p className="text-sm">
                                        Choose {choice.choose} from:
                                    </p>
                                    <ul>
                                        {choice.from.map(skill => 
                                            <li key={skill.index}
                                            className="px-1">{skill.name}</li>)}
                                    </ul>
                                </>
                            )}
                        </>
                    }
                </div>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}
