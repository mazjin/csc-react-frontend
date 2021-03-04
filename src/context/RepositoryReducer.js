export default (state, action) => {
    // async function updateRepository(target, uri, value){
    //     console.log(uri);
    //     uri = uri.replace(/[/-]/g,"");
    //     console.log(uri);
    //     target[uri] = value;
    //     return target;
    // }

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
