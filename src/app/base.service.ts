import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url="https://fleet-d5851-default-rtdb.firebaseio.com/cars"


  private carsSub = new Subject()

  constructor(private http:HttpClient) { 
    this.downlaodCars()
  }

  getCars(){
    return this.carsSub
  }

  addCar(car:any){
    this.http.post(this.url+".json",car).forEach(
      ()=>this.downlaodCars()
    )
  }
  deleteCar(car:any){
    this.http.delete(this.url+"/"+car.key+".json").forEach(
      ()=>this.downlaodCars()
    )
  }
  putCar(car:any){
    let key=car.key
    delete car.key
    this.http.put(this.url+"/"+key+".json",car).forEach(
      ()=>this.downlaodCars()
    )
  }

  private downlaodCars(){
    this.http.get(this.url+".json").subscribe(
      (res:any)=>{
        let cars=[]
        for (const key in res) {
            cars.push( {key:key, ...res[key]} )
          }

        this.carsSub.next(cars)
        }
    )
  }
  
}
