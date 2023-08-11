import { Component, HostListener, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  
  items: any[] = [];
  showNotifications: boolean = false;

  constructor(
    private sessionStorage: SessionStorageService,
    private seguridadService : SeguridadService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.items = this.generateItems(today);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  generateItems(today: Date): any[] {
    today = today || new Date();
    return [
      { id: 1, title: "Solicitud de Auxilios tata sss", date: this.randomDate() },
      { id: 2, title: "Solicitud de Carta Laboral ", date: this.randomDate() },
      { id: 3, title: "Solicitud de Permisos tata", date: this.randomDate() },
      { id: 4, title: "Solicitud de Licencias tata", date: this.randomDate() },
      { id: 5, title: "Solicitud de Vacaciones tata", date: this.randomDate() },
    ];
  }

  randomDate(start?: Date, end?: Date): Date {
    start = start || new Date(2014, 0, 1);
    end = end || new Date(2015, 0, 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  removeNotification(item: any): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  obtenerData () {      
  }
  
}
