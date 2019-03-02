import { Component } from '@angular/core';
import { DataService} from  '../services/data.service'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'sandbox',
  templateUrl: './sandbox.component.html'
})
export class SandboxComponent  {



  location={

  	city:"london"
  };
   
  constructor(public dataService: DataService){
        this.dataService.getWeather(this.location.city).subscribe((response)=>{
   		console.log(response);
   	});
   
  }

  
  


  
}