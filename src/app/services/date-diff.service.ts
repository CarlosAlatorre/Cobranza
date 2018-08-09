import {Injectable} from '@angular/core';

@Injectable()
export class DateDiff {

    constructor() {
    }

    static inDays(d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000);
    }

    static inWeeks(d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000 * 7);
    }

    static inFortnight(d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000 * 15);
    }

    static inMonths(d1, d2) {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    }

    static inYears(d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }

}
