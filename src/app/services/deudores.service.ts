import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Debtor} from "../interfaces/debtor";

@Injectable()
export class DeudoresService {

    constructor(private _db: AngularFireDatabase) {
    }

    updateName(deptorKey: string, newName: string) {
        this._db.object('deudores/' + deptorKey)
            .update({
                nombre: newName
            })
    }

    getDeptor(deptorKey: string) {
        return new Promise(resolve => {
            this._db.object('deudores/' + deptorKey).subscribe((snapshot:Debtor)=>{
                resolve(snapshot);
            })
        })
    }

}
