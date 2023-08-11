import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { AuxiliosComponent } from './auxilios/auxilios.component';
import { CartaLaboralComponent } from './cartaLaboral/cartaLaboral.component';
import { CesantiasComponent } from './cesantias/cesantias.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';

const routes: Routes = [
    {
        path:'auxilios',
        component: AuxiliosComponent
    },
    {
        path:'cartaLaboral',
        component: CartaLaboralComponent
    },
    {
        path:'cesantias',
        component: CesantiasComponent
    },
    {
        path:'licencias',
        component: LicenciasComponent
    },
    {
        path:'permisos',
        component: PermisosComponent
    },
    {
        path:'prestamos',
        component:PrestamoComponent
    },
    {
        path:'vacaciones',
        component: VacacionesComponent
    }
];
@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SolicitudesRoutingModule {}
