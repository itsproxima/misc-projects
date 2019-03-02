import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router'
import {OrderDetails} from '../../model/OrderDetails';
import {TransportManager} from '../../services/TransportManager';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';
import {OrderDetailsById} from '../../model/OrderDetailsById';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
    selector: 'order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
    orderHistory: OrderDetails[];
    order: OrderDetails;
    orderDetailsBYId: OrderDetailsById[];
    headerName: string;

    constructor(private spinnerService: Ng4LoadingSpinnerService, private router: Router, private orderService: TransportManager, private modalService: NgbModal) {
        this.spinnerService.show();
        this.headerName = "";
    }

    ngOnInit() {
        this.spinnerService.show();
        this.orderService.orderHistory().subscribe(res => {
            if (res.code == '00') {
                this.spinnerService.hide();
                this.orderHistory = res.data;
            }
            else {
                this.spinnerService.hide();
                console.log(res.message);
            }
        }, (err: HttpErrorResponse) => {
            this.spinnerService.hide();
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            }
            else {
                console.log("An error occured");
            }
        });
    }

    onHeader(header: string) {
        this.headerName = header;
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    getData(c, data) {
        this.order = data;
        this.orderService.orderDetailsById(this.order.cartId).subscribe(res => {
            if (res.code == '00') {
                this.orderDetailsBYId = res.data;
                this.modalService.open(c).result.then((result) => {

                }, (reason) => {

                });
            }
            else {
                console.log(res.message);
            }
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            }
            else {
                console.log("An error occured");
            }
        });
    }
}
