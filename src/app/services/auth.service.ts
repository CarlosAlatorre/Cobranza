import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";

@Injectable()
export class AuthService {

    constructor(private _af: AngularFireAuth,
                private _db: AngularFireDatabase,
                private _alertService: alertService) {
    }

    getUser() {
        return new Promise(resolve => {
            this._af.auth.onAuthStateChanged((user) => {
                resolve(user);
            })
        })
    }

    authUser(email: string, pass: string) {
        return new Promise((resolve, reject) => {
            this._af.auth.signInWithEmailAndPassword(email, pass)
                .then(() => {
                    resolve();
                })
                .catch((error:any) => {
                    this.getErrorAuth(error.code);
                    reject()
                })
        })
    }

    getErrorAuth(codeError: string) {

        let message: string = '';
        let title: string = '';

        switch (codeError) {
            case 'auth/user-not-found':
                title = "Usuario no encontrado!";
                message = "Escriba un usuario valido";
                break;

            case 'auth/user-disabled':
                title = "Email deshabilitado!";
                message = "Escriba un email valido";
                break;

            case 'auth/wrong-password':
                title = "Contraseña incorrecta!";
                message = "Escriba una contraseña correcta";
                break;

            case 'auth/email-already-in-use':
                title = "Email en uso";
                message = "Ingrese un nuevo correo";
                break;

            case 'auth/weak-password':
                title = "Contraseña débil";
                message = "La contraseña debe contener al menos 6 digitos";
                break;
        }

        this._alertService.confirmError(title, message);
    }
}
