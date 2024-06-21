import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExperienciaLaboralComponent } from '../experiencia-laboral/experiencia-laboral.component';
import { HomePageRoutingModule } from './home-routing.module';
import { CertificacionesComponent } from '../certificaciones/certificaciones.component';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ExperienciaLaboralComponent,
    CertificacionesComponent,
    MisDatosComponent,
  ],
})
export class HomePageModule {}
