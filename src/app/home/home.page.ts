import { Router, NavigationExtras } from '@angular/router';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AlertController, AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef })
  card?: ElementRef<HTMLIonCardElement>;
  userData: any = {};
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  fechaNacimiento: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const userData = navigation.extras.state;
      this.username = userData['username'];
    }
  }

  ngAfterViewInit() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.card!.nativeElement)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
      .fromTo('opacity', '0.2', '1');

    animation.play();
  }
  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.educacion = '';
    this.fechaNacimiento = '';
  }

  async mostrarInformacion() {
    this.userData = {
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      educacion: this.educacion,
      fechaNacimiento: this.fechaNacimiento,
    };

    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${this.nombre} ${this.apellido}`,
      buttons: ['OK'],
    });

    await alert.present();
    this.limpiarCampos();
  }
  toDoNavegacion(route: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.userData.username,
        nombre: this.userData.nombre,
        apellido: this.userData.apellido,
        educacion: this.userData.educacion,
        fechaNacimiento: this.userData.fechaNacimiento,
      },
    };

    this.router.navigate([`/${route}`], navigationExtras);
  }
}
