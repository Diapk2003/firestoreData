import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { HotToastService} from '@ngneat/hot-toast'

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  public showPassword !: boolean;
 loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router, private auth:FireserviceService, private toast:HotToastService) { }
  username:string = '';
  password:string = '';


  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   user: ['dipak'],
    //   password: ['123'],

    // }) 
    this.loginForm = this.formBuilder.group({
      user: [''],
      password: [''],

    }) 
  }

//   login() {
//     console.log(this.loginForm.value.user)
//     const user = this.loginForm.value.user
//     const password = this.loginForm.value.password
//     if (user === this.username && password === this.password) {
//       alert("login is Succesful !!"),
//         this.router.navigate(['dashbord'])
//     } else {
//       alert("invalid password or username")
//     }

//   }
 
//  method_username(e:any){
//     this.username = e.target.value;
//   }
//   method_password(e:any){
//     this.password = e.target.value;
//   } 

login(){
  if(!this.loginForm.valid){
    return
  }
    const credential ={
      email :this.loginForm.value.user,
      password : this.loginForm.value.password,
    }
    console.log(credential);

    // const {email,password } = this.loginForm.value
    // console.log(email,password);
    
    
  this.auth.login(credential.email,credential.password).pipe(
    this.toast.observe({
      success:'Logged in successfully..',
      loading:'Logging in...',
      error:'Login Details Invalid..'
    })
    ).subscribe((res)=>{
      console.log(res);
      console.log(res.operationType);
      
    this.router.navigate(['dashbord'])
  })

  
}

 
}
