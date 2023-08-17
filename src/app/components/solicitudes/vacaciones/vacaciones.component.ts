import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosSesionModel } from 'src/app/models/datos-sesion.model';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { vacacionesModel } from 'src/app/models/vacaciones.model';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})

export class VacacionesComponent implements OnInit {

  formularioVacaciones !: FormGroup;

  dataSesion : DatosSesionModel | null = null;
  idUser !: string;
  usuario !: string;
  nombreUser !: string;
  cedulaUser !: string;
  ciudad !: string;
  sucursal !: string;
  cargo !: string;
  diferenciaDias !: number;
  compensado !: boolean;

  constructor (
    private formBuild: FormBuilder,
    private sessionStorage: SessionStorageService,
    private seguridadService : SeguridadService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.getDataUser();

    this.formularioVacaciones = this.formBuild.group({
      fechaSolicitud: ['', Validators.required],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      ciudad: ['', Validators.required],
      sucursal: ['', Validators.required],
      cargo: ['', Validators.required],
      periodo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTerminacion: ['', Validators.required],
      fechaReintegro: ['', Validators.required],
      diaSolicitados: ['', Validators.required],
      opcionCompensar: ['', Validators.required],
      diasRemunerados: ['', Validators.required],
      diasCompensados: ['', Validators.required],
      autorizaJefe: ['', Validators.required]

    });

    // Suscripción al cambio de fecha de terminación
    this.formularioVacaciones.controls['fechaTerminacion'].valueChanges.subscribe((fechaTerminacion: Date) => {
      if (fechaTerminacion) {
        const fechaFinal = new Date(fechaTerminacion);
        
        const fechaReintegracion = new Date(fechaTerminacion);
        // Sumar un día a la fecha de reintegración
        fechaReintegracion.setDate(fechaReintegracion.getDate() + 2);

        this.formularioVacaciones.controls['fechaReintegro'].setValue(this.datePipe.transform(fechaReintegracion, 'yyyy-MM-dd'));

        const fechaInicio =  new Date (this.formularioVacaciones.controls['fechaInicio'].value);
        const diferenciaEnMilisegundos = fechaFinal.getTime() - fechaInicio.getTime();
        this.diferenciaDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
        this.formularioVacaciones.controls['diaSolicitados'].setValue(this.diferenciaDias);

        this.formularioVacaciones.controls['diasCompensados'].setValue( 15 - this.diferenciaDias);
        this.formularioVacaciones.controls['diasRemunerados'].setValue( 15 - this.diferenciaDias);
      }
    });
  }
  
  getDataUser() {
    this.dataSesion = this.sessionStorage.ObtenerSesionInfo();
    if (this.dataSesion) {
      this.idUser = this.dataSesion.datos.id;
      this.usuario = this.dataSesion.datos.nombre;
      // console.log(this.idUser); 
      this.cargarInfoUser();
    }
  }

  cargarInfoUser () {
    this.seguridadService.SolicitarUser_id(this.idUser).subscribe({
      next: (data: any) => {

        const dateToday = new Date().toISOString().split('T')[0];
        this.formularioVacaciones.controls['fechaSolicitud'].setValue(dateToday);
        this.formularioVacaciones.controls['nombre'].setValue(data.nombreCompleto);
        this.formularioVacaciones.controls['cedula'].setValue(data.usuario);       
        this.formularioVacaciones.controls['ciudad'].setValue(data.lugarNacimiento);

        this.sucursal = data.sucursal;      
        this.formularioVacaciones.controls['sucursal'].setValue(this.sucursal);

        this.cargo = data.cargo;
        this.formularioVacaciones.controls['cargo'].setValue(this.cargo);
       },
      error: (e) => console.log(e)
    });
  }

  enviarInfo() {
    if (this.formularioVacaciones.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Todos los campos son obligatorios !!`,
        showConfirmButton: true,
        confirmButtonText: 'Entendido'
      });
    } else {
      //captura los datos ingresados en el formulario
      let user = new vacacionesModel();
      user.usuario = this.usuario;
      user.fechaSolicitud = new Date(this.formularioVacaciones.controls['fechaSolicitud'].value);
      user.fechaInicio = new Date(this.formularioVacaciones.controls['fechaInicio'].value);
      user.fechaTerminacion = new Date(this.formularioVacaciones.controls['fechaTerminacion'].value);
      user.fechaReintegro = new Date(this.formularioVacaciones.controls['fechaReintegro'].value);

      user.diasSolicitados = this.formularioVacaciones.controls['diaSolicitados'].value;
      user.periodo = this.capturarSelectPeriodo();
      // user.periodo= this.formularioVacaciones.controls['periodo'].value;      

      // Lógica para configurar diasRemunerados y diasCompensados
      if (this.formularioVacaciones.controls['opcionCompensar'].value === 'Si') {
        user.compensacion = true;
        user.diasRemunerados = this.formularioVacaciones.controls['diasRemunerados'].value;
        user.diasCompensados = 0;
      } else {
        user.compensacion = false;
        user.diasRemunerados = 0;
        user.diasCompensados = this.formularioVacaciones.controls['diasCompensados'].value;
      }

      user.autorizaJefe = this.formularioVacaciones.controls['autorizaJefe'].value == 'Si' ? true : false;

      console.log('Informacion a enviar:',user);
      //Servicio para enviar la informacion del fornulario a la BD
      this.seguridadService.postSolicitudVacaciones(user).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Solicitud enviada !!`,
            showConfirmButton: false,
            timer: 2000
          });
          console.log(data);
        },
        error: (e) => console.log(e)
      });
    }
  }

  cancelar () {
    //Cancelar formulario y regresar a la ventana princpia
  }

  infoToSend () {

  }

  capturarSelectPeriodo(): string {
    const e = document.getElementById("periodo") as HTMLSelectElement;
    const text = e.options[e.selectedIndex].text;
    return text;
  }

}
