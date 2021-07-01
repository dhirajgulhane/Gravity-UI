import { Testimonial } from './model/Testimonial';
import { Faq } from './model/faq';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/User';
import { Result } from './model/Result';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrlJSON = "/assets/data/";
  //readonly APIUrl = "http://localhost:8080/angularservice/v1";
  readonly APIUrl = "https://gravitybackend.herokuapp.com/angularservice/v1";

  constructor(private http: HttpClient) { }

  getFaqs() : Observable<Faq[]> {
    console.log('inside service');
    return this.http.get<Faq[]>(this.APIUrlJSON + 'faq.json');
  }

  getCourses():Observable<String[]>{
    return this.http.get<any>(this.APIUrl+'/courses');
  }

  enrollUser(user: User):Observable<Result>{
    console.log('enroll '+user.fname);
    return this.http.post<Result>(this.APIUrl+'/enroll', user);
  }

  getTestimonials() : Observable<Testimonial[]> {
    console.log('inside service');
    return this.http.get<Testimonial[]>(this.APIUrlJSON + 'feedback.json');
  }
}
