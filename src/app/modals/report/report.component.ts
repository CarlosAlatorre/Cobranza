import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import * as jsPDF from 'jspdf';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    deudores:FirebaseListObservable<any[]>;
    deudor:any[]=[];
    length:any;
    date:any = new Date();
    deudorTemporal:any[]=[];
    arrayDeudores:any[]=[];

  constructor(private activeModal: NgbActiveModal,
              private db: AngularFireDatabase) { }
    options:any = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        useBom: true
    };

  encabezado:any ={
      Nombre:'Nombre',
      Deuda:'Deuda',
      Vencimiento:'Vencimiento',
      Direccion:'Direccion',
      Superficie:'Superficie'
  }



  ngOnInit() {
      this.deudores=this.db.list('deudores');
      this.deudores.subscribe((result:any)=>{
          this.arrayDeudores.push(this.encabezado);
        for(let i = 0; i <= result.length - 1; i++){
            if(result[i].estado=="deuda"||result[i].estado =="Deuda"){
                this.deudorTemporal.push(result[i]);

                this.arrayDeudores.push({
                    nombre: result[i].nombre,
                    totalDeuda: "$" +  result[i].totalDeuda,
                    vencimiento: result[i].vencimiento,
                    direccion: result[i].domicilio,
                    superficie: result[i].superficie});
            }

        }
      })
  }

    generarCsv(){
        new Angular2Csv(this.arrayDeudores,"Reporte del dia "+(this.date.getUTCDate()-1)+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear())
    }


    closeModal() {
        this.activeModal.dismiss();
    }

    generatePDF(){
        const elementToPrint = document.getElementById('tablaHistorial'); //The html element to become a pdf
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML(elementToPrint, () => {
            pdf.save('Prueba.pdf');
        });
    }
}
