import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { PostService } from './post.service';
import { Post } from './data-models/post';

@Component({
  moduleId: module.id,
  // selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [ './post-list.component.css' ]
})
export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostService,
    private router: Router) {}

  ngOnInit(): void {
    this.postService.getPosts().then((data) => {
        this.posts = data;
    });
  }

  // TODO: Can be done using a routerLink directive in the template
  gotoDetail(post: Post): void {
    let link = ['/posts', post.id];
    this.router.navigate(link);
  }
}