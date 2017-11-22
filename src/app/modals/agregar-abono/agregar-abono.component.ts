import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DebtService} from "../../services/debt.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-agregar-abono',
  templateUrl: './agregar-abono.component.html',
  styleUrls: ['./agregar-abono.component.scss']
})
export class AgregarAbonoComponent implements OnInit {
  @Input() keyDebt;
  Debtor:Observable<any>;
  userTemp:any;
  constructor(private activeModal:NgbActiveModal,
              private debtService:DebtService) { }

  ngOnInit() {
    // mandando a llamar al servicio con la llave para que me traega la informacion
    this.Debtor=this.debtService.getDebtorByKey(this.keyDebt);
    this.Debtor.subscribe((result)=>{
        this.userTemp = result;
    })

  }

  closeModal(){
    this.activeModal.dismiss();
  }

}
