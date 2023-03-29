import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient ) { }
  url="http://localhost:3000/posts"

  postuser( data :any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))

  }
  getuser( ){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))

  }
  updateuser( data :any,id:number){
    return this.http.put(this.url+"/"+id,data)
      

  }
  deleteuse( id:number){
    return this.http.delete(this.url+"/"+id)
    }

  }

