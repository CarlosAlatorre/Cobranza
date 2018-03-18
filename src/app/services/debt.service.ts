import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Debtor} from "../interfaces/debtor";
import {DateService} from "./date.service";
import {Plazos} from "../enums/plazos.enum";
import {DateDiff} from "./date-diff.service";

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

    getBonds(debtorKey: string): Promise<any[]> {
        return new Promise(resolve => {
            this.db.list('abonos/' + debtorKey)
                .subscribe((snapshot: any[]) => {
                    resolve(snapshot);
                })
        })
    }

    getAllBonds(): Promise<any[]> {
        return new Promise(resolve => {
            this.db.list('abonos')
                .subscribe((snapshot: any[]) => {
                    resolve(snapshot);
                })
        })
    }

    static getNextPay(expiration: string, currentDebt: number, typeOfPay: number): number {
        let currentDate: Date = new Date(DateService.getDateFormat((new Date()).toString()));
        let numberPayments: number = 1;

        switch (typeOfPay) {
            case Plazos.semanal:
                numberPayments = DateDiff.inWeeks(currentDate, new Date(expiration));
                break;

            case Plazos.quincenal:
                numberPayments = DateDiff.inFortnight(currentDate, new Date(expiration));
                break;

            case Plazos.mensual:
                numberPayments = DateDiff.inMonths(currentDate, new Date(expiration));
                break;
        }
        return currentDebt / numberPayments;
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
        debugger
        return DateService.getDateFormat(nextExpiration);
    }

    static isNextExpiration(DateForNextPay: string): boolean {
        let currentDate = new Date(DateService.getDateFormat((new Date()).toString()));
        let DateNextPay = new Date(DateForNextPay + ' 00:00');

        let timeForExpiration = DateDiff.inDays(currentDate, DateNextPay);

        return timeForExpiration < 0;
    }

}
