import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Note} from "../interfaces/note";
import "rxjs/add/operator/toPromise";
import {DebugContext} from "@angular/core/src/view";

@Injectable()
export class NotesService {

    constructor(private db: AngularFireDatabase) {
    }

    addNote(debtorKey: string, note: Note) {
        this.db.list(`deudores/${debtorKey}/note`).push(note)
            .catch(err => {
                throw new Error(`Error al obtener la nota ${err}`);
            })
    }

    async getNote(debtorKey: string): Promise<any> {
        return new Promise(resolve => {
            this.db.object(`deudores/${debtorKey}/note`, {preserveSnapshot: true}).subscribe((snapshot: any) => {
                resolve(snapshot.val());
            })
        })
    }

    updateNote(debtorKey: string, note: Note) {
        this.db.object(`deudores/${debtorKey}`)
            .update({note: note})
            .catch(err => {
                throw new Error(`Error al actualizar la nota ${err}`);
            })
    }
}
