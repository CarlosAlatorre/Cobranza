import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Debtor} from '../../interfaces/debtor'
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "../../services/alert.service";
import {isUndefined} from "util";
import {Plazos} from "../../enums/plazos.enum";
import {DebtService} from "../../services/debt.service";
import {DateService} from "../../services/date.service";
import {ancestorWhere} from "tslint";

@Component({
    selector: 'app-agregar-deudor',
    templateUrl: './agregar-deudor.component.html',
    styleUrls: ['./agregar-deudor.component.scss']
})
export class AgregarDeudorComponent {

    debtor: Debtor = {} as Debtor;
    fechaVencimiento: Date;
    plazoDePago: number = Plazos.semanal;
    Plazos: any = Plazos;
    anticipo: number;
    fijarAbonos: boolean = false;

    @ViewChild('abono') abono: ElementRef;

    constructor(private activeModal: NgbActiveModal,
                private db: AngularFireDatabase,
                private alertService: alertService,
                private debtorService: DebtService,
                private dateService: DateService) {
    }

    addDebtor() {
        const ref = this.db.list('deudores');

        if (!this.errorInFields()) {
            this.fillRemainingFields();

            this.debtorService.setDebt(this.debtor)
                .then((debtorKey: string) => {
                    this.debtorService.setBond(debtorKey, this.anticipo);
                })

            this.activeModal.dismiss();
        } else {
            this.alertService.error('Error en los campos', 'Verifique que todos los campos estén llenos')
        }
    }

    fillRemainingFields() {
        let vencimientoFinal: string = DateService.getDateFormat((new Date()).toString());
        this.debtor.tipoPlazos = this.plazoDePago;
        // Get the last expiration
        for (let i = 0; i < this.debtor.numeroPlazos; i++) {
            vencimientoFinal = DebtService.getNextExpiration(this.debtor.tipoPlazos, vencimientoFinal);
        }
        this.debtor.vencimiento = vencimientoFinal;
        this.debtor.fechaInicio = DateService.getDateFormat((new Date()).toString());
        this.debtor.estado = "Deuda";
        this.debtor.totalAbono = this.anticipo;
        this.debtor.totalDeuda = this.debtor.totalDeuda - this.anticipo;
        this.debtor.proximoVencimiento = DebtService.getNextExpiration(this.debtor.tipoPlazos, this.debtor.fechaInicio);
        // this.debtor.proximoPago = DebtService.getNextPay(this.debtor.numeroPlazos, this.debtor.totalDeuda);
        this.debtor.proximoPago = this.debtor.abonos;
        this.debtor.superficie = this.debtor.superficie + ' m2';
        this.printTicket(this.debtor.nombre, this.anticipo, this.debtor.totalDeuda + this.anticipo, this.debtor.totalDeuda, this.debtor.vencimiento, this.debtor.proximoVencimiento, this.debtor.proximoPago)
    }

    getNextPay(numeroPlazos: number, totalDeuda: number) {
        if (!this.fijarAbonos)
            this.debtor.abonos = ((totalDeuda ? totalDeuda : 0) - (this.anticipo ? this.anticipo : 0)) / (numeroPlazos ? numeroPlazos : 1);
    }

    focusToPayBond() {
        if (this.fijarAbonos)
            setTimeout(() => {
                this.abono.nativeElement.focus();
            }, 100)
    }

    errorInFields() {
        let isError: boolean = false;
        if (this.debtor.nombre == "" || isUndefined(this.debtor.nombre)) {
            isError = true;
        }
        if (this.debtor.domicilio == "" || isUndefined(this.debtor.domicilio)) {
            isError = true;
        }
        if (this.debtor.superficie == "" || isUndefined(this.debtor.superficie)) {
            isError = true;
        }
        if (isUndefined(this.debtor.numeroPlazos)) {
            isError = true;
        }
        if (isUndefined(this.debtor.totalDeuda)) {
            isError = true;
        }
        if (isUndefined(this.debtor.telefono)) {
            isError = true;
        }
        if (isUndefined(this.anticipo)) {
            isError = true;
        }
        return isError;
    }

    printTicket(nombreDeudor: string, abono: number, deuda: number, totalDeber: number, vencimiento: string, proximoVencimiento: string, proximoPago: number) {
        if (deuda == abono) {
            proximoVencimiento = "PAGADO";
            proximoPago = 0;
            totalDeber = 0;
        }
        let mywindow = window.open('', 'PRINT', 'height=450,width=300');

        mywindow.document.write('<html><head>');
        mywindow.document.write(` <style>
* {
  font-size: 12px;
  font-family: 'Times New Roman';
}

td,
th,
tr,
table {
  border-top: 1px solid black;
  border-collapse: collapse;
}

td.producto,
th.producto {
  width: 75px;
  max-width: 75px;
}

td.cantidad,
th.cantidad {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

td.precio,
th.precio {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centrado {
  text-align: center;
  align-content: center;
}

.ticket {
  width: 155px;
  max-width: 155px;
}

img {
  max-width: inherit;
  width: inherit;
}

@media print{
  .oculto-impresion, .oculto-impresion *{
    display: none !important;
  }
}</style>
</head><body >`);
        // language=HTML
        mywindow.document.write(`
            
 <div class="ticket">
    <img src="../../../assets/logos/CNC.png" style="    height: 50px;
    width: 50px;
    display: inline-block;" alt="">
    <img src="../../../assets/logos/INGLO.png" style="height: 50px;
    width: 100px;
    display: inline-block;
    margin-left: 2px;" alt="">
 
    <p class="centrado">TICKET DE ANTICIPO
    <br>
      <br>${nombreDeudor}
      <br>
      <!--Vencimiento final: ${vencimiento}</p>-->
      <br>
    <table>
      <thead>
        <tr>
          <th class="producto">DESCRIPCION</th>
          <th class="precio">$$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="producto">Deuda</td>
          <td class="precio">${deuda}</td>
        </tr>
        <tr>
          <td class="producto">Anticipo</td>
          <td class="precio">${abono}</td>
        </tr>
        <tr></tr>
        <tr>
          <td class="producto">Total a deber</td>
          <td class="precio">${totalDeber}</td>
        </tr>
      </tbody>
    </table>
    <br><br>
    <table>
    <thead>
        <tr>
          <th class="producto">Proximo pago</th>
          <th class="precio">$$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="producto">${proximoVencimiento}</td>
          <td class="precio">${proximoPago}</td>
        </tr>
      </tbody>
</table>
    <br><br>
    <p class="centrado">¡QUE TENGA BUEN DÍA!
      <br><br><br></p>
    <br>
    <br>
    <br>
    <br>
    <button class="oculto-impresion" onclick="imprimir()">Imprimir Ticket</button>
    <br>
    <br>
    <br>
    <br>
    .
     
  </div>
            
            <script type="text/javascript">
                function imprimir(){
                    window.print();
                    window.close();
                }
            </script>
`);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        // mywindow.print();
    }

    closeModal() {
        this.activeModal.dismiss();
    }


}
