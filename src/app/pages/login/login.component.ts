import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {userAuthInterface} from "../../interfaces/user.interface";
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {alertService} from '../../services/alert.service'
import {error} from "util";
import {Router} from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    // variables
    userLogin: userAuthInterface [] = [];
    errorInLoginFields:boolean=false;
    showError:boolean=false;
    closeError:boolean=false;

    // Referencias al DOM
    @ViewChild('password') private passRef:ElementRef;
    @ViewChild('email') private emailRef:ElementRef;


    constructor(private afAuth:AngularFireAuth,
                private alertService:alertService,
                private router:Router) {
        this.afAuth.auth.onAuthStateChanged((user)=>{
            if(user){
                router.navigate(['principal'])
            }
        })

    }
    ngOnInit(){

    }

    verifyFieldsLogin(email:string, pass:string){

        // verificar el campo email
        if(email == null || email ==" "){
            this.emailRef.nativeElement.focus();
            this.errorInLoginFields = true;
            this.sendError();
            console.log("el campo email es incorrecto")
        }

        // verificar el campo contraseña
        if(pass==null || pass ==" "){
            this.passRef.nativeElement.focus();
            this.errorInLoginFields = true;
            this.sendError();
            console.log("el campo pass es incorrecto")
        }

        //mandar a llamar al metodo para que inicie Sesion
        if(!this.errorInLoginFields){
            this.loginUser(email,pass);
        }

    }

    loginUser(userEmail:string,userPass:string){

        this.afAuth.auth.signInWithEmailAndPassword(userEmail,userPass)
            .then((response: any) => {
                this.router.navigate(['principal']);
            })
            .catch((error: any) => {
                this.getErrorAuth(error.code);
                console.log("No se pudo autenticar :( ",error.code);
                // this.isLoading = false;
            })
    }

    // timeout para el msje del error
    sendError() {
        this.showError = true;
        this.closeError = false;
        setTimeout(() => {
            this.closeError = true;
            setTimeout(() => {
                this.showError = false;
            }, 1000);
        }, 2000);
    }

    getErrorAuth(codeError: string) {

        switch (codeError) {
            case 'auth/user-not-found':
                this.alertService.confirmError("Usuario no encontrado!", "Escriba un usuario valido")

                    .then((response) => {
                        this.emailRef.nativeElement.focus();

                        // console.log(response);
                    });

                break;

            case 'auth/user-disabled':
                this.alertService.confirmError("Email deshabilitado!", "Escriba un email valido")

                    .then((response) => {
                        this.emailRef.nativeElement.focus();

                        console.log(response);
                    });

                break;

            case 'auth/wrong-password':
                this.alertService.confirmError("Contraseña incorrecta!", "Escriba una contraseña correcta")

                    .then((response) => {
                        this.passRef.nativeElement.focus();

                        console.log(response);
                    });

                break;

            case 'auth/email-already-in-use':
                this.alertService.confirmError("Email en uso", "Ingrese un nuevo correo")

                    .then((response) => {
                        this.emailRef.nativeElement.focus();

                    });
                break;

            case 'auth/weak-password':
                this.alertService.confirmError("Contraseña débil", "La contraseña debe contener al menos 6 digitos")

                    .then((response) => {
                        this.passRef.nativeElement.focus();

                    });
                break;

        }
    }


}
