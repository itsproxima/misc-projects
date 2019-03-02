import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, FormControlName, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NgZone } from '@angular/core';
import { TransportManager } from "../../services/TransportManager";
import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { HttpErrorResponse } from "@angular/common/http";
import { Category } from "../../model/Category";
import { NgbModal, NgbActiveModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AddProduct } from "../../model/AddProduct";
import { UserModel } from "../../model/userDetails";
import { ProductDetailsData } from "../../model/ProductDetails";
import { AddSubCat } from '../../model/AddSubCat';
import { SubcatData } from '../../model/SubcatData';
import { ComboData } from '../../model/ComboData';
import { isNumber } from 'util';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
    category: Category[];
    actCat: Category[];
    items: any[] = [];
    cat: Category;
    addSub: AddSubCat;
    categoryName: string = "";
    active: number = -1;
    addProduct: AddProduct;
    comboData: ComboData;
    invoiceForm: FormGroup;
    updateForm: FormGroup;
    userDetails: UserModel;
    counter: number;
    maxSize: number;
    productDetailss: ProductDetailsData[] = [];
    finished = false;
    product: ProductDetailsData;
    updateCatId: number = 0;
    subCatData: SubcatData
    constructor(private fb: FormBuilder, private modalService: NgbModal, lc: NgZone, private toastrs: ToastrService, private report: TransportManager, private spinnerService: Ng4LoadingSpinnerService) {
        this.addProduct = new AddProduct();
        this.product = new ProductDetailsData();
        this.addSub = new AddSubCat();
        this.counter = 0;
        this.subCatData = new SubcatData();
        this.comboData = new ComboData();
        this.userDetails = JSON.parse(localStorage.getItem("user"));
        // window.onscroll = () => {
        //     let status = "not reached";
        //     let windowHeight = "innerHeight" in window ? window.innerHeight
        //         : document.documentElement.offsetHeight;
        //     let body = document.body, html = document.documentElement;
        //     let docHeight = Math.max(body.scrollHeight,
        //         body.offsetHeight, html.clientHeight,
        //         html.scrollHeight, html.offsetHeight);
        //     let windowBottom = windowHeight + window.pageYOffset;
        //     if (windowBottom >= docHeight) {
        //         status = 'bottom reached';
        //     }
        //     lc.run(() => {
        //         this.statusText = status;
        //     });
        // };
    }

    onKey(event: any) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 190) {
            return true;
        } else {
            event.cancel();
        }
    }
    check_if_is_integer(value) {
        if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
            // I can have spacespacespace1 - which is 1 and validators pases but
            // spacespacespace doesn't - which is what i wanted.
            // 1space2 doesn't pass - good
            // of course, when saving data you do another parseInt.
            return true;
        } else {
            return false;
        }
    }
    onScroll() {
        this.getProduct(this.addProduct.categoryId, this.addProduct.subcategoryId);
    }
    addSubCat() {
        if (this.addSub.categoryId == 0) {
            this.toastrs.error("Select Category");
        } else if (this.addSub.subcategoryName.trim().length == 0) {
            this.toastrs.error("Enter Subcat Name");
        }
        else if (this.addSub.active == -1) {
            this.toastrs.error("Select Active Field");
        }
        else {
            //    this.spinnerService.show();
            this.report.addSubCat(this.addSub).subscribe(res => {
                this.spinnerService.hide();
                if (res.data == true) {
                    this.addSub.active = -1;
                    this.addSub.categoryId = 0;
                    this.addSub.subcategoryName = "";
                    this.toastrs.success("SubCat Added Successfully");
                }
                else {
                    this.toastrs.error(res.message);
                }
            }, (err: HttpErrorResponse) => {
                this.spinnerService.hide();
                if (err.error instanceof Error) {
                    this.spinnerService.hide();
                    console.log('An error occurred:', err.error.message);
                }
                else {
                    this.spinnerService.hide();
                    console.log("An error occured");
                }
                this.spinnerService.hide();
            });
        }
    }
    addProducts() {
        if (this.addProduct.categoryId == 0) {
            this.toastrs.error("Select Category");
        } else if (this.addProduct.subcategoryId == -1) {
            this.toastrs.error("Select SubCategory");
        } else if (this.addProduct.productName.trim().length == 0) {
            this.toastrs.error("Enter Product Name");
        }
        else {
            const control = <FormArray>this.invoiceForm.controls['itemRows'];
            this.addProduct.quantity = control.at(0).value["quantity"];
            if (this.addProduct.quantity == null) {
                this.toastrs.error("Enter Measurement");
                return;
            }
            this.addProduct.type = control.at(0).value["type"];
            if (this.addProduct.type == null) {
                this.toastrs.error("Select Type");
                return;
            }
            this.addProduct.sellingPrice = control.at(0).value["sellingPrice"];
            if (this.addProduct.sellingPrice == null) {
                this.toastrs.error("Enter Selling Price");
                return;
            }
            for (var i = 1; i < control.length; i++) {
                this.comboData.product_amount = control.at(i).value["quantity"];
                if (this.comboData.product_amount == null) {
                    this.toastrs.error("Enter Measurement");
                }
                this.comboData.combo_price = control.at(i).value["sellingPrice"];
                if (this.comboData.combo_price == null) {
                    this.toastrs.error("Enter Selling Price");
                    return;
                }
                this.addProduct.combodata.push(this.comboData);
            }

            this.spinnerService.show();
            this.report.addProduct(this.addProduct, this.userDetails.userId).subscribe(res => {
                this.spinnerService.hide();
                if (res.data == true) {
                    this.toastrs.success("Product Added Successfully");
                    this.invoiceForm.reset({ quantity: '', type: '', sellingPrice: "" });
                    this.addProduct.categoryId = 0;
                    this.addProduct.subcategoryId = 0;
                    this.addProduct.productName = "";
                    this.addProduct.quantity = "";
                    this.addProduct.type = "";
                    this.addProduct.sellingPrice = "";
                }
                else {
                    this.toastrs.error(res.message);
                }
            }, (err: HttpErrorResponse) => {
                this.spinnerService.hide();
                if (err.error instanceof Error) {
                    this.spinnerService.hide();
                    console.log('An error occurred:', err.error.message);
                }
                else {
                    this.spinnerService.hide();
                    console.log("An error occured");
                }
                this.spinnerService.hide();
            });
        }
    }
    updateProducts() {
        if (this.product.categoryId == 0) {
            this.toastrs.error("Please Select Category");
        }
        else if (this.product.productName.trim().length == 0) {
            this.toastrs.error("Please Enter Product");
        }
        else {
            this.product.subIdnew=this.product.subCatId;
            const control = <FormArray>this.updateForm.controls['itemRows'];
            this.product.quantity = control.at(0).value["quantity"];
            if (this.product.quantity == null) {
                this.toastrs.error("Enter Measurement");
                return;
            }
            this.product.type = control.at(0).value["type"];
            if (this.product.type == null) {
                this.toastrs.error("Select Type");
                return;
            }
            this.product.sellingPrice = control.at(0).value["sellingPrice"];
            if (this.product.sellingPrice == null) {
                this.toastrs.error("Enter Selling Price");
                return;
            }
            this.product.combodata=[];
            // if (this.addProduct.combodata != null) {
            //     while (this.addProduct.combodata.length !== 0) {
            //         console.log("inside while");
            //         this.addProduct.combodata.pop;
            //     }
            // }
            for (var i = 1; i < control.length; i++) {
                this.comboData.product_amount = control.at(i).value["quantity"];
                this.comboData.combo_id=control.at(i).value["combo_id"];
                if (this.comboData.product_amount == null) {
                    this.toastrs.error("Enter Measurement");
                }
                this.comboData.combo_price = control.at(i).value["sellingPrice"];
                if (this.comboData.combo_price == null) {
                    this.toastrs.error("Enter Selling Price");
                    return;
                }
                this.product.combodata.push(this.comboData);
            }
            this.spinnerService.show();
            this.report.updateProduct(this.product, this.userDetails.userId).subscribe(res => {
                this.spinnerService.hide();
                if (res.code == "00" && res.data == true) {
                    this.toastrs.success("Updated Successfully");
                    window.location.reload();
                }
                else {
                    this.toastrs.success(res.message);
                }
            }, (err: HttpErrorResponse) => {
                this.spinnerService.hide();
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                }
                else {
                    console.log("An error occured");
                }
                this.spinnerService.hide();
            })
        }
    }
    ngOnInit() {
        this.spinnerService.show();
        this.getAllCategory();
        this.getActiveCategory();
        // this.getProduct();
        this.invoiceForm = this.fb.group({
            itemRows: this.fb.array([this.initItemRows()]) // here
        });
    }
    initItemRows() {
        return this.fb.group({
            quantity: new FormControl(),
            type: new FormControl(),
            sellingPrice: new FormControl(),
            combo_id: new FormControl()
        });
    }
    addNewRow() {
        // control refers to your formarray
        const control = <FormArray>this.invoiceForm.controls['itemRows'];
        // add new formgroup
        control.push(this.initItemRows());

    }
    addUpdateRow(combodata?: ComboData) {
        const control = <FormArray>this.updateForm.controls['itemRows'];
        // add new formgroup
        const form = this.initItemRows();
        if (combodata != null)
            form.setValue({ quantity: combodata.product_amount, type: combodata.type, sellingPrice: combodata.combo_price, combo_id: combodata.combo_id });
        else
            form.setValue({ quantity: "", type: this.product.type, sellingPrice: "", combo_id: 0 });
        control.push(form);
    }
    deleteUpdateRow(index: number) {
        // control refers to your formarray
        const control = <FormArray>this.updateForm.controls['itemRows'];
        // remove the chosen row
        control.removeAt(index);
    }
    deleteRow(index: number) {
        // control refers to your formarray
        const control = <FormArray>this.invoiceForm.controls['itemRows'];
        // remove the chosen row
        control.removeAt(index);
    }
    update(contents, c) {
        this.cat = Object.assign(c);
        this.modalService.open(contents);
    }
    updateProduct(contents, c) {
        this.product = Object.assign({}, this.product, c);
        // this.product=c;
        this.product.categoryId = this.addProduct.categoryId;
        this.product.subCatId = this.addProduct.subcategoryId;
        for (var i = 0; i < this.actCat.length; i++) {
            if (this.actCat[i].id === this.addProduct.categoryId) {
                this.product.categoryName = this.actCat[i].categoryName;
            }
        }
        this.onChangeCat(this.product.categoryId);
        const form = this.initItemRows();
        form.setValue({ quantity: this.product.quantity, type: this.product.type, sellingPrice: this.product.sellingPrice, combo_id: 0 })
        this.updateForm = this.fb.group({
            itemRows: this.fb.array([form]) // here  
        });
        if (this.product.combodata != null) {
            for (var i = 0; i < this.product.combodata.length; i++) {
                this.product.combodata[i].type = this.product.type;
                this.addUpdateRow(this.product.combodata[i]);
            }
        }
        this.modalService.open(contents);
    }
    getAllCategory() {
        this.report.getAllCategory().subscribe(res => {
            this.spinnerService.hide();
            if (res.code == '00') {
                this.spinnerService.hide();
                this.category = res.data;
                this.toastrs.success(res.message);
            }
            else {
                this.spinnerService.hide();
                this.toastrs.error(res.message);
            }
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

    updateCat() {
        if (this.cat.categoryName.trim().length == 0) {
            this.toastrs.error("Enter Category Name");
        }
        else if (this.cat.active == -1) {
            this.toastrs.error("Select Active Value");
        }
        else {
            this.report.updateCategory(this.cat).subscribe(res => {
                if (res.code == "00" && res.data == 1) {
                    this.toastrs.success("Updated Successfully");
                    this.getAllCategory();
                }
                else {
                    this.spinnerService.hide();
                    this.toastrs.warning(res.message);
                    this.spinnerService.hide();
                }
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

    addCategory() {
        if (this.categoryName.trim().length == 0) {
            this.toastrs.error("Enter Category Name");
        }
        else if (this.active == -1) {
            this.toastrs.error("Select Active Value");
        }
        else {
            this.spinnerService.show();
            this.report.addCategory(this.categoryName, this.active).subscribe(res => {
                if (res.code == "00" && res.data == true) {
                    this.toastrs.success("Added Successfully");
                    this.categoryName = "";
                    this.active = -1;
                    this.getAllCategory();
                }
                else {
                    this.spinnerService.hide();
                    this.toastrs.warning(res.message);
                }
            }, (err: HttpErrorResponse) => {
                this.spinnerService.hide();
                if (err.error instanceof Error) {
                    this.toastrs.error(err.error.message);
                }
                else {
                    this.toastrs.error("An error occured");
                }
                this.spinnerService.hide();
            });
        }
    }

    private getActiveCategory() {
        this.report.getActiveCategory().subscribe(res => {
            this.spinnerService.hide();
            if (res.code == '00') {
                this.spinnerService.hide();
                this.actCat = res.data;
                this.toastrs.success(res.message);
            }
            else {
                this.spinnerService.hide();
                this.toastrs.error(res.message);
            }
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

    private getProduct(catId: number, subId: number) {
        this.spinnerService.hide();
        this.report.getAllProduct(catId, subId, this.productDetailss.length).subscribe(res => {
            if (res.code == "00") {
                if (this.productDetailss.length == 0)
                    this.productDetailss = res.data;
                else {
                    for (var i = 0; i < res.data.length; i++) {
                        this.productDetailss.push(res.data[i]);
                    }
                }
                this.maxSize = res.count;
                if (this.productDetailss.length == this.maxSize)
                    this.finished = true;
            }
            else {
                this.finished = true;
            }
        }, (err: HttpErrorResponse) => {
            this.spinnerService.hide();
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            }
            else {
                console.log("An error occured");
            }
            this.spinnerService.hide();
        })
    }
    onChangeCat(newValue) {
        this.report.getSubCatByCategory(newValue).subscribe(res => {
            if (res.code == "00") {
                this.subCatData = res.data;
            }

        }, (err: HttpErrorResponse) => {
            this.spinnerService.hide();
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            }
            else {
                console.log("An error occured");
            }
            this.spinnerService.hide();
        })
    }

    //search product
    search() {
        if (this.addProduct.categoryId == 0) {
            this.toastrs.error("Please Select Category");
        }
        else if (this.addProduct.subcategoryId == 0) {
            this.toastrs.error("Please Select SubCategory");
        }
        else {
            this.spinnerService.show();
            this.getProduct(this.addProduct.categoryId, this.addProduct.subcategoryId);
        }
    }

}
