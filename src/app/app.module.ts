import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/root-component/app.component';
import { HomeComponent } from './components/home-component/home.component';
import { AboutComponent } from './components/about-component/about.component';
import { VideoComponent } from './components/video-component/video.component';
import { EventComponent } from './components/event-component/event.component';
import { EventDetailComponent } from './components/event-detail-component/event.detail.component';
import { ContactComponent } from './components/contact-component/contact.component';
import { ReviewComponent } from './components/review-component/review.component';
import { TimelineComponent } from './components/timeline-component/timeline.component';
import { PostsComponent } from './components/posts-component/posts.component';
import { SigninComponent } from './components/signin-component/signin.component';
import { PageNotFoundComponent } from './components/page-not-found-component/page-not-found-component';

const appRoutes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'videos', component: VideoComponent },
  { path: 'events', component: EventComponent },
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    VideoComponent,
    EventComponent,
    EventDetailComponent,
    ContactComponent,
    ReviewComponent,
    TimelineComponent,
    PostsComponent,
    SigninComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
