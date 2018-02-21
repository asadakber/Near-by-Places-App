"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const auth_1 = require("./lib/auth");
exports.signup = auth_1.signuplistener;
exports.login = auth_1.loginlistener;
exports.firestore = functions.firestore;
//# sourceMappingURL=index.js.map