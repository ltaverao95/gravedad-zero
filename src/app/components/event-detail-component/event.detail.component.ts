import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'event.detail',
  templateUrl: './event.detail.component.html',
  styleUrls: ['./event.detail.component.css']
})
export class EventDetailComponent 
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