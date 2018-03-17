import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { LayoutRouting } from "./layout.routing";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {ButtonsModule, Ng2BootstrapModule} from 'ngx-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTriggerComponent } from './header/navigation-trigger/navigation-trigger.component';
import {alertService} from "../services/alert.service";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase} from "angularfire2/database";
import {HomeComponent} from "../pages/home/home.component";
import {AgregarDeudorComponent} from "../modals/agregar-deudor/agregar-deudor.component";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HistorialComponent} from "../modals/historial/historial.component";
import {DebtService} from "../services/debt.service";
import {AgregarAbonoComponent} from "../modals/agregar-abono/agregar-abono.component";
import {ReportComponent} from "../modals/report/report.component";
import {ConfirmarAbonoComponent} from "../modals/confirmar-abono/confirmar-abono.component";
import {Select2Module} from "ng2-select2";
import {DateService} from "../services/date.service";
import {EditarNombreComponent} from "../modals/editar-nombre/editar-nombre.component";
import {DeudoresService} from "../services/deudores.service";
import {ValidationService} from "../services/validation.service";
import {AuthToChangeNameComponent} from "../modals/auth-to-change-name/auth-to-change-name.component";
import {AuthService} from "../services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {HistorialAbonosComponent} from "../modals/historial-abonos/historial-abonos.component";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
}

@NgModule ({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SearchComponent,
        NavigationComponent,
        NavigationTriggerComponent,
        HomeComponent,
        AgregarDeudorComponent,
        HistorialComponent,
        AgregarAbonoComponent,
        ReportComponent,
        ConfirmarAbonoComponent,
        EditarNombreComponent,
        AuthToChangeNameComponent,
        HistorialAbonosComponent
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        AngularFireModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        NgbModule.forRoot(),
        NgbModule,
        SharedModule
    ],
    providers: [
        alertService,
        AngularFireDatabase,
        NgbActiveModal,
        NgbModal,
        DebtService,
        DateService,
        DeudoresService,
        ValidationService,
        AuthService
    ],
    entryComponents:[
        HistorialComponent,
        ReportComponent,
        AgregarAbonoComponent,
        ConfirmarAbonoComponent,
        AgregarDeudorComponent,
        EditarNombreComponent,
        AuthToChangeNameComponent,
        HistorialAbonosComponent
    ]
})

export class LayoutModule {  }