import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formType = 'contact';
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
    this.router.navigate(['contact'])
      .then(() => {
        window.location.reload();
      });
  }

}
