import {Component, Input, OnInit} from '@angular/core';
import {DebtService} from "../../services/debt.service";
import {DeudoresService} from "../../services/deudores.service";
import {Debtor} from "../../interfaces/debtor";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PrintService} from "../../services/print.service";
import {tick} from "@angular/core/testing";

@Component({
    selector: 'app-historial-abonos',
    templateUrl: './historial-abonos.component.html',
    styleUrls: ['./historial-abonos.component.scss']
})
export class HistorialAbonosComponent implements OnInit {

    @Input() debtorKey: string;
    bonds: any[] = [];
    debtor: Debtor = {
        nombre: null,
        domicilio: null,
        superficie: null,
        telefono: null,
        totalDeuda: null,
        vencimiento: null,
        fechaInicio: null,
        estado: null,
        totalAbono: null,
        tipoPlazos: null,
        numeroPlazos: null,
        proximoPago: null,
        proximoVencimiento: null,
        abonos: null,
    }

    constructor(private _debtorService: DebtService,
                private _debService: DeudoresService,
                private _activeModal:NgbActiveModal) {
    }

    ngOnInit() {

        this._debService.getDeptor(this.debtorKey)
            .then((response: Debtor) => {
                this.debtor = response;
            })

        this._debtorService.getBonds(this.debtorKey)
            .then((response: any[]) => {
                this.bonds = response;
            })
    }

    closeModal(){
        this._activeModal.close();
    }

    printTicket(ticket:any){
        PrintService.printPayment(ticket.nombreDeudor, ticket.abono, ticket.deuda, ticket.totalDeuda, ticket.vencimiento, ticket.proximoVencimiento, ticket.proximoPago, ticket.fechaActual);
    }

}
