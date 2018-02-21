import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../reducers/root';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGOUT_SUCCESS, SIGNUP, SIGNUP_FAILED, SIGNUP_SUCCESS } from '../actions/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthEpic {
    constructor(private afauth: AngularFireAuth, private http: Http) {}
    signup = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(SIGNUP)
        .switchMap(({payload, navCtrl}) => {
            return Observable.fromPromise(this.afauth.auth.createUserWithEmailAndPassword(payload.userEmail, payload.userPassword))
            .switchMap((responce) => {
                payload.uid = responce.uid;
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let url = "https://us-central1-role-based-authorization.cloudfunctions.net/signup"
                return this.http.post(url, payload, {headers: headers})
                .switchMap(res => {
                    navCtrl();
                    return Observable.of({type: SIGNUP_SUCCESS, payload: payload})
                })
                .catch((error) => {
                    return Observable.of({type: SIGNUP_FAILED, payload: error.message})
                })
            })
        })
    }

    login = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(LOGIN) 
        .switchMap(({payload, navCtrl}) => {
            return Observable.fromPromise(this.afauth.auth.signInWithEmailAndPassword(payload.userEmail, payload.userPassword))
            .switchMap((responce) => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                payload.uid = this.afauth.auth.currentUser.uid;
                let url = "https://us-central1-role-based-authorization.cloudfunctions.net/login"
                return this.http.post(url, payload, {headers: headers})
                .switchMap(res => {
                    navCtrl();
                    return Observable.of({type: LOGIN_SUCCESS, payload: payload})
                })
                .catch((error) => {
                    return Observable.of({type: LOGIN_FAILED, payload: error.message})
                })
            })
        })
    }

    logout = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(LOGOUT)
        .switchMap(({navCtrl}) => {
            this.afauth.auth.signOut();
            navCtrl();
            return Observable.of({type: LOGOUT_SUCCESS})
        })
    }

}

