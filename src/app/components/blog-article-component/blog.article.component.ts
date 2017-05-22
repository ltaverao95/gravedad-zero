import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-article',
  templateUrl: './blog.article.component.html',
  styleUrls: ['./blog.article.component.css']
})
export class BlogArticleComponent 
{
  id: any;
  paramsSub: any;  

  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => this.id = parseInt(params['id'], 10));
  }
  
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }  
}