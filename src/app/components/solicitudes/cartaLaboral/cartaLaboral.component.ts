import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { DatosSesionModel } from 'src/app/models/datos-sesion.model';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartaLaboral',
  templateUrl: './cartaLaboral.component.html',
  styleUrls: ['./cartaLaboral.component.css']
})
export class CartaLaboralComponent implements OnInit, AfterViewInit {

  fileUrl: string = 'http://172.16.1.24:88/carta_laboral/PLANTILLA_CARTAS_LABORALES.docx';

  updatedDocContent: Blob | null = null;
  dataSesion: DatosSesionModel | null = null;

  idUser !: string;
  nombreUser !: string;
  cedula !: string;
  cargo !: string;

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private servicioSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.obtenerDatosSesion();
  }

  ngAfterViewInit(): void {
    this.processWord();
  }

  obtenerDatosSesion(): void {
    this.dataSesion = this.sessionStorage.ObtenerSesionInfo();
    if (this.dataSesion) {
      this.idUser = this.dataSesion.datos.id;
      // console.log(this.idUser); 
    }
    this.dataUser();
  }

  dataUser() {
    this.servicioSeguridad.SolicitarUser_id(this.idUser).subscribe({
      next: (data: any) => {
        this.nombreUser = data.nombreCompleto;
        this.cedula = data.usuario;
        this.cargo = data.cargo;
      },
      error: (e) => console.log(e)
    });
  }

  async processWord(): Promise<void> {
    try {
      const wordDocArrayBuffer = await this.readWordFileFromUrl(this.fileUrl);
      if (wordDocArrayBuffer) {
        const updatedDocBlob = await this.replaceValuesWithDocxtemplater(wordDocArrayBuffer, {
          nombrecompleto: this.nombreUser,
          cedula: this.cedula,
          cargo: this.cargo
        });
        this.updatedDocContent = updatedDocBlob;
        console.log('Documento procesado');
      }
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
    }
  }

  readWordFileFromUrl(url: string): Promise<ArrayBuffer | undefined> {
    return this.http.get(url, { responseType: 'arraybuffer' }).toPromise();
  }

  replaceValuesWithDocxtemplater(template: ArrayBuffer, values: any): Promise<Blob> {
    const zip = new PizZip(template);
    const doc = new Docxtemplater();
    doc.loadZip(zip);
    doc.setData(values);
    doc.render();

    const updatedContent = doc.getZip().generate({ type: 'blob' });
    return updatedContent;
  }

  downloadUpdatedDoc(): void {
    if (this.updatedDocContent) {
      saveAs(this.updatedDocContent, 'Carta_Laboral.docx');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `El documento no se proceso correctamente...`,
        showConfirmButton: false,
        confirmButtonText: 'Entendido',
        timer: 1500
      });
    }
  }

}
