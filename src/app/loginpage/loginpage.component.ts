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
    this.loginForm = this.formBuilder.group({
      user: [''],
      password: [''],

    }) 
  }

login(){
  if(!this.loginForm.valid){
    return
  }
    const credential ={
      email :this.loginForm.value.user,
      password : this.loginForm.value.password,
    }
    console.log(credential);
    
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
