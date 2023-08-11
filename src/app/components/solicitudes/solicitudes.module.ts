import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ImageModule } from 'primeng/image';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuxiliosComponent } from './auxilios/auxilios.component';
import { CartaLaboralComponent } from './cartaLaboral/cartaLaboral.component';
import { CesantiasComponent } from './cesantias/cesantias.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';

@NgModule({
  declarations: [
    AuxiliosComponent,
    CartaLaboralComponent,
    CesantiasComponent,
    LicenciasComponent,
    PermisosComponent,
    PrestamoComponent,
    VacacionesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ImageModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    SolicitudesRoutingModule,
    DatePipe

  ],

  providers: [ 
    Validators, 
],
})
export class SolicitudesModule { }