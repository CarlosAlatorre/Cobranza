import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Debtor} from '../../interfaces/debtor'
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "../../services/alert.service";
import {isUndefined} from "util";

@Component({
    selector: 'app-agregar-deudor',
    templateUrl: './agregar-deudor.component.html',
    styleUrls: ['./agregar-deudor.component.scss']
})
export class AgregarDeudorComponent {

    deptor: Debtor = {} as Debtor;
    fechaVencimiento: Date;

    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase,
                private  alertService: alertService) {
    }

    addDebtor() {
        const ref = this.db.list('deudores');

        if (!this.errorInFields()) {
            this.deptor.vencimiento = this.fechaVencimiento.toString();
            this.deptor.fechaInicio = new Date().toString();
            ref.push(this.deptor);
            this.activeModal.dismiss();
        } else {
            this.alertService.error('Error en los campos', 'Verifique que todos los campos estén llenos')
        }


    }

    errorInFields() {
        debugger
        let isError:boolean = false;
        if (this.deptor.nombre == "" || isUndefined(this.deptor.nombre) ) {
            isError = true;
        }
        if (this.deptor.domicilio == "" || isUndefined(this.deptor.domicilio) ) {
            isError = true;
        }
        if (this.deptor.superficie== "" || isUndefined(this.deptor.superficie) ) {
            isError = true;
        }
        if (isUndefined(this.deptor.totalDeuda) ) {
            isError = true;
        }
        if (isUndefined(this.deptor.telefono) ) {
            isError = true;
        }
        if (isUndefined(this.fechaVencimiento) ) {
            isError = true;
        }

        return isError;
    }

    closeModal() {
        this.activeModal.dismiss();
    }


}
