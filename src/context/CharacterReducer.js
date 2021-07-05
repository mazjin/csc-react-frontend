// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const setDeepValue = (target, value, path) => {
        if (typeof path === 'string') {
            path = path.split('.')
        }
    
        if (path.length > 1){
            var p = path.shift();
            if(target[p]==null || typeof target[p] !== 'object') {
                target[p]={}
            }
            return {...target, [p]:setDeepValue(target[p], value, path)}
        } else {
            target[path[0]]=value;
            return target;
        }
    }
    switch(action.type) {
        case 'SET_STATE': {
            return {...action.payload}
        }
        case 'NEXT_STAGE':
            return {
                ...state,
                stage: state.stage + 1,
                stageOption: ''
            }
        case 'PREV_STAGE':
            return {
                ...state,
                stage: state.stage - 1,
                stageOption: ''
            }
        case 'SELECT_STAGE_OPTION':
            return {
                ...state,
                stageOption: action.payload
            }
        case 'RETURN_FROM_STAGE_OPTION':
            return {
                ...state,
                stageOption: ''
            }
        case 'UPDATE_CHARACTER':
            if (!action.payload.field) {
                return {
                    ...state,
                    character: action.payload.value
                }
            }
            if (action.payload.field.constructor.name === 'Array') {
                return {
                    ...state,
                    character: setDeepValue(state.character, action.payload.value, action.payload.field)
                }
                
            }
            return {
                ...state,
                character: {...state.character, [action.payload.field]: action.payload.value}
            }
        default:
            return state
    }
}
