import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/root-component/app.component';
import { HomeComponent } from './components/home-component/home.component';
import { AboutComponent } from './components/about-component/about.component';
import { BlogComponent } from './components/blog-component/blog.component';
import { BlogArticleComponent } from './components/blog-article-component/blog.article.component';
import { VideoComponent } from './components/video-component/video.component';
import { EventComponent } from './components/event-component/event.component';
import { EventDetailComponent } from './components/event-detail-component/event.detail.component';
import { ContactComponent } from './components/contact-component/contact.component';
import { ReviewComponent } from './components/review-component/review.component';
import { TimelineComponent } from './components/timeline-component/timeline.component';
import { PostsComponent } from './components/posts-component/posts.component';
import { SigninComponent } from './components/signin-component/signin.component';
import { SignOutComponent } from './components/signout-component/signout.component';
import { AdminRootComponent } from './components/admin-root-component/admin.root.component';
import { AdminHomeComponent } from './components/admin-home-component/admin.home.component';
import { AdminUserComponent } from './components/admin-user-component/admin.user.component';
import { AdminMessageComponent } from './components/admin-message-component/admin.message.component';
import { ConfigurationComponent } from './components/configuration-component/configuration.component';
import { PageNotFoundComponent } from './components/page-not-found-component/page-not-found-component';

import { LoginRedirect } from '../Core/Services/LoginRedirect';

const appRoutes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', 
    children:
    [
      {
        path: '',
        component: BlogComponent,
      },
      {
        path: 'article/:id',
        component: BlogArticleComponent
      }
    ]
  },
  { path: 'videos', component: VideoComponent },
  { path: 'events', 
    children: 
    [
      {
        path: '',
        component: EventComponent
      },
      {
        path: 'detail/:id',
        component: EventDetailComponent
      }
    ]   
  },
  { path: 'contact', component: ContactComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignOutComponent },
  { path: 'admin', 
    component: AdminRootComponent,
    canActivate: [LoginRedirect],
    children: [
      { 
        path: '', 
        component: AdminHomeComponent
      },
      { 
        path: 'profile',
        component: AdminUserComponent
      },
      {
        path: 'messages',
        component: AdminMessageComponent
      }
    ]
  },
  { path: 'configuration', component: ConfigurationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    BlogArticleComponent,
    VideoComponent,
    EventComponent,
    EventDetailComponent,
    ContactComponent,
    ReviewComponent,
    TimelineComponent,
    PostsComponent,
    SigninComponent,
    SignOutComponent,
    PageNotFoundComponent,
    AdminRootComponent,
    AdminUserComponent,
    AdminHomeComponent,
    AdminMessageComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginRedirect],
  bootstrap: [AppComponent]
})
export class AppModule { }
