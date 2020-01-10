import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawyerComponent } from './lawyer.component';

const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
