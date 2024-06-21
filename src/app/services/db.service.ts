import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from './usuarios';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DbService {
  public database!: SQLiteObject;
  tablaSesion: string = `CREATE TABLE IF NOT EXISTS sesion_data (
    user_name TEXT(8) PRIMARY KEY NOT NULL,
    password INTEGER NOT NULL,
    active INTEGER NOT NULL
);`;
  usuarioPrueba: string = `INSERT OR IGNORE INTO sesion_data (user_name, password, active)
                                    VALUES ('usuario_prueba', 123456, 1);`;

  listaUsarios = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.crearDb();
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe',
    });

    await toast.present();
  }

  async presentAlert(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      header: 'Alert',

      buttons: ['OK'],
    });

    await toast.present();
  }

  crearDb() {
    this.sqlite
      .create({
        name: 'camilo.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
        this.isDbReady.next(true);
        this.presentToast('Base de datos y tabla creadas con éxito');
      })
      .catch((error) => console.log(error));
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaSesion, []);
      await this.database.executeSql(this.usuarioPrueba, []);
      this.buscarSesiones();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast(`Error creando tablas: ${error}`);
    }
  }

  buscarSesiones(): Promise<Usuarios[]> {
    return this.database
      .executeSql(`SELECT * FROM sesion_data`, [])
      .then((res) => {
        let items: Usuarios[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              active: res.rows.item(i).active,
              password: res.rows.item(i).password,
              user_name: res.rows.item(i).user_name,
            });
          }
        }

        this.listaUsarios.next(items as any);
        return items;
      });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchUsers() {
    return this.listaUsarios.asObservable();
  }

  registrarUsuario(username: string, password: number) {
    const data = [username, password];
    return this.database
      .executeSql(
        'INSERT INTO sesion_data(user_name,password, active) VALUES (?,?, 1)',
        data
      )
      .then(() => {
        this.buscarSesiones();
      });
  }

  async isUserActive(): Promise<boolean> {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      return false;
    }

    const res = await this.database.executeSql(
      'SELECT * FROM sesion_data WHERE user_name = ? AND active = 1',
      [currentUser]
    );
    return res.rows.length > 0;
  }

  async logout(): Promise<void> {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      localStorage.removeItem('currentUser');
      this.presentToast('Sesión cerrada con éxito');
      this.router.navigate(['/login']);
    }
  }
}
