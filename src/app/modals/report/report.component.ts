import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    deudores:FirebaseListObservable<any[]>;
    deudor:any[]=[];
    length:any;
    deudorTemporal:any[]=[];

  constructor(private activeModal: NgbActiveModal,
              private db: AngularFireDatabase) { }

  ngOnInit() {
      this.deudores=this.db.list('deudores');
      this.deudores.subscribe((result:any)=>{
        for(let i = 0; i <= result.length - 1; i++){
            if(result[i].estado=="deuda"||result[i].estado =="Deuda"){
                this.deudorTemporal.push(result[i]);
            }
        }
      })
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
