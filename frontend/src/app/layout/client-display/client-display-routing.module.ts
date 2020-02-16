import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDisplayComponent } from './client-display.component';

const routes: Routes = [
  {
    path: '', component: ClientDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDisplayRoutingModule { }
