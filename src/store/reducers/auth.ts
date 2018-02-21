import { tassign } from 'tassign';
import { LOGIN, SIGNUP_SUCCESS, SIGNUP_FAILED, LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/auth';

export interface AuthState {
    userData: Object;
    errorMessage: string;
    isLoggedIn: boolean;
}

export const AUTH_INITIAL_STATE = {
    userData: null,
    errorMessage: null,
    isLoggedIn: false
}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGNUP_SUCCESS:
            return tassign({userData: action.payload})
        case SIGNUP_FAILED:
            return tassign({errorMessage: action.payload})
        case LOGIN:
            return tassign({isLoggedIn: false, isLoading: true})
        case LOGIN_SUCCESS:
            return tassign({userData: action.payload, isLoggedIn: false, isLoading: false})
        case LOGIN_FAILED:
            return tassign({isLoading: false, isLoggedIn: true})
        case LOGOUT_SUCCESS:
            return tassign({isloggedIn: true})
        default:
            return state    
    }
}