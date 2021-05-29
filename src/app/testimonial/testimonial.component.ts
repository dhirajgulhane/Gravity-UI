import { Testimonial } from './../model/Testimonial';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

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

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.service.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }

  testimonialClick(){
    this.ModalTitle = "Write a Testimonial";
  }

}
