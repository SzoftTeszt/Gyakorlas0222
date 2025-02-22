import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { BaseFireService } from '../base-fire.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {

    cars:any
    newCar:any={}
    // constructor(private base:BaseService){
    constructor(private base:BaseFireService, private baseRest:BaseService){

      // this.base.getCars().snapshotChanges().pipe(
      //   map(
      //     (ch)=>ch.map((c)=>({key:c.payload.key,...c.payload.val()}))
      //   )
      // )
      // .subscribe(
      //   (res)=>this.cars=res
      // )

      this.baseRest.getCars().subscribe(
        (res)=>this.cars=res
      )
    }     
    

    addCar(){
      this.baseRest.addCar(this.newCar)
      this.newCar={}
    }

    deleteCar(car:any){
      this.baseRest.deleteCar(car)
    }
    putCar(car:any){
      this.baseRest.putCar(car)
    }

    signIn(){
        this.baseRest.googeAuth()
    }

    signOut(){
      this.baseRest.sighOut()
    }
}
