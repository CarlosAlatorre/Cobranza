import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Debtor} from "../interfaces/debtor";
import {DateService} from "./date.service";
import {Plazos} from "../enums/plazos.enum";

@Injectable()
export class DebtService {

    constructor(private db: AngularFireDatabase) {
    }

    getDebtors() {
        return this.db.list('deudores');
    }

    getDebtorByKey(key: string) {
        return this.db.object('deudores/' + key);
    }

    updateDebt(key: string, totalDeuda: number, abono: number, proximoVencimiento: string) {
        if (totalDeuda == 0) {
            this.db.list('deudores/')
                .update(key, {
                    estado: 'Pagado'
                })
        }
        this.db.list('deudores/')
            .update(key, {
                totalDeuda: totalDeuda,
                totalAbono: abono,
                proximoVencimiento: proximoVencimiento
            })
    }

    updateDebtToPayOffDept(key: string, totalDeuda: number, totalAbono: number) {
        totalAbono = totalDeuda + totalAbono;
        this.db.list('deudores/')
            .update(key, {
                totalDeuda: 0,
                totalAbono: totalAbono,
                estado: 'Pagado'
            })
    }

    setDebt(deptor: Debtor): Promise<string> {
        return new Promise(resolve => {
            let debtorKey: string = this.db.list('deudores').push(deptor).key;
            resolve(debtorKey);
        })
    }

    setBond(debtorKey: string, bond: number) {
        this.db.list('abonos/' + debtorKey).push({
            fechaAbono: DateService.getDateNumber(),
            abono: bond
        })
    }

    getBonds(debtorKey:string): Promise<any>{
        return new Promise(resolve => {
            this.db.list('abonos/'+debtorKey)
                .subscribe((snapshot:any[])=>{
                    resolve(snapshot);
                })
        })
    }

    static getNextPay(numberTerms: number, totalDebt: number) {
        return totalDebt / numberTerms;
    }

    static getNextExpiration(typeTerm: number, initialDate: string) {

        let nextExpiration: string;

        switch (typeTerm) {
            case Plazos.semanal:
                nextExpiration = DateService.getNextWeek(initialDate);
                break;

            case Plazos.quincenal:
                nextExpiration = DateService.getNextFortnight(initialDate);
                break;

            default:
                nextExpiration = DateService.getNextMonth(initialDate);
                break;
        }

        return DateService.getDateFormat(nextExpiration);
    }


}
