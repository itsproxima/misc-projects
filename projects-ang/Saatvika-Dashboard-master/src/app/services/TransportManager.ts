import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod, Response} from '@angular/http';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GlobalVariable} from '../globals';
import {ResultModel} from '../model/result';
import {Category} from "../model/Category";
import {AddProduct} from "../model/AddProduct";
import {ProductDetailsData} from "../model/ProductDetails";
import { AddSubCat } from '../model/AddSubCat';

@Injectable()
export class TransportManager {
    private apiUrl = "http://www.bloomsmobility.com/saatvik/api/";
    subscription: any;
    private header = new Headers({'Content-Type': 'application/json'});
    option = new RequestOptions({headers: this.header});

    constructor(private http: Http, private router: Router) {

    }

    validateUser(emailId: string, password: string): Observable<ResultModel> {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        let body = `emailId=${emailId}&password=${password}`;
        this.subscription = this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendor_login', body, this.getLocalToken())
            .map((res: Response) => res.json());
        return this.subscription;
    }

    private getLocalToken() {
        // create authorization header with jwt token
        let headers = new Headers({'Authorization': 'Apikey zaqwsxcderfvbgtyhnmjuiklop'});
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new RequestOptions({headers: headers});
    }

    orderHistory(): Observable<ResultModel> {
        let body = `storeKey=saroj`;
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendordatadetails', body, this.getLocalToken()).map((res: Response) => res.json());
    }

    orderDetails(): Observable<ResultModel> {
        let body = `storeKey=saroj`;
        return this.http.get(GlobalVariable.BASE_API_URL + 'vendor/vendororderdata?'+body, this.getLocalToken()).map((res: Response) => res.json());
    }

    orderDetailsById(cartId: number): Observable<ResultModel> {
        let body = `storeKey=saroj&cartId=` + cartId;
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendororderdetails', body, this.getLocalToken()).map((res: Response) => res.json());
    }

    delivery(cartId: number): Observable<ResultModel> {
        let body = `storeKey=saroj&cartId=` + cartId;
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendordelivery', body, this.getLocalToken()).map((res: Response) => res.json());
    }

    approve(cartId: number): Observable<ResultModel> {
        let body = `storeKey=saroj&cartId=` + cartId;
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendorapprove', body, this.getLocalToken()).map((res: Response) => res.json());
    }

    dispatch(cartId: number): Observable<ResultModel> {
        let body = `storeKey=saroj&cartId=` + cartId;
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendordispatch', body, this.getLocalToken()).map((res: Response) => res.json());
    }

    report(startDate: string, endDate: string, type: number): Observable<ResultModel> {
        let body = `storeKey=saroj&fromDate=` + startDate + `&toDate=` + endDate + `&type=` + type;
        return this.http.post(GlobalVariable.BASE_API_URL + 'order/totalproductbydate', body, this.getLocalToken()).map((res: Response) => res.json());
    }
    assignDate(startDate: string, endDate: string): Observable<ResultModel> {
        let body = `orderReceivingDate=` + startDate + `&nextDeliveryDate=` + endDate ;
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/setorderingdate',JSON.stringify( body), this.getLocalToken()).map((res: Response) => res.json());
    }

    getAllCategory(): Observable<ResultModel> {
        return this.http.get(GlobalVariable.BASE_API_URL + 'vendor/categoryall', this.getLocalToken()).map((res: Response) => res.json());
    }

    updateCategory(update: Category): Observable<ResultModel> {
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/categoryupdate', JSON.stringify(update), this.getLocalToken()).map((res: Response) => res.json());
    }

    addCategory(catName: string, active: number): Observable<ResultModel> {
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/categoryadd', JSON.stringify({
            "categoryName": catName,
            "active": active
        }), this.getLocalToken()).map((res: Response) => res.json());
    }

    getActiveCategory(): Observable<ResultModel> {
        return this.http.get(GlobalVariable.BASE_API_URL + 'product/allcategory', this.getLocalToken()).map((res: Response) => res.json());
    }

    addProduct(addProduct: AddProduct, userId: number): Observable<ResultModel> {
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/addproduct?userId=' + userId, JSON.stringify(addProduct), this.getLocalToken()).map((res: Response) => res.json());
    }

    addSubCat(addSub:AddSubCat): Observable<ResultModel> {
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/subcategoryadd',JSON.stringify(addSub), this.getLocalToken()).map((res: Response) => res.json());
    }

    getAllProduct(catId:number,subId:number,size:number):Observable<ResultModel>{
        let body=`subCatId=`+subId+`&storeKey=saroj&catId=`+catId+`&size=`+size;
        return this.http.post(GlobalVariable.BASE_API_URL + 'product/allproductwithcombo' , body, this.getLocalToken()).map((res: Response) => res.json());
    }

    updateProduct(product:ProductDetailsData,userId:number):Observable<ResultModel>{
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/vendorproductupdate?userId='+userId,JSON.stringify(product), this.getLocalToken()).map((res: Response) => res.json());
    }
    getSubCatByCategory(catId):Observable<ResultModel>{
        let body=`categoryId=`+catId;
        return this.http.post(GlobalVariable.BASE_API_URL + 'product/subCategoryById',body, this.getLocalToken()).map((res: Response) => res.json());
    }
    bulkUpload(file):Observable<ResultModel>{
        return this.http.post(GlobalVariable.BASE_API_URL + 'vendor/uploadfmcsv',JSON.stringify(file), this.getLocalToken()).map((res: Response) => res.json());
    }
}
