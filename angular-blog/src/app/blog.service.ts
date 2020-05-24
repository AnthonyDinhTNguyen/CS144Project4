import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  posts: Post[] = [];
  draft: Post = null;
  constructor() { }
  listeners = [];
  subscribe(func){
    this.listeners.push(func)
  }
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
      this.posts.sort(comparator);
      for(let i = 0; i<this.listeners.length; i++){
        let func = this.listeners[i];
        func();
      }
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
  getPost(username:string, id:number){
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
    }).catch((err)=>{
      return null;
    })
  }
  setCurrentDraft(draft:Post){
    this.draft = draft;
  }
  getCurrentDraft(){
    return this.draft;
  }

  newPost(username:string, post: Post):Promise<void>{
    let id = post.postid;
    let bod = JSON.stringify({title:post.title,body:post.body});
    return fetch('/api/'+username+'/'+id.toString(),{
      method:"POST",
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: bod
    }).then(response=>{
      this.fetchPosts(username);
    }).catch((err)=>{console.log("error with new post")});//error handler todo
  }

  updatePost(username:string,post:Post):Promise<void>{
    let id = post.postid;
    let bod = JSON.stringify({title:post.title,body:post.body});
    return fetch('/api/'+username+'/'+id.toString(),{
      method:"PUT",
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:bod
    }).then(response=>{
      this.fetchPosts(username);
    }).catch((err)=>{console.log("error updating post")});
  }

  getNextPostID(){
    return this.posts[this.posts.length-1].postid+1;
  }
  addToLocal(post:Post){
    this.posts.push(post);
    this.posts.sort(comparator);
  }
  deletePost(username:string,postid:number){
    fetch('/api/'+username+'/'+postid.toString(),{
      method:"DELETE",
      credentials:'include',
    }).then(response=>{
      this.fetchPosts(username);
    }).catch((err)=>{console.log("error deleteing psot")});
  }
}
function comparator(a,b){
  if(a.postid<b.postid){
    return -1;
  }
  if(a.postid>b.postid){
    return 1;
  }
  return 0;
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