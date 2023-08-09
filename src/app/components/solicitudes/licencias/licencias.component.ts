import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.css']
})
export class LicenciasComponent implements OnInit {

  formularioLicencias !: FormGroup;
  conRegreso: string = 'No';

  selectFile1 !: File;
  selectFile2 !: File;
  selectFile3 !: File;
  selectFile4 !: File;

  constructor(
    private formBuild: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.formularioLicencias = this.formBuild.group({
      fechaSolicitud: ['', Validators.required],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      sucursal: ['', Validators.required],
      opcion: ['', Validators.required],
      opcionA: this.formBuild.group({
        fechaLicencia: [''],
        horaSalida: [''],
        conRegreso: [''],
        horaRegreso: ['']
      }),
      opcionB: this.formBuild.group({
        fechaInicio: [''],
        fechaTerminacion: [''],
        fechaReintegrarse: ['']
      }),
      tipoLicencia: ['',Validators.required],
      relacionFamiliar: ['',Validators.required],
      otrosRelacion:[''],
      opcionCompensado:['',Validators.required],
      opcionJefeInmediato:['',Validators.required],
      permisoVotacion:['',Validators.required],
      calamidad:['',Validators.required],
      respuestaOtros:['',Validators.required]
    });
  }

  enviarFormulario(): void {
    if (this.formularioLicencias.valid) {
      const formData = this.formularioLicencias.value;
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

  opcionRegreso (value: string) {
    this.conRegreso = value;
  }

  onSubmit(): void {
    if (this.selectFile1 && this.selectFile2) {
      // Ambos archivos están presentes, procede con el envío del formulario completo
      // Puedes enviar los archivos a un servicio para su procesamiento
    } else {
      // Muestra un mensaje de error indicando que ambos archivos son requeridos
    }
  }

  selectedFile1(event: any): void {
    this.selectFile1 = event.target.files[0];
  }

  selectedFile2(event: any): void {
    this.selectFile2 = event.target.files[0];
  }

  selectedFile3(event: any): void {
    this.selectFile3 = event.target.files[0];
  }

  selectedFile4(event: any): void {
    this.selectFile4 = event.target.files[0];
  }

  cancelar(): void {
  }

}