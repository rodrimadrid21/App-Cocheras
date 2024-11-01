// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { soloLogeadoGuard } from './guards/solo-publico.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',  // Redirigir a login por defecto
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent, //toma por defecto q esta en publico
    },
    {
        path: '',
        component: DashboardContentComponent,
        canActivate: [soloLogeadoGuard],  // Solo usuarios logueados
        children: [
            {
                path: 'estado-cocheras',
                component: EstadoCocherasComponent
            },
            {
                path: 'reportes',
                component: ReportesComponent

            },
            {
                path: 'precios',
                component: PreciosComponent
            }
        ]
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**',  // Cualquier ruta no definida
        redirectTo: 'not-found',  // Redirigir a la página 404
        pathMatch: 'full'
    }
];
