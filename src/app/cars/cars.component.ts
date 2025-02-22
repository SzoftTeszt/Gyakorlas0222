import { Component } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {

    cars:any
    newCar:any
    constructor(private base:BaseService){

      this.base.getCars().subscribe(
        (res)=>this.cars=res
      )

    }

      
    

    addCar(){
      this.base.addCar(this.newCar)
    }
}
