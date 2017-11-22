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
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HistorialComponent} from "../modals/historial/historial.component";
import {DebtService} from "../services/debt.service";
import {AgregarAbonoComponent} from "../modals/agregar-abono/agregar-abono.component";

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
        HistorialComponent,
        AgregarAbonoComponent
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
        NgbModule
    ],
    providers: [
        alertService,
        AngularFireDatabase,
        NgbActiveModal,
        NgbModal,
        DebtService
    ],
    entryComponents:[
        HistorialComponent,
        AgregarAbonoComponent
    ]
})

export class LayoutModule {  }