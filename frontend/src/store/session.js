import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';
const FAILED_RESTORE = 'session/FAILED_RESTORE';

// action creators

export const setSessionUser = (user) => {
    return {
        type: SET_SESSION_USER,
        user
    };
};

export const removeSessionUser = () => {
    return {
        type: REMOVE_SESSION_USER
    };
};

export const failedRestore = () => {
    return {
        type: FAILED_RESTORE
    }
}

// thunk action creator

export const login = ({ credential, password }) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential, password })
    });
    if (response.ok) {
        const user = await response.json();
        dispatch(setSessionUser(user));
        return user;
    };
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    if (response.ok) {
        const data = await response.json();
        if (data.user) {
            dispatch(setSessionUser(data.user));
            // return response;
        } else {
            dispatch(failedRestore());
        }
    };
};

export const signup = ({ username, email, password }) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setSessionUser(data.user));
        return response;
    };
};

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeSessionUser());
        return response;
    }
};

// reducer

const initialState = {
    user: null
};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSION_USER:
            return { user: action.user };
        case REMOVE_SESSION_USER:
            return initialState;
        case FAILED_RESTORE:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;