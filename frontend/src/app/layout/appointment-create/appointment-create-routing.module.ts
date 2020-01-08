import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentCreateComponent } from './appointment-create.component';

const routes: Routes = [
  {
    path: '', component: AppointmentCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentCreateRoutingModule { }
