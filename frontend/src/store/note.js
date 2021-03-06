import { csrfFetch } from './csrf';

const LOAD_NOTES = 'note/LOAD_NOTES';
const LOAD_NOTE = 'note/LOAD_NOTE';
const SET_NOTE = 'note/SET_NOTE';
const REMOVE_NOTE = 'note/REMOVE_NOTE';
const EDIT_NOTE = 'note/EDIT_NOTE';

// action creator

export const loadNotes = (note) => {
    return {
        type: LOAD_NOTES,
        note
    };
};

export const loadNote = (note) => {
    return {
        type: LOAD_NOTE,
        note
    };
};

export const setNote = (note) => {
    return {
        type: SET_NOTE,
        note
    };
};

export const removeNote = (noteId) => {
    return {
        type: REMOVE_NOTE,
        noteId
    };
};

export const editNote = (note) => {
    return {
        type: EDIT_NOTE,
        note
    };
};

// thunk action creator

export const getAllNotes = () => async dispatch => {
    const response = await csrfFetch('/api/notes');
    if (response.ok) {
        const notes = await response.json();
        dispatch(loadNotes(notes));
        return notes;
    };
};

export const getOneNote = (note) => async dispatch => {
    const response = await csrfFetch(`/api/notes/${note.id}`);
    if (response.ok) {
        const note = await response.json();
        dispatch(loadNote(note));
        return note;
    };
};

export const getAllNotesInNotebook = (notebookid) => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/${notebookid}/notes`);
    if (response.ok) {
        const notes = await response.json();
        dispatch(loadNotes(notes));
        return notes;
    };
};

export const createNote = (title, content, notebookId) => async dispatch => {
    const response = await csrfFetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, notebookId })
    });
    if (response.ok) {
        const note = await response.json();
        dispatch(setNote(note));
        return note;
    };
};

export const deleteOneNote = (note) => async dispatch => {
    const response = await csrfFetch(`/api/notes/${note.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    if (response.ok) {
        const noteId = await response.json();
        dispatch(removeNote(noteId));
        return noteId;
    };
};

export const editOneNote = (note) => async dispatch => {
    const response = await csrfFetch(`/api/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    if (response.ok) {
        const note = await response.json();
        dispatch(editNote(note));
        return note;
    };
};

// reducer

const initialState = {
    fullNote: null
};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_NOTE:
            newState = { ...state };
            newState.fullNote = [action.note];
            return newState;
        case LOAD_NOTES:
            return { ...state, fullNote: [...action.note] };
        case SET_NOTE:
            // newState = Object.assign({}, state);
            // newState.fullNote = action.note;
            newState = { ...state };
            newState.fullNote = [...state.fullNote, action.note];
            return newState;
        case EDIT_NOTE:
            newState = { ...state };
            newState.fullNote = [...state.fullNote, action.note];
            return newState;
        case REMOVE_NOTE:
            newState = { ...state };
            newState.fullNote = [...state.fullNote];
            const idxToRemove = newState.fullNote.findIndex(oneFullNote => oneFullNote.id === action.noteId);
            newState.fullNote.splice(idxToRemove, 1);
            return newState;
        default:
            return state;
    };
};

export default noteReducer;