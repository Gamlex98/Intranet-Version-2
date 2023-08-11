import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  items: any[] = [];
  showNotifications: boolean = false;

  constructor() { }

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
      { id: 1, title: "Meeting with Ben's agent.", date: this.randomDate() },
      { id: 2, title: "Meeting with Ben's agent.", date: this.randomDate() },
      { id: 3, title: "Meeting with Ben's agent.", date: this.randomDate() },
      { id: 4, title: "Meeting with Ben's agent.", date: this.randomDate() },
      { id: 5, title: "Meeting with Ben's agent.", date: this.randomDate() },

      // ... Otras notificaciones ...
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
}
