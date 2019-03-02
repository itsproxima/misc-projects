import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TransportManager } from '../../services/TransportManager';
import { OrderDetails } from '../../model/OrderDetails';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsById } from '../../model/OrderDetailsById';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { PapaParseService } from 'ngx-papaparse';

@Component({
    selector: 'bulk-upload',
    templateUrl: './bulkUpload.component.html',
    styleUrls: ['./bulkUpload.component.css']
})
export class BulkComponent implements OnInit {
    name: any;
    orderHistory: OrderDetails[];
    order: OrderDetails;
    headerName: "Order Details";
    orderDetailsBYId: OrderDetailsById[];
    csvRecords = [];
    tokenDelimeter = ",";
    isHeaderPresentFlag = true;
    validateHeaderAndRecordLengthFlag = true;
    valildateFileExtenstionFlag = true;
    constructor(private papa: PapaParseService, private toastrs: ToastrService, private report: TransportManager, public toastr: ToastsManager, private spinnerService: Ng4LoadingSpinnerService, private orderDetails: TransportManager, private modalService: NgbModal, vcr: ViewContainerRef) {
        // this.spinnerService.show();
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {


    }
    bulkUpload() {
        if (this.csvRecords == null)
            alert("Upload Csv File");
        else {
            this.report.bulkUpload(this.csvRecords).subscribe(res => {
                this.spinnerService.hide();
                console.log(JSON.stringify(res));
            }, (err: HttpErrorResponse) => {
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
    file: any;
    fileChanged(e) {
        this.file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(this.file);
        reader.onload = (data) => {
            let csvData = reader.result;
            let csvRecordsArray = csvData.split(/\r\n|\n/);

            var headerLength = -1;
            if (this.isHeaderPresentFlag) {
                let headersRow = this.getHeaderArray(csvRecordsArray, this.tokenDelimeter);
                headerLength = headersRow.length;
                console.log(headerLength + " length");
            }

            this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray,
                headerLength, this.validateHeaderAndRecordLengthFlag, this.tokenDelimeter);
            if (this.csvRecords == null) {
                //If control reached here it means csv file contains error, reset file.
                alert("Error Occured");
            }
            console.log(JSON.stringify(this.csvRecords));
        }
    }
    isCSVFile(file) {
        return file.name.endsWith(".csv");
    }

    getHeaderArray(csvRecordsArr, tokenDelimeter) {
        let headers = csvRecordsArr[0].split(tokenDelimeter);
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    validateHeaders(origHeaders, fileHeaaders) {
        if (origHeaders.length != fileHeaaders.length) {
            return false;
        }

        var fileHeaderMatchFlag = true;
        for (let j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] != fileHeaaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,
        validateHeaderAndRecordLengthFlag, tokenDelimeter) {
        var dataArr = []
        console.log("csvRecordsArray.length" + csvRecordsArray.length);
        for (let i = 1; i < csvRecordsArray.length - 1; i++) {
            let data = csvRecordsArray[i].split(tokenDelimeter);
            if (validateHeaderAndRecordLengthFlag && data.length != headerLength) {
                if (data == "") {
                    alert("Extra blank line is present at line number " + i + ", please remove it.");
                    return null;
                } else {
                    alert("Record at line number " + i + " contain " + data.length + " tokens, and is not matching with header length of :" + headerLength);
                    return null;
                }
            }

            let col = [];
            for (let j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }
        return dataArr;
    }
}
