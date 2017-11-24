import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DebtService} from "../../services/debt.service";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";



import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

    deudor: FirebaseListObservable<any[]>;
    deudas: Observable<any>;
    debtor:any[]=[];
    debtorTemp:any[]=[];

    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase,
                private debtorService: DebtService) {


    }

    ngOnInit() {

        this.deudor = this.debtorService.getDebtors();
        this.deudas = this.deudor;

        this.deudas.subscribe((result) => {
            this.debtor = result;
            this.debtorTemp =result;
        })
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    searchDebt(nombre: string) {
        if (!this.debtor) {
            this.debtorTemp = []
        } else {
            this.debtorTemp = this.debtor.filter(it => it.nombre.toLowerCase().indexOf(nombre.toLowerCase()) >= 0);
        }
    }

}
