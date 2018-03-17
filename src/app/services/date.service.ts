import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

    constructor() {
    }

    static getNextWeek(previusDate: string) {
        let date: Date = new Date(previusDate);
        date.setDate(date.getDate() + 7);
        return date.toDateString();
    }

    static getNextMonth(previusDate: string) {
        let date: Date = new Date(previusDate);
        date.setMonth(date.getMonth() + 1);
        return date.toDateString();
    }

    static getNextFortnight(previusDate: string) {
        let date: Date = new Date(previusDate);
        date.setDate(date.getDate() + 15);
        return date.toDateString();
    }

    static getDateFormat(date: string) {
        let dateInNumbers = this.getDateFormatWithOnlyNumbers(date);
        return dateInNumbers.substr(0, 4) + '-' + dateInNumbers.substr(4, 2) + '-' + dateInNumbers.substr(6, 2);
    }

    static getDateFormatWithOnlyNumbers(dateInString: string) {
        let date: Date = new Date(dateInString);

        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + (date.getUTCDate())).slice(-2);
        let year = date.getUTCFullYear();
        return (year + '' + month + '' + day);
    }

    static getDateNumber(): string {
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString() + '-';
        dateNumber += ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-';
        dateNumber += ("0" + (date.getDate().toString())).slice(-2);

        return dateNumber;
    }
}
