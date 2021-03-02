import { Stat } from "./Stat";

export class Proficiency {
    name;
    index;
    proficient = false;
    source;
}


export class Character {
    level = 1;
    stats = {
        str: new Stat('Strength'),
        dex: new Stat('Dexterity'),
        con: new Stat('Constitution'),
        int: new Stat('Intelligence'),
        wis: new Stat('Wisdom'),
        cha: new Stat('Charisma'),
    };
    saves = {
        str: new Proficiency(),
        dex: new Proficiency(),
        con: new Proficiency(),
        int: new Proficiency(),
        wis: new Proficiency(),
        cha: new Proficiency(),
    }
    skills = {};
    proficiencies=[];
    languages=[];
    starting_equipment=[];


    _populateData = async(prop) => {
        if (prop.url && !prop.loaded) {
            prop = Object.assign(prop, await fetch(process.env.REACT_APP_SRD_LOOKUP_API_URL_BASE + prop.url).then(res => res.json), {loaded:true});
        }
        return prop;
    }

    
}