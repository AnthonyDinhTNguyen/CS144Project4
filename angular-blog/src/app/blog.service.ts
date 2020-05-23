import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  //posts: Post[] = [];
  constructor() { }

  fetchPosts(username:string):Promise<Post[]>{
    return fetch('/api/'+username,{
      method: "GET",
      credentials:'include'
    }).then(response => response.json()).catch((err)=>{console.log(err); Promise.reject(err)})
    .then(response => {     
      let posts:Post[] = []
      response.forEach(k => {
        posts.push({
          postid: k.postid,
          created: new Date(k.created),
          modified: new Date(k.modified),
          title: k.title,
          body: k.body
        });
      });
      return posts;
    });
  }
  // getPost():Post[]{
  //   return this.posts;
  // }
    
  //   .then((response:any)=>{response.json()}).then((response:any)=>{
  //     let posts: Post[] = []
  //     response.forEach(k=>{
  //       posts.push({
  //         postid: k.postid,
  //         created: new Date(k.created),
  //         modified: new Date(k.modified),
  //         title: k.title,
  //         body: k.body
  //       })
  //     })
  //     return posts;
  //   })
  // }
}

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}