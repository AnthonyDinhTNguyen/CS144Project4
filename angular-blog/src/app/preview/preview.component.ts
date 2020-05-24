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
  activatedRoute:ActivatedRoute;
  constructor(blogService:BlogService,router:Router,activatedRoute:ActivatedRoute) { 
    this.blogService= blogService;
    this.router= router;
    this.activatedRoute = activatedRoute;
    this.reader = new Parser;
    this.writer = new HtmlRenderer;
  }

  ngOnInit(): void {
    let temp = this.activatedRoute.snapshot.paramMap.get('id');
    let id:number = parseInt(temp);
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
        this.blogService.getPost(user, id).then(result => {
            this.post = result
            if(this.post == null){
              console.log("error on preview");
            }
            else{
              this.titleMarkdown = this.writer.render(this.reader.parse(this.post.title));
              this.bodyMarkdown = this.writer.render(this.reader.parse(this.post.body));
            }
          });
      }
      else{
        if(this.post == null){
          console.log("error on preview");
        }
        else{
          this.titleMarkdown = this.writer.render(this.reader.parse(this.post.title));
          this.bodyMarkdown = this.writer.render(this.reader.parse(this.post.body));
        }
      }
    }
  }
  editListener(){
    let id = this.post.postid.toString();
    let url = '/edit/'+id.toString();
    this.router.navigate([url]);
  }

}
