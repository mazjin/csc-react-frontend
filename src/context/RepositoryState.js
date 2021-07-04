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
        let label = uri.replace(/[/-]/g,"");
        if (state.repository[label]) {
            return state.repository[label];
        } else {
            var requestData = await makeRequest(uri);
            dispatch({
                type: 'SET_DATA',
                payload: {
                    label,
                    value: requestData
                }
            });
            return requestData;
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