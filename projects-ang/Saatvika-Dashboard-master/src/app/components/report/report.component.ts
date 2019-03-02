import {Component, OnInit} from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {IMyDate} from "mydatepicker/dist/interfaces/my-date.interface";
import {ToastrService} from "ngx-toastr";
import {TransportManager} from "../../services/TransportManager";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {OrderDetails} from "../../model/OrderDetails";
import {HttpErrorResponse} from "@angular/common/http";
import { OrderFilter } from '../../model/OrderFilter';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
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
    submit(){
        if(this.startDate.length==0){
            this.toastrs.warning("Enter Start Date");
        }
        else if(this.endDate.length==0){
            this.toastrs.warning("Enter End Date");
        }
        else if(new Date(this.startDate)==new Date(this.endDate)){
            this.toastrs.warning("Select Proper Format");
        }
        else{
            this.spinnerService.show();
            this.report.report(this.startDate,this.endDate,this.type).subscribe(res=>{
                this.spinnerService.hide();
                console.log(JSON.stringify(res));
                if(res.code=='00'){
                    this.spinnerService.hide();
                    this.orderHistory=res.data;
                    this.toastrs.success(res.message);
                }
                else{
                    this.spinnerService.hide();
                    this.toastrs.error(res.message);
                }
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
    }

    print(): void {
        let printContents, popupWin,printContents1;
        printContents = document.getElementById('print-section').innerHTML;
        
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(window.print());
        
        // popupWin.document.write(`
        //   <html>
        //     <head>
        //       <title>Print tab</title>
        //       <style>
        //       //........Customized style.......
        //       </style>
        //     </head>
        // <body onload="window.print();window.close()">${printContents}</body>
        //   </html>`
        // );
        
        popupWin.document.close();
    }
    
}
