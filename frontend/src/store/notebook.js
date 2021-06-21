import { csrfFetch } from './csrf';

const SET_NOTEBOOK = 'notebook/SET_NOTEBOOK';

// action creator
export const setNotebook = (notebook) => {
    return {
        type: SET_NOTEBOOK,
        notebook
    };
};

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
    };
};

export const getAllNotebooks = () => async dispatch => {
    const response = await csrfFetch('/api/notebooks');
    if (response.ok) {
        const notebooks = await response.json();
        console.log('HERE-------', notebooks);
        dispatch(setNotebook(notebooks));
        return notebooks;
    };
};

// reducer

const initialState = {
    fullNotebook: null
};

const notebookReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NOTEBOOK:
            return { ...state, fullNotebook: [...action.notebook] };
        default:
            return state;
    };
};

export default notebookReducer;
