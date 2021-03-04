export default (state, action) => {
    switch(action.type) {
        case 'SET_DATA': {
            var uri = action.payload.uri.replace(/[/-]/g,"");
            return {
                ...state,
                repository: {...state.repository, [uri]: action.payload.value}
            }
        }
        default:
            return state;
    }
}
