import { Testimonial } from './../model/Testimonial';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  form
  testimonials: Testimonial[];

  ModalTitle: String;
  formType = 'testimonial';
  public model = { message: "", display: "none" }
  @ViewChild('closebutton') closebutton;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.service.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }

  testimonialClick(){
    this.ModalTitle = "Write a Testimonial";
  }

  getResponseMsg(data) {
    this.model.message = data.message;
    this.model.display = data.display;
    this.closebutton.nativeElement.click();
  }

  onCloseHandled() {
    this.model.display = 'none';
    this.router.navigate(['testimonials'])
      .then(() => {
        window.location.reload();
      });
  }

}
