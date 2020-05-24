import { Component, OnInit } from '@angular/core';
import { Parser, HtmlRenderer } from 'commonmark';
import { Post,BlogService } from '../blog.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  blogService: BlogService;
  router: Router;
  post:Post;
  reader;
  writer;
  titleMarkdown="";
  bodyMarkdown="";
  constructor(blogService:BlogService,router:Router) { 
    this.blogService= blogService;
    this.router= router;
    this.reader = new Parser;
    this.writer = new HtmlRenderer;
  }

  ngOnInit(): void {
    this.post = this.blogService.getCurrentDraft();
    if(this.post == null){
      console.log("error on preview");
    }
    else{
      this.titleMarkdown = this.writer.render(this.reader.parse(this.post.title));
      this.bodyMarkdown = this.writer.render(this.reader.parse(this.post.body));
    }
  }
  editListener(){
    let id = this.post.postid.toString();
    let url = '/edit/'+id.toString();
    this.router.navigate([url]);
  }

}
