"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const _cors = require("cors");
const auth_1 = require("../db/auth");
let cors = _cors({ origin: true });
exports.signuplistener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        res.send('signup success');
        auth_1.AuthClass.signup(req.body)
            .then((success) => {
        }).catch((error) => {
        });
    });
}));
exports.loginlistener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        auth_1.AuthClass.Login(req.body).then((success) => {
            res.send(success);
        }).catch((error) => {
            res.send(error);
        });
    });
}));
//# sourceMappingURL=auth.js.map