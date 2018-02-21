"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const userRef = admin.firestore().collection('users');
class AuthClass {
    constructor(afauth) {
        this.afauth = afauth;
    }
    static Login(currentUserUid) {
        return new Promise((resolve, reject) => {
            userRef.doc(currentUserUid.uid).get().then((doc) => {
                if (doc.exists) {
                    resolve(doc.data());
                }
                else {
                    console.log('no document exisits');
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    static signup(userData) {
        return new Promise((resolve, reject) => {
            userRef.doc(userData.uid).set({
                userName: userData.userName,
                userEmail: userData.userEmail,
                userPassword: userData.userPassword
            }).then((resolve) => {
                console.log('signup data success');
            }).catch((reject) => {
                console.log('signup data reject');
            });
        });
    }
}
exports.AuthClass = AuthClass;
//# sourceMappingURL=auth.js.map