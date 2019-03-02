import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataService} from  '../services/data.service';
import {HttpClient}  from '@angular/common/http';

 
@Component({
  selector: 'test',
  templateUrl: './test.component.html'
})
export class TestComponent {
  


  name:string='';
  constructor(private httpClient:HttpClient ,public dataService: DataService){

      //console.log(this.dataService.getUsers() )


     
  }
 

   onNameKeyUp(event:any){
        this.name=event.target.value;
      }

   getProfile(){

     /*console.log(this.name);*/
     this.httpClient.get(`https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles/?name=${this.name}`)
     .subscribe(
         (data:any[])=>{
           console.log(data);
         }
       )
   }
 



  
}