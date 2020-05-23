import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  posts: Post[] = [];
  constructor() { }

  fetchPosts(username:string):Promise<void>{
    return fetch('/api/'+username,{
      method: "GET",
      credentials:'include'
    }).then(response => response.json())
    .catch(() => {
      //window.location.href = 'http://localhost:3000/login?redirect=/editor/';
    })
    .then(response => {     
      this.posts.length = 0;
      response.forEach(post => {
        let copy = JSON.parse(JSON.stringify(post));
        this.posts.push(copy);
      });
    });
  }
  getPost():Post[]{
    return this.posts;
  }
    
    // .then((response:any)=>{response.json()}).then((response:any)=>{
    //   let posts: Post[] = []
    //   response.forEach(k=>{
    //     posts.push({
    //       postid: k.postid,
    //       created: new Date(k.created),
    //       modified: new Date(k.modified),
    //       title: k.title,
    //       body: k.body
    //     })
    //   })
    //   return posts;
    // })
  //}
}

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}