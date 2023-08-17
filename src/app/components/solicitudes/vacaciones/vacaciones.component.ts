import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosSesionModel } from 'src/app/models/datos-sesion.model';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})

export class VacacionesComponent implements OnInit {

  formularioVacaciones !: FormGroup;
  conRegreso: string = 'No';

  dataSesion : DatosSesionModel | null = null;
  idUser !: string;
  nombreUser !: string;
  cedulaUser !: string;
  ciudad !: string;
  sucursal !: string;
  cargo !: string;

  selectFile1 !: File;
  selectFile2 !: File;
  selectFile3 !: File;
  selectFile4 !: File;

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
      fechaInicio: ['', Validators.required],
      fechaTerminacion: ['', Validators.required],
      fechaReintegrarse: ['', Validators.required],
      diasSolicidados: ['', Validators.required],

    });

    // Suscripción al cambio de fecha de terminación
    this.formularioVacaciones.controls['fechaTerminacion'].valueChanges.subscribe((fechaTerminacion: Date) => {
      if (fechaTerminacion) {
        console.log('Terminacion:',fechaTerminacion);
        const fechaReintegracion = new Date(fechaTerminacion);
        
        console.log('Reintegracion:',fechaReintegracion);
        // Sumar un día a la fecha de reintegración
        fechaReintegracion.setDate(fechaReintegracion.getDate() + 2);
        this.formularioVacaciones.controls['fechaReintegrarse'].setValue(this.datePipe.transform(fechaReintegracion, 'yyyy-MM-dd'));

        const fechaInicio = this.formularioVacaciones.controls['fechaInicio'].value;
        const diferenciaEnMilisegundos = fechaTerminacion.getTime() - fechaInicio.getTime();
        const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

        this.formularioVacaciones.controls['fechaReintegrarse'].setValue(this.datePipe.transform(fechaReintegracion, 'yyyy-MM-dd'));
        this.formularioVacaciones.controls['diasSolicitados'].setValue(diferenciaEnDias);
      }
    });

  }

  enviarFormulario(): void {
    if (this.formularioVacaciones.valid) {
      const formData = this.formularioVacaciones.value;
      console.log(formData);
      // Lógica para enviar el formulario
    } else {
      // Manejar validaciones
      console.log('Error Formulario');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Favor llenar todos los datos...`,
        showConfirmButton: false,
        confirmButtonText: 'Entendido',
        timer: 1500
      });
    }
  }
  
  getDataUser() {
    this.dataSesion = this.sessionStorage.ObtenerSesionInfo();
    if (this.dataSesion) {
      this.idUser = this.dataSesion.datos.id;
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

  cancelar () {
    //Cancelar formulario y regresar a la ventana princpia
  }

  infoToSend () {

  }

}
