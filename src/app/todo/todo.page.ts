import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef })
  card?: ElementRef<HTMLIonCardElement>;

  tareas: {
    valor: string;
    editando: boolean;
  }[] = [];
  nuevaTarea: string = '';
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  fechaNacimiento: string = '';

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.cargarTareas();
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
  ngAfterViewInit() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.card!.nativeElement)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateY(-100px)', 'translateY(0px)')
      .fromTo('opacity', '0', '1');

    animation.play();
  }

  agregarTarea() {
    if (this.nuevaTarea.trim().length > 0) {
      this.tareas.push({ valor: this.nuevaTarea, editando: false });
      this.nuevaTarea = '';
      this.guardarTareas();
    }
  }
  editarTarea(index: number) {
    this.tareas[index].editando = true;
  }

  guardarTarea(index: number) {
    this.tareas[index].editando = false;
    this.guardarTareas();
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    this.guardarTareas();
  }
  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
  }
  toDoNavegacion() {
    this.router.navigate(['home']);
  }
}
