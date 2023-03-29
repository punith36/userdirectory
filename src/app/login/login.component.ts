import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform!:FormGroup;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router){

  }
  ngOnInit():void{
    this.loginform=this.formbuilder.group({
      email:[''],
      password:['']
    })
  }
  

  
  login(){
    this.http.get<any>("http://localhost:3000/posts").subscribe(res=>{
      const users= res.find((a:any)=>{
        return a.email===this.loginform.value.email && a.password===this.loginform.value.password
      });
      if(users){
        alert('login succesfully');
        this.loginform.reset();
        this. router.navigate(['userdashboard'])


      }
      else{
        alert('user not found')
      }
    })


  }

}
