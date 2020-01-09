import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { PageHeaderModule } from './../../shared';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    PageHeaderModule
  ]
})
export class NotificationsModule { }
