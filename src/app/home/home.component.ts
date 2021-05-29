
import { Faq } from './../model/faq';
import { SharedService } from './../shared.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faqs: Faq[];
  panelOpenState = false;
  ModalTitle: String;
  courses: String[];
  enrollForm: FormGroup;
  loading = false;
  submitted = false;
  message: any;
  responseMsg: string = '';
  successMessageFlag = false;
  display = 'none';
  public model = { message: "", display: "none" }

  formType = 'enroll';
  @ViewChild('closebutton') closebutton;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.service.getFaqs().subscribe(data => {
      this.faqs = data;
    });

  }

  enrollClick() {
    this.ModalTitle = "Enroll for Course";
    //this.enrollForm.reset();
    this.service.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  closeClick() {
    this.successMessageFlag = false;
    this.enrollForm.reset();
  }

  getResponseMsg(data) {
    this.model.message = data.message;
    this.model.display = data.display;
    this.closebutton.nativeElement.click();
  }

  onCloseHandled() {
    this.model.display = 'none';
  }

}
