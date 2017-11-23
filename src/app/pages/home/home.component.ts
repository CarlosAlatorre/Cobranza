import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {consoleTestResultHandler} from "tslint/lib/test";
import {ReportComponent} from "../../modals/report/report.component";
import {HistorialComponent} from "../../modals/historial/historial.component";
import {AgregarAbonoComponent} from "../../modals/agregar-abono/agregar-abono.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deudores:FirebaseListObservable<any[]>;
  deudor:any[]=[];
  deudorTemporal:any[]=[];
  debtor:any[]=[];
  debtorTemp:any[]=[];
  deudasLength:any[]=[];
totalDeudas:number=0;
totalAbonos:number=0;
totalNeto:number=0;

  constructor(private db: AngularFireDatabase,
              private activeModal:NgbActiveModal,
              private modalService:NgbModal){
  }



  ngOnInit(){
      this.deudores=this.db.list('deudores');
      this.deudores.subscribe((result:any)=>{
      this.deudor=result;
          for(let i = 0; i <= result.length - 1; i++){

              this.totalDeudas += result[i].totalDeuda;
              this.totalAbonos += result[i].totalAbono;

              if(result[i].estado=="deuda"||result[i].estado =="Deuda"){
                  this.deudorTemporal.push(result[i]);
              }
          }
          this.totalNeto=this.totalAbonos + this.totalAbonos;
      })

  }

  openHistory(){
      this.modalService.open(HistorialComponent,{backdrop: 'static', keyboard: false, size: "lg"} );
  }
  
  openAddMoney(keyDebt:string){
      const modalRef = this.modalService.open(AgregarAbonoComponent, {backdrop: 'static', keyboard: false, size: "lg"} )
      modalRef.componentInstance.keyDebt = keyDebt;
  }
  // // buscador
    searchDebtor(terminoBusqueda:string){
        if (!this.deudor) {
            this.deudorTemporal= []
        }else {
            this.deudorTemporal = this.deudor.filter(it => it.nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) >= 0);
        }
    }
    openReport() {
        // this.modalService.open(ReportComponent, {backdrop: 'static ', keyboard: false, size: "lg"});
        this.modalService.open(ReportComponent, {backdrop:'static', keyboard: false, size: "lg"});
    }
}
