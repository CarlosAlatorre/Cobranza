import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AgregarDeudorComponent} from "../../modals/agregar-deudor/agregar-deudor.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  enviarComentarioo(){

    console.log("hola mundo");
  }
  obtenerComentarios(){
    console.log("comentarios qwerty")
  }

  openModal(){
    this.modalService.open(AgregarDeudorComponent, {backdrop: 'static', keyboard: false, size: "lg"});
  }

}
