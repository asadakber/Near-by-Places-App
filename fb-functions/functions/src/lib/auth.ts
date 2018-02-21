import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import * as _cors from 'cors';
import { AuthClass } from '../db/auth';
let cors = _cors({origin: true});

export const signuplistener = functions.https.onRequest(async(req: Request, res: Response) => {
    cors(req, res, () => {
        res.send('signup success');
        AuthClass.signup(req.body)
        .then((success) => {

        }).catch((error) => {

        })
    })
})

export const loginlistener = functions.https.onRequest(async(req: Request, res: Response) => {
    cors(req, res, () => {
        AuthClass.Login(req.body).then((success) => {
            res.send(success)
        }).catch((error) => {
            res.send(error)
        })
    })
})