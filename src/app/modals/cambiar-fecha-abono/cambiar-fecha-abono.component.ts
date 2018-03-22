import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DateService} from "../../services/date.service";

@Component({
    selector: 'app-cambiar-fecha-abono',
    templateUrl: './cambiar-fecha-abono.component.html',
    styleUrls: ['./cambiar-fecha-abono.component.scss']
})
export class CambiarFechaAbonoComponent implements OnInit {

    newDate:Date = new Date();
    @Input() previusDate:string;

    constructor(private _activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    closeModal(){
        this._activeModal.close(false)
    }

    saveDate(){
        let date = DateService.getDateFormat(this.newDate.toString() + ' 00:00');
        debugger
        this._activeModal.close(date)
    }

}
