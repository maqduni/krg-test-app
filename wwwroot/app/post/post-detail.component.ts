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
  selector: 'post-list',
  templateUrl: './post-detail.component.html',
  styleUrls: [ './post-detail.component.css' ]
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private router: Router) {}

  ngOnInit(): void {
    this.postService.getPost(10).then((data) => {
        this.post = data;
    });
  }

  // TODO: Get trackers
}