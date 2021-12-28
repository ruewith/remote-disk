const SET_USER = "SET_USER";
const AUTH_MESSAGE = "AUTH_MESSAGE";
const LOGOUT = "LOGOUT";

const defaultState = {
    currentUser: {},
    authMessage: {},
    isAuth: false,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            };
        case AUTH_MESSAGE:
            return {
                ...state,
                authMessage: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            };
        default:
            return state;
    }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const getResponseMessage = (authMessage) => ({
    type: AUTH_MESSAGE,
    payload: authMessage,
});
export const logout = () => ({ type: LOGOUT });
