import {Component, Input, OnInit} from '@angular/core';
import {DebtService} from "../../services/debt.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {HistorialAbonosComponent} from "../historial-abonos/historial-abonos.component";
import {DeudorInfoComponent} from "../deudor-info/deudor-info.component";
import {ɵTestingCompiler} from "@angular/core/testing";
import {alertService} from "../../services/alert.service";

@Component({
    selector: 'app-liquidados',
    templateUrl: './liquidados.component.html',
    styleUrls: ['./liquidados.component.scss']
})
export class LiquidadosComponent implements OnInit {

    deudor: FirebaseListObservable<any[]>;
    deudas: Observable<any>;
    debtor: any[] = [];
    debtorTemp: any[] = [];
    showOp: boolean = false;

    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase,
                private debtorService: DebtService,
                private modalService: NgbModal,
                private alertService: alertService) {
    }

    ngOnInit() {

        this.deudor = this.debtorService.getLiquidados();
        this.deudas = this.deudor;

        this.deudas.subscribe((result) => {
            this.debtor = result;
            this.debtorTemp = result;
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

    openBondHistory(debtorKey: string) {
        this.showOp = true;
        const modalRef = this.modalService.open(HistorialAbonosComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "lg"
        });
        modalRef.componentInstance.debtorKey = debtorKey;
        modalRef.result.then(() => {
            this.showOp = false;
        })
    }

    openDeudorInfo(debtorKey: string) {
        this.showOp = true;
        const modalRef = this.modalService.open(DeudorInfoComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "lg"
        });
        modalRef.componentInstance.debtorKey = debtorKey;
        modalRef.result.then(() => {
            this.showOp = false;
        })
    }

    removeDeudor(debtorKey: string) {
        this.alertService.confirm('Borrar cliente', '¿Estás seguro que quieres borrarlo?')
            .then(() => {
                this.debtorService.removeDebtor(debtorKey);
            })
    }

}
