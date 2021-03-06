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

    getLiquidados() {
        return this.db.list('deudores', {
            query: {
                orderByChild: 'estado',
                equalTo: 'Pagado'
            }
        })
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

    updateDebtor(debtor: Debtor, debtorKey: string) {
        this.db.object('deudores/' + debtorKey).update(debtor);
    }

    removeDebtor(debtorKey: string) {
        this.db.object(`deudores/${debtorKey}`).remove();
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
            // Obtenemos el numero de deudor para despues darle una clave al deudor
            const sub = this.db.object('numeroDeudor').subscribe((response: any) => {
                let numeroDeudor = response.numeroDeudor + 1;
                deptor.numeroDeudor = numeroDeudor;
                this.db.object('numeroDeudor').update({numeroDeudor: numeroDeudor});
                let debtorKey: string = this.db.list('deudores').push(deptor).key;
                sub.unsubscribe();
                resolve(debtorKey);
            })
        })
    }

    setBond(debtorKey: string, bond: number) {
        return this.db.list('abonos/' + debtorKey).push({
            fechaAbono: DateService.getDateNumber(),
            abono: bond
        }).key
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
        return DateService.getDateFormat(nextExpiration);
    }

    static isNextExpiration(DateForNextPay: string): boolean {
        let currentDate = new Date(DateService.getDateFormat((new Date()).toString()));
        let DateNextPay = new Date(DateForNextPay + ' 00:00');

        let timeForExpiration = DateDiff.inDays(currentDate, DateNextPay);

        return timeForExpiration < 0;
    }

    saveTicket(nombreDeudor: string, abono: number, deuda: number, totalDeber: number, vencimiento: string,
               proximoVencimiento: string, proximoPago: number, currentDate: string, debtorKey: string, bondKey: string) {

        this.db.list('abonos/' + debtorKey + '/' + bondKey).set('ticket', {
            nombreDeudor: nombreDeudor,
            abono: abono,
            deuda: deuda,
            totalDeuda: totalDeber,
            vencimiento: vencimiento,
            proximoVencimiento: proximoVencimiento,
            proximoPago: proximoPago,
            fechaActual: currentDate
        })

    }

}
