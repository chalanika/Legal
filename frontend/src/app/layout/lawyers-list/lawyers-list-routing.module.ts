import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawyersListComponent } from './lawyers-list.component';

const routes: Routes = [
  {
    path: '', component: LawyersListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyersListRoutingModule { }
