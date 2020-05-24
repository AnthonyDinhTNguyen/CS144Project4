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
  }
  postClicked(post:Post){
    let id = post.postid;
    let url = '/edit/'+id;
    this.blogService.setCurrentDraft(post);
    this.router.navigate([url]);
  }
}