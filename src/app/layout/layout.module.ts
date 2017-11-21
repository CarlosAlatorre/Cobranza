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
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HistorialComponent} from "../modals/historial/historial.component";

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
        HistorialComponent
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        AngularFireModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        NgbModule.forRoot(),
        NgbModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    providers: [
        alertService,
        AngularFireDatabase
    ],
    entryComponents: [
        HistorialComponent
    ]
})

export class LayoutModule {  }