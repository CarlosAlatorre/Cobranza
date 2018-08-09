import {Component, Input, OnInit} from '@angular/core';
import {DeudoresService} from "../../services/deudores.service";
import {alertService} from "../../services/alert.service";
import {DebtService} from "../../services/debt.service";
import {Debtor} from "../../interfaces/debtor";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {isUndefined} from "util";

@Component({
    selector: 'app-deudor-info',
    templateUrl: './deudor-info.component.html',
    styleUrls: ['./deudor-info.component.scss']
})
export class DeudorInfoComponent implements OnInit {
    @Input() debtorKey;
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
        numeroDeudor: null
    };

    constructor(private _deudoresService: DeudoresService,
                private _alertService: alertService,
                private _modalRef: NgbActiveModal,
                private _debService: DebtService) {

    }

    ngOnInit() {
        this._deudoresService.getDeptor(this.debtorKey)
            .then((response: Debtor) => {
                this.debtor = response;
            });
    }

    updateDebtor() {
        if (!this.errorInField()) {
            this._debService.updateDebtor(this.debtor, this.debtorKey);
            this.showSuccess();
            this.closeModal();
        }
    }

    showSuccess() {
        this._alertService.success('Deudor editado correctamente', '');
    }

    errorInField() {
        let isError: boolean = false;

        if (this.debtor.nombre == "" || isUndefined(this.debtor.nombre)) isError = true;
        if (this.debtor.domicilio == "" || isUndefined(this.debtor.domicilio)) isError = true;
        if (this.debtor.superficie == "" || isUndefined(this.debtor.superficie)) isError = true;
        if (isUndefined(this.debtor.telefono)) isError = true;

        return isError;
    }

    closeModal() {
        this._modalRef.close();
    }
}
