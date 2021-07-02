import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  formType = 'register';
  public model = { message: "", display: "none" }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getResponseMsg(data) {
    this.model.message = data.message;
    this.model.display = data.display;
  }

  onCloseHandled() {
    this.model.display = 'none';
    this.router.navigate(['courses'])
      .then(() => {
        window.location.reload();
      });
  }

}
