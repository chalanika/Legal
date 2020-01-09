import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PageHeaderModule } from './../../shared';
import { PostComponent } from './post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    PageHeaderModule
  ]
})
export class PostModule { }
