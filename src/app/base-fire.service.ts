import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseFireService {
  
  carsRef: AngularFireList<any>
  token:any

  constructor(private db: AngularFireDatabase) {
    this.carsRef=db.list("cars")

    
   }

  getCars(){
    return this.carsRef
  }

  addCar(car:any){
    this.carsRef.push(car)
  }
  
  putCar(car:any){
    let key= car.key
    delete car.key
    this.carsRef.update(key,car)
  }

  deleteCar(car:any){
    this.carsRef.remove(car.key)
  }



}
