import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import * as jsPDF from 'jspdf';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {DebtService} from "../../services/debt.service";
import {ancestorWhere} from "tslint";
import {ValidationService} from "../../services/validation.service";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    deudores: FirebaseListObservable<any[]>;
    deudor: any[] = [];
    length: any;
    date: any = new Date();
    deudorTemporal: any[] = [];
    arrayDeudores: any[] = [];
    abonosDeudores: any[] = [];

    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase,
                private _debtorService: DebtService) {
        this._debtorService.getAllBonds()
            .then((response: any[]) => {
                this.abonosDeudores = response;
            })
    }

    options: any = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        useBom: true
    };

    encabezado: any = {
        Nombre: 'Nombre',
        Direccion: 'Direccion',
        Superficie: 'Superficie',
        Estado: 'Estado',
        Deuda: 'Deuda',
        Mensualidad: 'Mensualidad',
        FechaUltimoPago: 'Fecha Ultimo Pago',
        ProximoPago: 'Proximo Pago',
        FechaPago: 'Fecha de Pago'

    }

    ngOnInit() {
        this.deudores = this.db.list('deudores');
        this.deudores.subscribe((result: any) => {
            this.arrayDeudores.push(this.encabezado);
            for (let i = 0; i <= result.length - 1; i++) {
                if (result[i].estado == "deuda" || result[i].estado == "Deuda") {

                    this.deudorTemporal.push(result[i]);

                    this._debtorService.getBonds(result[i].$key)
                        .then((bonds: any[]) => {
                            let mensualidades:number = 0;
                            let fechaUltimoPago:string = '';

                            if(bonds.length > 0){
                                mensualidades = result[i].abonos;
                                fechaUltimoPago = bonds[bonds.length-1].fechaAbono;
                            }
                            this.arrayDeudores.push(
                                {
                                    nombre: result[i].nombre,
                                    direccion: result[i].domicilio,
                                    superficie: result[i].superficie,
                                    estado: 'Deuda',
                                    totalDeuda: "$" + result[i].totalDeuda,
                                    mensualidad: "$" + mensualidades,
                                    fechaUltimoPago: fechaUltimoPago,
                                    ProximoPago: "$" + result[i].proximoPago,
                                    FechaPago: result[i].proximoVencimiento
                                });
                        })
                    console.log(this.arrayDeudores);
                }
            }
        })
    }

    generarCsv() {
        new Angular2Csv(this.arrayDeudores, "Reporte del dia " + (this.date.getUTCDate()) + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear())
    }


    closeModal() {
        this.activeModal.dismiss();
    }

    generatePDF() {
        const elementToPrint = document.getElementById('tablaHistorial'); //The html element to become a pdf
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML(elementToPrint, () => {
            pdf.save('Prueba.pdf');
        });
    }
}
