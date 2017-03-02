import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { PostService } from './post.service';
import { Post } from './data-models/post';
import { Tracker } from "./data-models/tracker";

@Component({
  moduleId: module.id,
  // selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  current: Post;
  
  trackers: Observable<Tracker[]>;
  private trackersTerms = new Subject<object>();
  private routeParamsSub: any;

  constructor(
    private zone:NgZone,
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.postService.getPost(params['id']).then((data) => {
        this.current = data;
      });
    });

    /**
     * Borrowed from AngularJS tutorial
     */
    this.trackers = this.trackersTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(terms => {
        return terms['from'] && terms['to']   // switch to new observable each time the term changes
        // return the http search observable
        ? this.postService.getTrackers(terms['from'], terms['to'])
        // or the observable of empty heroes if there was no search term
        : Observable.of<Tracker[]>([]);
      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Tracker[]>([]);
      });

      // TODO: Can be done in a more elegant way, observe FormControl value?
      // this.zone.run(() => {
      //     this.getTrackers('2015-01-01', '2015-03-01');
      // });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  getTrackers(from: string, to: string): void {
    console.log(from, to);
    this.trackersTerms.next({from, to});
  }
}