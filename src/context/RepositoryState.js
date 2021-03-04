import React, {createContext, useReducer} from 'react';
import RepositoryReducer from './RepositoryReducer';

const initialState = {
    repository: {}
}

export const RepositoryContext = createContext(initialState);

export const RepositoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(RepositoryReducer, initialState);

    async function makeRequest(uri) {
        return fetch(`https://www.dnd5eapi.co${uri}`).then(res => res.json());
    }

    async function getData(uri) {
        if (state.repository[uri.replace(/[/-]/g,"")]) {
            return state.repository[uri.replace(/[/-]/g,"")];
        } else {
            var requestData = makeRequest(uri);
            dispatch({
                type: 'SET_DATA',
                payload: {
                    uri,
                    value: requestData
                }
            });
            return await requestData;
        }
    }

    return (
        <RepositoryContext.Provider value ={{
            getData,
            repository: state.repository
        }}>
            {children}
        </RepositoryContext.Provider>
    )
}