import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterCocheraComponent } from './pages/register-cochera/register-cochera.component';
import { soloLogeadoGuard } from './guards/solo-logeado.guard';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { soloPublicoGuard } from './guards/solo-publico.guard';
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';

export const routes: Routes = [//rutas q agregamos
        //{//redireccion
    //    path: "",
    //    redirectTo: "login",
    //    pathMatch: "full"//full cuandp la url es exactamente eso, el otro (buscar)
    //},
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [soloPublicoGuard]
    },
    {
        path: "register",
        component:  RegisterCocheraComponent,
        canActivate: [soloPublicoGuard]
    },
    {
        path: "dashboard",
        component: DashboardContentComponent,
        canActivate: [soloLogeadoGuard],
        children: [
            {
                path: "estado-cocheras",
                component: EstadoCocherasComponent
            },
            {
                path: "reportes",
                component: ReportesComponent,
                canActivate: [soloAdminGuard]
            }
    ]
    },
    {
        path: "not-found",
        component:NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }//si es cualquier cosa te redirige al 404
];
