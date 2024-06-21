import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DbService } from '../services/db.service';
import { Usuarios } from '../services/usuarios';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
})
export class PageLoginPage implements OnInit {
  credentials = {
    username: 'camilo',
    password: 1234,
  };

  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {}
  async login() {
    if (this.validateCredentials()) {
      const { username, password } = this.credentials;

      if (username && password) {
        try {
          const users: Usuarios[] = await this.dbService.buscarSesiones();

          const user = users.find(
            (user) => user.user_name === username && user.password === password
          );

          if (user) {
            if (user.active === 1) {
              this.dbService.presentToast('Inicio de sesión exitoso');
              localStorage.setItem('currentUser', username);
              let navigationExtras: NavigationExtras = {
                state: {
                  username: this.credentials.username,
                  password: this.credentials.password,
                },
              };

              this.router.navigate(['/home'], navigationExtras);
            } else {
              this.dbService.presentToast('Usuario no activo');
            }
          } else {
            this.dbService.presentToast('Usuario o contraseña incorrectos');
          }
        } catch (error) {
          this.dbService.presentToast(`Error al iniciar sesión: ${error}`);
        }
      } else {
        this.dbService.presentToast('Por favor, complete todos los campos');
      }
    }
  }

  async register() {
    const { username, password } = this.credentials;

    if (username && password) {
      try {
        await this.dbService.registrarUsuario(username, password);
        this.dbService.presentToast('Usuario registrado exitosamente');
      } catch (error) {
        this.dbService.presentToast(
          `Error al registrar usuario: ${JSON.stringify(error)}`
        );
      }
    } else {
      this.dbService.presentToast('Por favor, complete todos los campos');
    }
  }
  validateCredentials() {
    const usernamePattern = /^[a-zA-Z0-9]{3,8}$/;
    const passwordPattern = /^\d{4}$/;

    return (
      usernamePattern.test(this.credentials.username) &&
      passwordPattern.test(`${this.credentials.password}`)
    );
  }
}
