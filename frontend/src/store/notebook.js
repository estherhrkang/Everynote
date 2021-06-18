import { csrfFetch } from './csrf';

const SET_NOTEBOOK = 'notebook/SET_NOTEBOOK';

// action creator
export const setNotebook = (notebook) => {
    return {
        type: SET_NOTEBOOK,
        notebook
    }
}

// thunk action creator

export const createNotebook = ( title ) => async dispatch => {
    const response = await csrfFetch('/api/notebooks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    });
    if (response.ok) {
        const notebook = await response.json();
        dispatch(setNotebook(notebook));
        return notebook;
    }
};

// reducer

const initialState = {
    notebook: null
};

const notebookReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NOTEBOOK:
            return { ...state, ...action.notebook };
        default:
            return state;
    };
};

export default notebookReducer;
