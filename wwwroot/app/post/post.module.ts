import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";

import { PostService } from "./post.service";
import { PostListComponent } from "./post-list.component";
import { PostDetailComponent } from "./post-detail.component";
import { PostComponent } from "./post.component";

// Define module routes
const routes: Routes = [
    {path: 'posts', component: PostListComponent},
    {path: 'posts/:id', component: PostDetailComponent}
];

@NgModule({
  imports: [
      BrowserModule,
      [ RouterModule.forChild(routes) ]
  ],
  exports: [ RouterModule ],
  declarations: [
    PostListComponent,
    PostComponent,
    PostDetailComponent
  ],
  providers: [ PostService ]
})
export class PostModule { }