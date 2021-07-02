import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  courses: String[];
  enrollForm: FormGroup;
  loading = false;
  submitted = false;
  message: any;
  successMessageFlag = false;
  display = 'none';

  @Input() formType: string;
  @Output() successEvent = new EventEmitter<{ message: string, display: string }>();

  constructor(
    private service: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.enrollForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      course: ['', Validators.required],
      msg: ['', Validators.nullValidator],
      gender: ['', Validators.nullValidator],
    });

    this.service.getCourses().subscribe(data => {
      this.courses = data;
    });

    this.setTextAreaValidators();
  }

  get f() { return this.enrollForm.controls; }

  onSubmit() {
    console.log('in submit');
    this.submitted = true;

    // stop here if form is invalid
    if (this.enrollForm.invalid) {
      console.log('invalid');
      return;
    }

    this.loading = true;
    console.log('After loading');
    if (this.formType === 'enroll' || this.formType === 'register' || this.formType === 'contact') {
      this.service.enrollUser(this.enrollForm.value)
        .pipe(first())
        .subscribe(data => {
          this.message = data.response.toString();
          this.successMessageFlag = true;
          this.loading = false;
          this.successItem(this.message, 'block');
        }
        );
    }

    if (this.formType === 'testimonial') {
      console.log('form value '+this.enrollForm.value);
      this.service.submitTestimonials(this.enrollForm.value)
        .pipe(first())
        .subscribe(data => {
          this.message = data.response.toString();
          this.successMessageFlag = true;
          this.loading = false;
          this.successItem(this.message, 'block');
        }
        );
    }
  }

  setTextAreaValidators() {
    const msg = this.enrollForm.get('msg');
    const gender = this.enrollForm.get('gender');
    const email = this.enrollForm.get('email');
    const course = this.enrollForm.get('course');
    const phone = this.enrollForm.get('phone');
    if (this.formType === 'testimonial') {
      msg.setValidators([Validators.required]);
      gender.setValidators([Validators.required]);
      email.setValidators([Validators.nullValidator]);
      course.setValidators([Validators.nullValidator]);
      phone.setValidators([Validators.nullValidator]);
    }

    if (this.formType === 'contact') {
      msg.setValidators([Validators.required]);
      gender.setValidators([Validators.nullValidator]);
      course.setValidators([Validators.nullValidator]);
    }
    msg.updateValueAndValidity();
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  successItem(message: string, display: string) {
    this.successEvent.emit({ message, display });
  }

}
