import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DeudoresService} from "../../services/deudores.service";
import {Debtor} from "../../interfaces/debtor";
import {ValidationService} from "../../services/validation.service";
import {alertService} from "../../services/alert.service";
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-editar-nombre',
    templateUrl: './editar-nombre.component.html',
    styleUrls: ['./editar-nombre.component.scss']
})
export class EditarNombreComponent implements OnInit {

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
        proximoVencimiento: null
    };

    @ViewChild('newName') newName:ElementRef;

    constructor(private _deudoresService: DeudoresService,
                private _alertService: alertService,
                private _modalRef: NgbActiveModal) {

    }

    ngOnInit() {
        this._deudoresService.getDeptor(this.debtorKey)
            .then((response: Debtor) => {
                this.debtor = response;
                this.newName.nativeElement.focus();
            });
    }

    updateName(newName: string) {
        if (this.errorInField(newName)) {
            this._deudoresService.updateName(this.debtorKey, newName);
            this.showSuccess();
            this.closeModal();
        }
    }

    showSuccess(){
        this._alertService.success('Nombre editado correctamente', '');
    }

    errorInField(newName: string) {
        if (ValidationService.errorInField(newName)) {
            this._alertService.error('Error tiene que ingresar un nuevo nombre', '');
            return false
        } else {
            return true;
        }
    }

    closeModal() {
        this._modalRef.close();
    }
}

