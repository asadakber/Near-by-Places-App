import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)
import { signuplistener, loginlistener } from './lib/auth';

export const signup = signuplistener;
export const login = loginlistener;
export const firestore = functions.firestore
