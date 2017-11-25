import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DebtService} from "../../services/debt.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs/Observable";
import {ConfirmarAbonoComponent} from "../confirmar-abono/confirmar-abono.component";
import {alertService} from "../../services/alert.service";


@Component({
    selector: 'app-agregar-abono',
    templateUrl: './agregar-abono.component.html',
    styleUrls: ['./agregar-abono.component.scss']
})
export class AgregarAbonoComponent implements OnInit {
    @Input() keyDebt;
    Debtor: Observable<any>;
    userTemp: any;
    confirmDeposit: boolean = false;
    abonoAcumulado: number;

    constructor(private activeModal: NgbActiveModal,
                private debtService: DebtService,
                private modalService: NgbModal,
                private alertService: alertService) {
    }

    ngOnInit() {
        // mandando a llamar al servicio con la llave para que me traega la informacion
        this.Debtor = this.debtService.getDebtorByKey(this.keyDebt);
        this.Debtor.subscribe((result) => {
            this.userTemp = result;
            console.log("abono actual: ", this.userTemp.totalAbono);
        })

    }

    closeModal() {
        this.activeModal.close();
    }

    agregarAbono(cantidad: number) {
        let totalDeudaNeta: number = this.userTemp.totalDeuda;
        this.debtService.updateDebt(this.keyDebt, totalDeudaNeta - cantidad, this.abonoAcumulado);

    }

    confirmarAbono(abono: string) {
        if (abono == "" || abono == "0") {
            this.alertService.error('No has ingresado una cantidad o la cantidad debe ser mayor a cero', '')
        } else {
            let deposit = parseInt(abono);
            this.abonoAcumulado = this.userTemp.totalAbono + deposit;

            if (this.userTemp.totalDeuda < deposit) {
                this.alertService.error('La cantidad ingresada es mayor a la deuda', '');
            } else {
                this.alertService.confirm("¿Desea confirmar transacción?", "").then((response) => {
                    this.printTicket(this.userTemp.nombre, deposit, this.userTemp.totalDeuda, this.userTemp.totalDeuda - deposit, this.userTemp.vencimiento);
                    this.agregarAbono(deposit);
                    this.alertService.success("Abono agregado", "");
                    this.closeModal();
                }).catch((reject) => {

                })
            }
        }
    }

    payOffDebt() {
        this.printTicket(this.userTemp.nombre, this.userTemp.totalDeuda, this.userTemp.totalDeuda, 0, this.userTemp.vencimiento);
        this.debtService.updateDebtToPayOffDept(this.keyDebt, this.userTemp.totalDeuda, this.userTemp.totalAbono);
        this.alertService.success("Deuda pagada", "");
        this.activeModal.close();
    }

    printTicket(nombreDeudor:string, abono:number, deuda:number, totalDeber:number, vencimiento:string) {
        let saludo = "hola jjaja"
        let mywindow = window.open('', 'PRINT', 'height=430,width=300');

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
    <p class="centrado">TICKET DE ABONO
    <br>
      <br>${nombreDeudor}
      <br>Vencimiento: ${vencimiento}</p>
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
          <td class="producto">Abono</td>
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
    <p class="centrado">¡QUE TENGA BUEN DÍA!
      <br><br><br>Tecnologías Intech</p>
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

}
