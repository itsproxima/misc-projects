import {Component, OnInit} from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {IMyDate} from "mydatepicker/dist/interfaces/my-date.interface";
import {ToastrService} from "ngx-toastr";
import {TransportManager} from "../../services/TransportManager";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

import {HttpErrorResponse} from "@angular/common/http";
import { OrderFilter } from '../../model/OrderFilter';


@Component({
    selector: 'app-assign',
    templateUrl: './assign.component.html',
    styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
    startDate: string = '';
    endDate: string = '';
    type:number=0;
    orderHistory: OrderFilter[];
    myDatePickerOptions: IMyDpOptions = {
        // other options..
        dateFormat: 'yyyy-mm-dd',

    };
    myDatePickerOptionss: IMyDpOptions = {
        // other options..
        dateFormat: 'yyyy-mm-dd',
    };
    private start: string = 'Start a date';
    private end: string = 'End a date';

    
    constructor(private toastrs: ToastrService,private report:TransportManager,private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
    }
    
    onDateChanged(event: IMyDateModel) {
        this.startDate = event.formatted;
        this.myDatePickerOptionss.disableUntil = event.date;
    }

    onDateChangedd(event: IMyDateModel) {
        if (this.startDate.length == 0) {
            alert("Select Start Date");
        }
        else {
            this.endDate = event.formatted;
        }
    }
    updateDeliveryDate(){
        if(this.startDate.length==0){
            this.toastrs.warning("Enter Order Receiving Date");
        }
        else if(this.endDate.length==0){
            this.toastrs.warning("Enter Delivery Date");
        }
        else if(new Date(this.startDate)==new Date(this.endDate)){
            this.toastrs.warning("Select Proper Format");
        }
        else{
            this.spinnerService.show();
            this.report.assignDate(this.startDate,this.endDate).subscribe(res=>{
                this.spinnerService.hide();
               console.log(JSON.stringify(res));
            },(err: HttpErrorResponse) => {
                this.spinnerService.hide();
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                }
                else {
                    console.log("An error occured");
                }
                this.spinnerService.hide();
            });
        
    }

    
}}
