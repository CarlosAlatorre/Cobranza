import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {consoleTestResultHandler} from "tslint/lib/test";
import {HistorialComponent} from "../../modals/historial/historial.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deudores:FirebaseListObservable<any[]>;
  deudor:any[]=[];
  deudorTemporal:any[]=[];

  constructor(private db: AngularFireDatabase,
              private activeModal:NgbActiveModal,
              private modalService:NgbModal) {


  }



  ngOnInit() {
      this.deudores=this.db.list('deudores');
      this.deudores.subscribe(result=>{
        this.deudorTemporal=result;
        this.deudor=result;
      })
  }
    

  getNameToSearch(terminoBusqueda: string){
    console.log(terminoBusqueda);
  }

  openHistory(){
    this.modalService.open(HistorialComponent,{backdrop: 'static', keyboard: false, size: "lg"} );
  }

  // // buscador
  searchDebtor(terminoBusqueda:string){
    if (!this.deudor) {
      this.deudorTemporal= []
    }else {
        this.deudorTemporal = this.deudor.filter(it => it.nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) >= 0);
    }
  }

}
