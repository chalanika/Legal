import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'post', loadChildren: './post/post.module#PostModule' },
            { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule' },
            { path: 'category', loadChildren: './category/category.module#CategoryModule' },
            { path: 'appointment', loadChildren: './appointment/appointment.module#AppointmentModule' },
            { path: 'book/:lawyerId', loadChildren: './appointment-create/appointment-create.module#AppointmentCreateModule' },
            { path: 'lawyers', loadChildren: './lawyers-list/lawyers-list.module#LawyersListModule' },
            { path: 'clients', loadChildren: './clients/clients.module#ClientsModule' },
            { path: 'cases',loadChildren:'./cases-lawyer/cases-lawyer.module#CasesLawyerModule'},
            { path: '**', redirectTo: 'not-found' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
