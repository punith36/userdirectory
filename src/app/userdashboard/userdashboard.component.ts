import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { usermodel } from '../shared/user';
import { UserService } from '../shared/user.service';



@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
  providers:[UserService]
})
export class UserdashboardComponent {

  

  formvalue!:FormGroup;
  usermodelobj:usermodel=new usermodel();
  userdata!:any;
  showadd !:boolean;
  showupdate!:boolean;
  
  constructor( private formbuilder :FormBuilder , private api:UserService,private router:Router){}


  ngOnInit(){
    this.formvalue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:[''],
      mobile:[''],
      gender:['']
    })
    this.getuserdetails();
  }

  clickadduser(){
    this.formvalue.reset();
    this.showadd=true;
    this.showupdate=false;

  }

  
  postuserdetails(){
    this.usermodelobj.firstName=this.formvalue.value.firstName;
    this.usermodelobj.lastName=this.formvalue.value.lastName;
    this.usermodelobj.email=this.formvalue.value.email;
    this.usermodelobj.password=this.formvalue.value.password;
    this.usermodelobj.mobile=this.formvalue.value.mobile;
    this.usermodelobj.gender=this.formvalue.value.gender;

    
   this.api.postuser(this.usermodelobj).subscribe( res =>{
    alert('user-added successfully');
   let ref=document.getElementById('close')
   ref?.click();
    this.formvalue.reset();
 this.getuserdetails();
   },
   err=>{
    alert('something went worng');
   })
   
   

   }
getuserdetails(){
  this.api.getuser().subscribe(res=>
    {
       this.userdata=res;
    }
    )
}
deleteuse(id:any){
  this.api.deleteuse(id).subscribe(res=>
    {
      alert('user deleted')
      this.getuserdetails()
    },
    err=>{
      alert('error')
    })
}
   
onedit(row:any){
  this.usermodelobj.id=row.id;
  this.formvalue.controls['firstName'].setValue(row.firstName);
  this.formvalue.controls['lastName'].setValue(row.lastName);
  this.formvalue.controls['email'].setValue(row.email);
  this.formvalue.controls['password'].setValue(row.password);
  this.formvalue.controls['mobile'].setValue(row.mobile);
  this.formvalue.controls['gender'].setValue(row.gender);
  this.showadd=false;
  this.showupdate=true;

}
updateuserdetails(){

  this.usermodelobj.firstName=this.formvalue.value.firstName;
    this.usermodelobj.lastName=this.formvalue.value.lastName;
    this.usermodelobj.email=this.formvalue.value.email;
    this.usermodelobj.mobile=this.formvalue.value.mobile;
    this.usermodelobj.gender=this.formvalue.value.gender;

    this.api.updateuser(this.usermodelobj,this.usermodelobj.id).subscribe(res=>{
      alert('udated successfully')
      let ref=document.getElementById('close')
   ref?.click();
    this.formvalue.reset();
 this.getuserdetails();
    }
      )


}
mylogin(){
  this. router.navigate(['login'])

}
mysignup(){
  this. router.navigate(['signup'])

}

  }


