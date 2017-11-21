import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Debtor} from '../../interfaces/debtor'
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'app-agregar-deudor',
    templateUrl: './agregar-deudor.component.html',
    styleUrls: ['./agregar-deudor.component.scss']
})
export class AgregarDeudorComponent {

    deptor:Debtor = {} as any;


    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase) {
    }

    addDebtor(){
        //TODO validar que deptor no contenga nada nullo o vacío
        const ref = this.db.list('deudores');
        ref.push(this.deptor);
        this.activeModal.dismiss();
    }

    closeModal(){
        this.activeModal.dismiss();
    }
}
