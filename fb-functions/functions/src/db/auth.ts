import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { AngularFireAuth } from 'angularfire2/auth';

const userRef = admin.firestore().collection('users')

export class AuthClass {
    currentUserUid: any;
    constructor(private afauth: AngularFireAuth) {}

    static Login(currentUserUid) {
        return new Promise((resolve, reject) => {
            userRef.doc(currentUserUid.uid).get().then((doc) => {
                if(doc.exists) {
                    resolve(doc.data())
                }
                else {
                    console.log('no document exisits')
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    static signup(userData: any) {
        return new Promise((resolve, reject) => {
            userRef.doc(userData.uid).set({
                userName: userData.userName,
                userEmail: userData.userEmail,
                userPassword: userData.userPassword
            }).then((resolve) => {
                console.log('signup data success');
            }).catch((reject) => {
                console.log('signup data reject');
            })
        })
    }
}