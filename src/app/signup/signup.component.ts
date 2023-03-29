import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  signupform!:FormGroup;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router){

  }
  ngOnInit():void{
   this.signupform= this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:[''],
      mobile:[''],
      gender:[''],
  


    })
  }
  signup(){
    return this.http.post<any>("http://localhost:3000/posts",this.signupform.value).subscribe(res=>{
      alert('signup successfully');
      this.signupform.reset();
      this.router.navigate(['login'])
    })

  }

}
