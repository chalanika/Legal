import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasesLawyerComponent } from './cases-lawyer.component';

const routes: Routes = [
  {
    path: '', component: CasesLawyerComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesLawyerRoutingModule { }
