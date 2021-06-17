import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

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

// export const logout = ({ credential, password }) => async dispatch => {
    
// };

// reducer

const initialState = {
    user: null
};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSION_USER:
            return action.user;
        case REMOVE_SESSION_USER:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;