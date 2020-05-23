import { Component, OnInit } from '@angular/core';
import {Post,BlogService} from '../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  blogService:BlogService = null;
  posts: Post[] =[];
  constructor(blogService:BlogService) {
    this.blogService = blogService;
  }

  ngOnInit(): void {
    this.blogService.fetchPosts("cs144").then((results)=>{this.posts = results});
  }

}