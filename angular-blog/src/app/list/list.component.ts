import { Component, OnInit } from '@angular/core';
import {Post,BlogService} from '../blog.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  blogService:BlogService = null;
  posts: Post[] =[];
  router:Router;
  constructor(blogService:BlogService,router:Router) {
    this.blogService = blogService;
    this.router= router;
  }

  ngOnInit(): void {
    this.blogService.fetchPosts("cs144").then((results)=>{this.posts = results});
    this.blogService.subscribe(()=>{this.posts = this.blogService.posts});
  }
  postClicked(post:Post){
    let user = this.blogService.getUsername();
    let curDraft = this.blogService.getCurrentDraft();
    let cont = true;
    if(curDraft!= null){
      if(curDraft.postid == post.postid){
        cont = false;
      }
    }
    if(cont == true){
      this.blogService.fetchPosts(user).then((response)=>{
        let postRef = null;
        for(let i = 0 ; i< this.posts.length;i++){
          if(this.posts[i].postid == post.postid){
            postRef = this.posts[i];
          }
        }
        let id = post.postid;
        let url = '/edit/'+id;
        this.blogService.setCurrentDraft(postRef);
        this.router.navigate([url]);
      });
    }
  }
  createNewPost(){
    let user = this.blogService.getUsername();
    this.blogService.fetchPosts(user).then((response)=>{
      let newID = this.blogService.getNextPostID();
      let newPost: Post = {
        title: "",
        body: "",
        created: new Date(),
        modified: new Date(),
        postid: newID
      }
      this.blogService.setCurrentDraft(newPost);
      this.blogService.addToLocal(newPost);
      let url = '/edit/'+newID;
      this.router.navigate([url]);
    }).catch((err)=>{console.log("can't fetch")});
  }
}