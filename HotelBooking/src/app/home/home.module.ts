import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomsComponent } from '../sections/rooms/rooms.component';
import { HeroComponent } from '../components/hero/hero.component';
import { HomeComponent } from './home.component';




@NgModule({
  declarations: [
    HeroComponent,
    RoomsComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class HomeModule { }
