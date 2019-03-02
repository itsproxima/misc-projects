import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {TransportManager} from '../../services/TransportManager';
import {OrderDetails} from '../../model/OrderDetails';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {OrderDetailsById} from '../../model/OrderDetailsById';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
    orderHistory: OrderDetails[];
    order: OrderDetails;
    headerName: "Order Details";
    orderDetailsBYId: OrderDetailsById[];

    constructor(private toastrs: ToastrService,public toastr: ToastsManager,private spinnerService: Ng4LoadingSpinnerService, private orderDetails: TransportManager, private modalService: NgbModal,vcr: ViewContainerRef) {
        this.spinnerService.show();
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.spinnerService.show();
        this.orderDetails.orderDetails().subscribe(res => {
            if (res.code == '00') {
                this.spinnerService.hide();
                this.orderHistory = res.data;
            }
            else {
                this.spinnerService.hide();
            }
        }, (err: HttpErrorResponse) => {
            this.spinnerService.hide();
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            }
            else {
                this.spinnerService.hide();
                console.log("An error occured");
                this.spinnerService.hide();
            }
        });

    }

    getData(c, data) {
        this.order = data;
        this.spinnerService.show();
        this.orderDetails.orderDetailsById(this.order.cartId).subscribe(res => {
            if (res.code == '00') {
                this.spinnerService.hide();
                this.orderDetailsBYId = res.data;
                this.modalService.open(c).result.then((result) => {

                }, (reason) => {

                });
            }
            else {
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

    acceptOrder() {
        this.spinnerService.show();
        this.orderDetails.approve(this.order.cartId).subscribe(res => {
            this.spinnerService.hide();
            if (res.code == '00') {
                this.toastrs.success(res.message, 'Success');
                location.reload();
            }
            else {
                this.toastrs.error(res.message, 'Error');
            }
        }, (err: HttpErrorResponse) => {
            this.toastrs.error(err.message, 'Error');
        });
    }

    dispatch() {
        this.spinnerService.show();
        this.orderDetails.dispatch(this.order.cartId).subscribe(res => {
            this.spinnerService.hide();
            if (res.code == '00') {
                this.toastrs.success("Order Dispatched", 'Success');
                location.reload();
            }
            else {
                this.toastrs.error(res.message, 'Error');
            }
        }, (err: HttpErrorResponse) => {
            this.toastrs.error(err.message, 'Error');
        });
    }

    delivery() {
        this.spinnerService.show();
        this.orderDetails.delivery(this.order.cartId).subscribe(res => {
            this.spinnerService.hide();
            if (res.code == '00') {
                this.toastrs.success("Order Delivered", 'Success!');
                location.reload();
            }
            else {
                this.toastrs.error(res.message, 'Error');
            }
        }, (err: HttpErrorResponse) => {
            this.toastrs.error(err.message, 'Error');
        });
    }
}
