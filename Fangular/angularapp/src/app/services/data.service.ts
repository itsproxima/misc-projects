import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
//import  'rxjs/add/operator/map ';
import 'rxjs/add/operator/filter';
import { filter } from 'rxjs/operators';
import {Headers, RequestOptions, RequestMethod, Response} from '@angular/http';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';




@Injectable()
export class DataService {
	
	url;
  products:any;
  items:any;
  loading:any;
  constructor(public http:Http) { 
  			this.url='';
        this.products="";
        this.items="";
        this.loading="";
  }

  /*getUsers(){

  		return this.http.get('https://reqres.in/api/users?page=2')
  		.map(res=> res.json());
     
      
  }*/
  getUsers() {
        this.http.get('http://https://reqres.in/api/users?page=2')
            .subscribe((data: Response) => {
                this.items = data.json().body.results;
                this.loading.dismiss();
            },
            (error: any) => {
                console.log(error);
            });
            return this.items
    }


  getWeather(city){

  		return this.http.get(this.url+city)
  		.map(res=> res.json());




  }
}
