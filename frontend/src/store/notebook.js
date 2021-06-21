import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'notebook/LOAD_NOTEBOOKS';
const SET_NOTEBOOK = 'notebook/SET_NOTEBOOK'

// action creator
export const loadNotebooks = (notebook) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebook
    };
};

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
        dispatch(loadNotebooks(notebooks));
        return notebooks;
    };
};

// reducer

const initialState = {
    fullNotebook: null
};

const notebookReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_NOTEBOOKS:
            return { ...state, fullNotebook: [...action.notebook] };
        case SET_NOTEBOOK:
            newState = { ...state };
            newState.fullNotebook = [...state.fullNotebook, action.notebook];
            return newState;
        default:
            return state;
    };
};

export default notebookReducer;
