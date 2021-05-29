import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'courses', component: CoursesComponent},
  {path:'testimonials', component: TestimonialComponent},
  {path:'about-us', component: AboutUsComponent},
  {path:'contact', component: ContactComponent},
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
