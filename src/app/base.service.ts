import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url="https://fleet-d5851-default-rtdb.firebaseio.com/cars"
  token:any
  private carsSub = new Subject()
  constructor(private http:HttpClient, private afAuth:AngularFireAuth ) { 
    this.downlaodCars()
    
    this.afAuth.authState.subscribe(
      (user)=>{
        if (user) {
          user.getIdToken().then((t)=>
            {
              this.token=t
              console.log("Token", this.token)
            })
        }
        else this.token=null
      }
    )
  
  }
  googeAuth(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }
  sighOut(){
    this.afAuth.signOut()
  }
  getCars(){
    return this.carsSub
  }

  addCar(car:any){
    let headers = new HttpHeaders().set('Authorization',"Bearer "+this.token)
    this.http.post(this.url+".json?auth="+this.token,car,{headers}).forEach(
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
