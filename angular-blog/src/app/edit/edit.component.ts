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
    //let id = this.activatedRoute.snapshot.paramMap.get('id');
    //id = parseInt(id);
    let id = 1;
    let user = this.blogService.getUsername();
    if(user == null){
      //logout
    }
    else{
      //Error CHeck id for nan
      this.post = this.blogService.getCurrentDraft();
      if(this.post == null||this.post.postid!= id){
        this.blogService.getPost(user, id).then(result => this.post = result);
      }
    }
  }
}
