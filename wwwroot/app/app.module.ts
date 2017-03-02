import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent }         from './app.component';
import { PostModule } from './post/post.module';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [ RouterModule.forRoot(routes, {useHash: true}) ],
    PostModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/