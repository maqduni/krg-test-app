import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from './data-models/post';
import { Tracker } from './data-models/tracker';

@Injectable()
export class PostService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'api';  // URL to web api

  constructor(private http: Http) { }

  getPosts(): Promise<Post[]> {
    const url = `${this.apiUrl}/posts`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Post[])
               .catch(this.handleError);
  }

  getPost(id: number): Promise<Post> {
    const url = `${this.apiUrl}/posts/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Post)
      .catch(this.handleError);
  }

  getTrackers(from: string, to: string): Promise<Tracker[]> {
    const url = `${this.apiUrl}/trackers?from=${from}&to=${to}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Tracker[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
