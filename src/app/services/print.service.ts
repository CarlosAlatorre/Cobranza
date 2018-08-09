import {Injectable} from '@angular/core';

@Injectable()
export class PrintService {

    constructor() {
    }

    static printPayment(nombreDeudor: string, abono: number, deuda: number, totalDeber: number, vencimiento: string, proximoVencimiento: string, proximoPago: number, currentDate: string) {
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
 
    <p class="centrado">TICKET DE ABONO
    <br>
      <br>${nombreDeudor}
      <br>
      <p align="center">${ currentDate }</p>
      <!--<br>-->
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
          <td class="precio">${proximoPago.toFixed(2)}</td>
        </tr>
      </tbody>
</table>
    <br><br>
    <p class="centrado">¡QUE TENGA BUEN DÍA!
      <br><br><br></p>
    <br>
    <!--<br>-->
    <!--<br>-->
    <!--<br>-->
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
