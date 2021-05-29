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
  @Output() successEvent = new EventEmitter<{message:string, display:string}>();

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

  setTextAreaValidators() {
    const msg = this.enrollForm.get('msg');
    const gender = this.enrollForm.get('gender');
    if (this.formType === 'testimonial') {
      msg.setValidators([Validators.required]);
      gender.setValidators([Validators.required]);
    }

    if (this.formType === 'contact') {
      msg.setValidators([Validators.required]);
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

  successItem(message: string, display : string) {
    console.log('Inside successItem');
    this.successEvent.emit({message, display});
  }
  
}
