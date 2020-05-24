import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  posts: Post[] = [];
  draft: Post = null;
  constructor() { }

  fetchPosts(username:string):Promise<Post[]>{
    return fetch('/api/'+username,{
      method: "GET",
      credentials:'include'
    }).then(response => response.json()).catch((err)=>{console.log(err); Promise.reject(err)})
    .then(response => {
      this.posts = [];     
      response.forEach(k => {
        this.posts.push({
          postid: k.postid,
          created: new Date(k.created),
          modified: new Date(k.modified),
          title: k.title,
          body: k.body
        });
      });
      return this.posts;
    });
  }
  getUsername(){
    let cookie = document.cookie;
    if (cookie == null){
      return null;
    }
    else{
      let jwtToken = parseJWT(cookie);
      let username = jwtToken.usr;
      return username;
    }
  }
  getPost(username:string, id:number):Promise<Post>{
    return fetch('/api/'+username+"/"+id.toString(),{
      method:"GET",
      credentials:'include'
    }).then(response=>response.json()).then(response=>{
      let post:Post = {
        postid: response.postid,
        created: new Date(response.created),
        modified: new Date(response.modified),
        title: response.title,
        body: response.body
      }
      return post;
    })
  }
  setCurrentDraft(draft:Post){
    this.draft = draft;
  }
  getCurrentDraft(){
    return this.draft;
  }
  newPost(){
    
  }
}
function parseJWT(token) //got this from the spec
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}