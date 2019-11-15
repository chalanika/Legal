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
            { path: 'notification', loadChildren: './notification/notification.module#NotificationModule' },
            { path: 'cateory', loadChildren: './cateory/cateory.module#CateoryModule' },
            { path: 'report', loadChildren: './report/report.module#ReportModule' },
            { path: 'appointment', loadChildren: './appointment/appointment.module#AppointmentModule' },
            { path: 'calender', loadChildren: './calender/calender.module#CalenderModule' },
            { path: 'clients', loadChildren: './clients/clients.module#ClientsModule' },
            { path: 'lawyers', loadChildren: './lawyers/lawyers.module#LawyersModule' }





        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
