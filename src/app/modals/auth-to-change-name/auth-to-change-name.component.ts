import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-auth-to-change-name',
    templateUrl: './auth-to-change-name.component.html',
    styleUrls: ['./auth-to-change-name.component.scss']
})
export class AuthToChangeNameComponent implements OnInit {

    email: string = null;
    @ViewChild('emailRef') emailRef:ElementRef;
    @ViewChild('contrasenia') passRef:ElementRef;

    constructor(private _authService: AuthService,
                private _activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this._authService.getUser()
            .then((response: any) => {
                if (response) {
                    this.email = response.email;
                }
            })

        setTimeout(()=> {
            this.emailRef.nativeElement.focus();
            this.passRef.nativeElement.focus();
        }, 100);
    }

    auth(pass: string) {
        this._authService.authUser(this.email, pass)
            .then(() => {
                this._activeModal.close(true);
            })
            .catch(() => {})
    }

    closeModal() {
        this._activeModal.close();
    }

}
