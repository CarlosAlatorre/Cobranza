import { Component, OnInit,Input } from '@angular/core';
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
  Debtor:Observable<any>;
  userTemp:any;
  confirmDeposit:boolean=false;
  abonoAcumulado:number;

  constructor(private activeModal:NgbActiveModal,
              private debtService:DebtService,
              private modalService:NgbModal,
              private alertService:alertService) { }

  ngOnInit() {
    // mandando a llamar al servicio con la llave para que me traega la informacion
    this.Debtor=this.debtService.getDebtorByKey(this.keyDebt);
    this.Debtor.subscribe((result)=>{
        this.userTemp = result;
        console.log("abono actual: ",this.userTemp.totalAbono);
    })

  }

  closeModal(){
    this.activeModal.dismiss();
  }

  agregarAbono(cantidad:number){
      let totalDeudaNeta:number = this.userTemp.totalDeuda;
      this.debtService.updateDebt(this.keyDebt,totalDeudaNeta-cantidad, this.abonoAcumulado);

  }

  confirmarAbono(abono:number){

    this.abonoAcumulado = this.userTemp.totalAbono + parseInt(abono);
    console.log("Abono acumulado: ",this.abonoAcumulado);
    this.alertService.confirm("¿Desea confirmar transacción?","").then((response)=>{
      this.agregarAbono(abono);
        this.alertService.success("Abono agregado","");
        this.closeModal();
    }).catch((reject)=>{

    })
  }

}
