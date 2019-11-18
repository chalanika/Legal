import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminDashboardComponent} from '../admin-layout/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

const routes: Routes = [
  
    { path: 'admin/dashboard', component:AdminDashboardComponent }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
