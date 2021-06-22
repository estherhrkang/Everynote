import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'notebook/LOAD_NOTEBOOKS';
const SET_NOTEBOOK = 'notebook/SET_NOTEBOOK';
const REMOVE_NOTEBOOK = 'notebook/REMOVE_NOTEBOOK';

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

export const removeNotebook = (notebookId) => {
    return {
        type: REMOVE_NOTEBOOK,
        notebookId
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

export const deleteOneNotebook = (notebook) => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notebook)
    });
    if (response.ok) {
        const notebookId = await response.json();
        dispatch(removeNotebook(notebookId));
        return notebookId;
    };
};

// export const editOneNotebook = (notebook) => async dispatch => {
//     const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(notebook)
//     });
//     if (response.ok) {
//         const notebook = await response.json();
//         dispatch(setNotebook(notebook));
//         return notebook;
//     }
// }

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
        case REMOVE_NOTEBOOK:
            newState = { ...state };
            newState.fullNotebook = [...state.fullNotebook];
            const toRemoveIdx = newState.fullNotebook.findIndex(oneFullNotebook => oneFullNotebook.id === action.notebookId) 
            newState.fullNotebook.splice(toRemoveIdx, 1);
            return newState;
        default:
            return state;
    };
};

export default notebookReducer;
