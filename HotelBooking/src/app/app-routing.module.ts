import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "list", component: ReservationListComponent},
  {path: "new", component: ReservationFormComponent},
  {path:"edit/:id", component: ReservationFormComponent},
  {path: 'about', component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
