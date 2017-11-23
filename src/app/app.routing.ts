import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";

const ROUTES: Routes = [

    { path: '', loadChildren: './layout/layout.module#LayoutModule' },
    { path: 'login', component: LoginComponent }

];

export const routing = RouterModule.forRoot(ROUTES);

