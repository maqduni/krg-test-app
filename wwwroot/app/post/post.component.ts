import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {
  @Input() current: Post;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }
}