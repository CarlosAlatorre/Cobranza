import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AgregarDeudorComponent} from "../../modals/agregar-deudor/agregar-deudor.component";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {consoleTestResultHandler} from "tslint/lib/test";
import {ReportComponent} from "../../modals/report/report.component";
import {HistorialComponent} from "../../modals/historial/historial.component";
import {AgregarAbonoComponent} from "../../modals/agregar-abono/agregar-abono.component";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {EditarNombreComponent} from "../../modals/editar-nombre/editar-nombre.component";
import {AuthToChangeNameComponent} from "../../modals/auth-to-change-name/auth-to-change-name.component";
import {HistorialAbonosComponent} from "../../modals/historial-abonos/historial-abonos.component";
import {DateService} from "../../services/date.service";
import {TypeDate} from "../../enums/type-date.enum";
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {Debtor} from "../../interfaces/debtor";
import {LiquidadosComponent} from "../../modals/liquidados/liquidados.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    deudores: FirebaseListObservable<any[]>;
    deudor: any[] = [];
    deudorTemporal: any[] = [];
    totalDeudas: number = 0;
    totalAbonos: number = 0;
    totalNeto: number = 0;

    constructor(private db: AngularFireDatabase,
                private activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private af: AngularFireAuth,
                private router: Router) {
        //TODO: cambiar esto por un guard
        af.auth.onAuthStateChanged((user) => {
            if (!user) {
                this.router.navigate(['login'])
            }
        })
    }


    ngOnInit() {
        this.deudores = this.db.list('deudores');
        this.deudores.subscribe((result: any) => {
            this.deudorTemporal = [];
            this.deudor = [];
            this.totalDeudas = 0;
            this.totalAbonos = 0;
            this.totalNeto = 0;
            for (let i = 0; i <= result.length - 1; i++) {

                this.totalDeudas += result[i].totalDeuda;
                this.totalAbonos += result[i].totalAbono;

                if (result[i].estado.toLowerCase() == "deuda") {
                    this.deudorTemporal.push(result[i]);
                    this.deudor.push(result[i]);
                }
            }
            this.totalNeto = this.totalAbonos + this.totalDeudas;
        })

    }

    openHistory() {
        this.modalService.open(HistorialComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openAddMoney(keyDebt: string) {
        // this.modalService.open(AuthToChangeNameComponent, {
        //     backdrop: 'static',
        //     keyboard: false,
        //     size: "lg"
        // }).result.then(response => {
        //     if (response) {

        const modalRef = this.modalService.open(AgregarAbonoComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "lg"
        });
        modalRef.componentInstance.keyDebt = keyDebt;
        // }
        // })
    }

    openAddDebtor() {
        this.modalService.open(AgregarDeudorComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "lg"
        });
    }

    openEditName(deptorKey: string) {
        this.modalService.open(AuthToChangeNameComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "lg"
        }).result.then(response => {
            if (response) {
                const modalRef = this.modalService.open(EditarNombreComponent, {
                    backdrop: 'static',
                    keyboard: false,
                    size: "lg"
                });
                modalRef.componentInstance.debtorKey = deptorKey;
            }
        });
    }

    openBondHistory(debtorKey: string) {
        const modalRef = this.modalService.open(HistorialAbonosComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "lg"
        });
        modalRef.componentInstance.debtorKey = debtorKey;
    }

    // // buscador
    searchDebtor(terminoBusqueda: string) {
        if (!this.deudor) {
            this.deudorTemporal = []
        } else {
            this.deudorTemporal = this.deudor.filter(it => it.nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) >= 0);
        }
    }

    openReport() {
        // this.modalService.open(ReportComponent, {backdrop: 'static ', keyboard: false, size: "lg"});
        this.modalService.open(ReportComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openLiquidados() {
        this.modalService.open(LiquidadosComponent, {backdrop: 'static', keyboard: false, size: "lg"})
    }

    isExpired(expiration: string) {

        let numberExpiration: number = parseInt(expiration.replace(/-/g, ''));
        let currentDate: number = parseInt(DateService.getDateNumber().replace(/-/g, ''));

        return numberExpiration < currentDate;
    }

}
