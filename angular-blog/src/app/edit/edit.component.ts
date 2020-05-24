import { Component, OnInit } from '@angular/core';
import {Post,BlogService} from '../blog.service';
import { Routes, RouterModule } from '@angular/router';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  post: Post;
  blogService: BlogService;
  router: Router;
  activatedRoute: ActivatedRoute;
  constructor(blogService:BlogService, router:Router, activatedRoute:ActivatedRoute) {
    this.blogService = blogService;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(()=>this.initializePost());
    this.initializePost();
  }
  initializePost(){
    let temp = this.activatedRoute.snapshot.paramMap.get('id');
    let id:number = parseInt(temp);
    //let id = 1;
    let user = this.blogService.getUsername();
    if(user == null){
      //logout
    }
    else{
      //Error CHeck id for nan
      let temp= this.blogService.getCurrentDraft();
      if (temp != null){
        this.post = temp;
      }
      if(this.post == null||this.post.postid!= id){
        this.blogService.getPost(user, id).then(result => this.post = result);
      }
    }
  }
  saveListener(){
    let user = this.blogService.getUsername();
    this.blogService.getPost(user,this.post.postid).then((response)=>{
      if(response == null){
        this.blogService.newPost(user,this.post).then(()=>{
          for(let i =0;i<this.blogService.posts.length;i++){
            if(this.blogService.posts[i].postid = this.post.postid){
              this.post = this.blogService.posts[i];
            }
          }
        });
      }
      else{
        this.blogService.updatePost(user,this.post).then(()=>{
          for(let i =0;i<this.blogService.posts.length;i++){
            if(this.blogService.posts[i].postid = this.post.postid){
              this.post = this.blogService.posts[i];
            }
          }
        });
      }
    });
  }
  deleteListener(){
    let user = this.blogService.getUsername();
    this.blogService.getPost(user,this.post.postid).then((response)=>{
      if(response == null){
        this.router.navigate(['/']);
      }
      else{
        this.blogService.deletePost(user,this.post.postid);
        this.router.navigate(['/'])
      }
    })
  }
  previewListener(){
    let id = this.post.postid;
    let url = "/preview/"+id.toString();
    this.blogService.setCurrentDraft(this.post);
    this.router.navigate([url]);
  }
}
