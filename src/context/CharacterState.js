import React, {createContext, useReducer} from 'react';
import { Character } from '../models/Character';
import CharacterReducer from './CharacterReducer';

const initialState = {
    character: new Character(),
    stage: 0, //0-frontpage, 1 - basics, 2 - options, 3 - confirm, 4 - success/generate
    stageOption:''
}

export const CharacterContext = createContext(initialState);

export const CharacterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CharacterReducer, initialState);

    //actions
    function nextStage() {
        dispatch({
            type:'NEXT_STAGE'
        })
    }
    
    function prevStage() {
        dispatch({
            type:'PREV_STAGE'
        })
    }

    function goToStageOption(option){
        dispatch({
            type:'SELECT_STAGE_OPTION',
            payload: option
        })
    }

    function returnFromStageOption() {
        dispatch({
            type:'RETURN_FROM_STAGE_OPTION'
        })
    }

    function reset() {
        dispatch({
            type:'SET_STATE',
            payload: {
                character: new Character(),
                stage: 0,
                stageOption:''
            }
        })
    }

    function updateCharacter(field, value) {
        dispatch({
            type: 'UPDATE_CHARACTER',
            payload: {
                field,
                value
            }
        })
    }

    return (
        <CharacterContext.Provider value = {{
            stage: state.stage,
            stageOption: state.stageOption,
            character: state.character,
            nextStage,
            prevStage,
            updateCharacter,
            reset,
            goToStageOption,
            returnFromStageOption
        }}>
            {children}
        </CharacterContext.Provider>
    )
}