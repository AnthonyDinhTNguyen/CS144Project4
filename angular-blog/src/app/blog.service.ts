import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}