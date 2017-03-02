import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostService } from "./post.service";
import { PostListComponent } from "./post-list.component";
import { PostDetailComponent } from "./post-detail.component";

// Define module routes
const routes: Routes = [
    {path: 'posts', component: PostListComponent},
    {path: 'posts/:id', component: PostDetailComponent}
];

@NgModule({
  imports: [
    [ RouterModule.forChild(routes) ]
  ],
  exports: [ RouterModule ],
  declarations: [
    PostListComponent,
    PostDetailComponent
  ],
  providers: [ PostService ]
})
export class PostModule { }