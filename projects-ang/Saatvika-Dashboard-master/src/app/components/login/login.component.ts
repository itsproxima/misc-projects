import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {TransportManager} from '../../services/TransportManager';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ResultModel} from '../../model/result';
import {SweetAlertService} from 'angular-sweetalert-service';
import {UserModel} from '../../model/userDetails';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
    emailId: string;
    password: string;
    userModel: UserModel;
    resultModel: ResultModel;

    constructor(private spinnerService: Ng4LoadingSpinnerService, private alertService: SweetAlertService, private loginService: TransportManager, private router: Router) {
        this.emailId = "";
        this.password = "";

    }

    ngOnInit() {
    }


    authenticate(form: NgForm) {
        this.spinnerService.show();
        this.loginService.validateUser(this.emailId, this.password)
            .subscribe(res => {
                    this.spinnerService.hide();
                    console.log("res:" + JSON.stringify(res));
                    this.resultModel = res;
                    if (this.resultModel.code == '01') {
                    }
                    else {
                        this.userModel = this.resultModel.data;
                        localStorage.setItem("user", JSON.stringify(this.userModel));
                        this.router.navigate(['/dashboard']);
                    }
                },
                (err: HttpErrorResponse) => {
                    this.spinnerService.hide();
                    if (err.error instanceof Error) {
                    }
                    else {
                    }
                }
            );
    }
}
