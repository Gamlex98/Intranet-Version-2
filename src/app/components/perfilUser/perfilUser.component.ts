import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';
import { userModel } from 'src/app/models/user.model';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { DatosSesionModel } from 'src/app/models/datos-sesion.model';

@Component({
  selector: 'app-perfilUser',
  templateUrl: './perfilUser.component.html',
  styleUrls: ['./perfilUser.component.css']
})
export class PerfilUserComponent implements OnInit {

  idUser !: string;
  nombreUser !: string;
  correoUser !: string;

  dataSesion : DatosSesionModel | null = null;
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private sessionStorage : SessionStorageService

  ) { }

  ngOnInit() {

    this.obtenerDatosSesion();
  }

  obtenerDatosSesion(): void {
    this.dataSesion = this.sessionStorage.ObtenerSesionInfo();
    if (this.dataSesion) {
      this.idUser = this.dataSesion.datos.id;
      // console.log(this.idUser); 
    }
    this.dataUser();
  }

  dataUser () {
    this.servicioSeguridad.SolicitarUser_id(this.idUser).subscribe({
      next: (data: any) => {
        this.nombreUser= data.nombreCompleto;
        // console.log('Nombre:',this.nombreUser);
        this.correoUser = data.correo;
        // console.log('Correo:',this.correoUser);
      },
      error: (e) => console.log(e)
    });
  }

  cerrarSesion() {
    this.sessionStorage.EliminarDatosSesion();
    window.location.reload();
  }
}
