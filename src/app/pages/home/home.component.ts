import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  enviarComentarioo(){

    console.log("hola mundo");
  }
  obtenerComentarios(){
    console.log("comentarios qwerty")
  }

  openModal(){

  }

}
