import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { CredencialesUserModel } from 'src/app/models/credenciales.user';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changePass',
  templateUrl: './changePass.component.html',
  styleUrls: ['./changePass.component.css']
})
export class ChangePassComponent implements OnInit {
  formularioChange: FormGroup=new FormGroup({});

  
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

    constructor(
      private fb: FormBuilder,
      private serviceSeguridad: SeguridadService,
        //Se crea variable privada servicioLocalStorage para poder llamar un método creado en el local-storage.service.ts
   //   private servicioLocalStorage: LocalStorageService,
      private router:Router
    ) { }

    ngOnInit(): void {
      this.ConstruccionFormulario();
      this.capturarUser();
    }

    ConstruccionFormulario(){
      this.formularioChange=this.fb.group({
          user:["",[Validators.required,Validators.minLength(3)]],
          currentPassword:["",[Validators.required, Validators.minLength(4)]],
          newPassword:["",[Validators.required, Validators.minLength(4)]],
          confirmPassword:["",[Validators.required, Validators.minLength(4)]]

      });
  }

  //
    //Extrae los datos de id de la session

  capturarUser(){

    let datosActuales=sessionStorage.getItem("sesionIntranet");
    if(datosActuales){
        //console.log("leyó datos del localStorage")
        let datoSesionJson= JSON.parse(datosActuales);
        let datosLS= datoSesionJson.datos;
        //console.log("datosLS.nombre: " + datosLS.nombre);
        this.formularioChange.controls['user'].setValue(datosLS.nombre);
    }
  }

  ChangePassword(){
      if(this.formularioChange.invalid){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Contraseña incorrecta !`,
          text: 'La nueva contraseña debe contener mínimo 4 caracteres, favor revisar.',
          showConfirmButton: true,
          confirmButtonText:'Entendido'
          // timer: 2000
        });

      }else{
        let datos = new CredencialesUserModel();
        datos.usuario=this.formularioChange.controls['user'].value;
        datos.password= MD5(this.formularioChange.controls['currentPassword'].value).toString();
        datos.newPassword= MD5(this.formularioChange.controls['newPassword'].value).toString();
        datos.confPassword= MD5(this.formularioChange.controls['confirmPassword'].value).toString();

        this.serviceSeguridad.ChangePasswordService(datos).subscribe({
          next: (data)=>{
            //console.log(data);
            if(data == true){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Cambio de contraseña para el usuario <span style="color: blue; text-decoration: underline">${datos.usuario}</span> completado Existosamente !`,
                showConfirmButton: false,
                timer: 2500
              });
              this.router.navigate(['home']);
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: `Contraseña incorrecta , por favor revisar...`,
                  showConfirmButton: false,
                  timer: 2500
                });
                this.router.navigate(['changePass']);
            }
          },
          error:(e)=> console.log(e)
          });
       this.router.navigate(['home']);
      }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById("currentPassword") as HTMLInputElement;
    passwordInput.type = this.showPassword ? "text" : "password";
  }

  togglePasswordVisibilityNewPass() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById("newPassword") as HTMLInputElement;
    passwordInput.type = this.showPassword ? "text" : "password";
  }

  togglePasswordVisibilityConfirmPass() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById("confirmPassword") as HTMLInputElement;
    passwordInput.type = this.showPassword ? "text" : "password";
  }

}
