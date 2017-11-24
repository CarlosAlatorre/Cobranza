import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-confirmar-abono',
  templateUrl: './confirmar-abono.component.html',
  styleUrls: ['./confirmar-abono.component.scss']
})
export class ConfirmarAbonoComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.dismiss();
  }

}
