import { Component } from '@angular/core';
import { UserModel } from './model/userDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userDetails:UserModel;
  constructor(private router: Router){
    this.userDetails = JSON.parse(localStorage.getItem("user"));
    if (this.userDetails == null || this.userDetails.userId == 0 ) {
      this.router.navigate(['/']);
    }
  }
}
