import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { FileComponent } from './file/file.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';

const routes: Routes = [
    // { path: '', loadChildren: './signup/signup.module#SignupModule' },
    { path: '',             component: HomeComponent },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'file',             component: FileComponent },
    { path: 'home',             component: HomeComponent },
    { path: 'forgotPassword',             component: ForgotPasswordComponent },
    { path: 'profile',             component: ProfileComponent },
    { path: 'lawyers/category/:categoryName' , component:DisplayCategoryComponent},
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
