import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
// import { RouterModule , Routes } from '@angular/router';
import {UserService} from './user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { FileComponent } from './file/file.component';
import {FileUploadModule} from 'ng2-file-upload';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {RateService} from 'src/app/core/services/rate.service';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { ValidateService } from './validate.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        FormsModule,
        FileUploadModule,
        NgbModule,
        ReactiveFormsModule,
        // FullCalendarModule
        // RouterModule.forRoot(appRoutes),
    ],
    declarations: [AppComponent, FileComponent, HomeComponent, ProfileComponent, ForgotPasswordComponent, DisplayCategoryComponent],
    providers: [AuthGuard , UserService , ValidateService],
    bootstrap: [AppComponent]
})
export class AppModule {}
