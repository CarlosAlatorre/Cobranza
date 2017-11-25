import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DebtService {

    constructor(private db: AngularFireDatabase) {
    }

    getDebtors() {
        return this.db.list('deudores');
    }

    getDebtorByKey(key:string) {
        return this.db.object('deudores/'+key);
    }

    updateDebt(key:string,totalDeuda:number,abono:number){
        this.db.list('deudores/').update(key,{
            totalDeuda:totalDeuda,
            totalAbono:abono
        })


    }

    updateDebtToPayOffDept(key:string, totalDeuda:number, totalAbono:number){
        totalAbono = totalDeuda + totalAbono;
        this.db.list('deudores/')
            .update(key, {
                totalDeuda:0,
                totalAbono: totalAbono,
                estado:'Pagado'
            })
    }

}
