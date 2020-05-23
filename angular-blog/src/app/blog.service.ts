import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  fetchPosts(username:string):Promise<Post[]>{
    return fetch('/api/'+username,{
      method: "GET",
      credentials:'include'
    }).then(response=>{response.json()}).then(response=>{
      let posts: Post[] = []
      for(let k in response){
        posts.push({
          postid: k.postid,
          created: new Date(k.created),
          modified: new Date(k.modified),
          title: k.title,
          body: k.body
        })
      }
      return posts;
    })
  }
}

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}