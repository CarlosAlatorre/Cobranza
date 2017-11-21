import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deudores:FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {

  }

  ngOnInit() {
      this.deudores=this.db.list('deudores');


      console.log(this.deudores)
  }

  enviarComentarioo(){

    console.log("hola mundo");
  }
  obtenerComentarios(){
    console.log("comentarios qwerty")
  }

}
