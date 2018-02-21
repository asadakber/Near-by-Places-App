import { combineReducers } from 'redux';
import { AuthState, AUTH_INITIAL_STATE, AuthReducer } from '../reducers/auth';

export interface AppState {
    auth: AuthState
}

export const INITIAL_STATE = {
    auth: AUTH_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState> ({
    auth: AuthReducer
})