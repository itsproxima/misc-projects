import { Component,Input ,OnInit,EventEmitter,Output } from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../../model/userDetails";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() childMessage: string;
  @Output() onHeader= new EventEmitter<string>();
    userDetails:UserModel;
  constructor( private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
      this.userDetails = JSON.parse(localStorage.getItem("user"));
      if (this.userDetails == null || this.userDetails.userId == 0 ) {
        this.spinnerService.hide();
          this.router.navigate(['/']);
      }
   }

  ngOnInit() {
  }
    logout(){
    localStorage.clear();
        this.router.navigate(['/']);
    }

}
