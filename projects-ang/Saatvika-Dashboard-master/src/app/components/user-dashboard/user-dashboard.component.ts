import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserModel } from '../../model/userDetails';
import {HeaderComponent} from '../header/header.component';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userDetails:UserModel;
  headerName:"Dashboard";
  constructor(private router: Router,private spinnerService: Ng4LoadingSpinnerService,) {
    console.log("dashboard");

   }

  ngOnInit() {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
