import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export const CharacterClassSummary = ({cls}) => {
    const {proficiencies, saving_throws, proficiency_choices} = useContext(CharacterContext).character;

    return (
        <Card variant="outlined">
            <CardContent className="overflow-y-scroll max-w-md" style={{'max-height': '20rem'}}>
                <p><span className="font-semibold">Hit Die:</span> {hit_die}</p>
                <p className="font-semibold">Saves:</p>
                <ul>
                    {saving_throws.map(save => 
                        <li 
                            key={save.index}
                            className="px-1"
                        >{save.name}</li>)}
                </ul>
                <p className="font-semibold">Proficiencies</p>
                <ul>
                    {proficiencies.map(skill => 
                        <li key={skill.index}
                            className="px-1"
                        >{skill.name}
                        </li>)}
                </ul>
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

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}
