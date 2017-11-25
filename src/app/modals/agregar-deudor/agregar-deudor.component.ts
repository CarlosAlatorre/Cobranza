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

    debtor: Debtor = {} as Debtor;
    fechaVencimiento: Date;

    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase,
                private  alertService: alertService) {
    }

    addDebtor() {
        const ref = this.db.list('deudores');

        if (!this.errorInFields()) {
            this.debtor.vencimiento = this.fechaVencimiento.toString();
            this.debtor.fechaInicio = new Date().toString();
            this.debtor.estado = "Deuda";
            this.debtor.totalAbono = 0;
            ref.push(this.debtor);
            this.activeModal.dismiss();
        } else {
            this.alertService.error('Error en los campos', 'Verifique que todos los campos estén llenos')
        }


    }

    errorInFields() {
        let isError:boolean = false;
        if (this.debtor.nombre == "" || isUndefined(this.debtor.nombre) ) {
            isError = true;
        }
        if (this.debtor.domicilio == "" || isUndefined(this.debtor.domicilio) ) {
            isError = true;
        }
        if (this.debtor.superficie== "" || isUndefined(this.debtor.superficie) ) {
            isError = true;
        }
        if (isUndefined(this.debtor.totalDeuda) ) {
            isError = true;
        }
        if (isUndefined(this.debtor.telefono) ) {
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
