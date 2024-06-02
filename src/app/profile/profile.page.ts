import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  fechaNacimiento: string = '';
  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const userData = navigation.extras.state;
      this.username = userData['username'];
      this.nombre = userData['nombre'];
      this.apellido = userData['apellido'];
      this.educacion = userData['educacion'];
      this.fechaNacimiento = userData['fechaNacimiento'];
    }
  }

  toDoNavegacion() {
    this.router.navigate(['home']);
  }
}
