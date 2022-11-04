import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireserviceService } from '../fireservice.service';
import { HotToastService} from '@ngneat/hot-toast'
import { Router } from '@angular/router';
import { Database, ref, set } from '@angular/fire/database';


export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors["confirmPasswordValidator"]
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  createUserForm!: FormGroup
  public showPassword !: boolean;

  constructor(private fb: FormBuilder, private auth:FireserviceService, private toast:HotToastService, private router:Router,private db:Database) { }

  ngOnInit(): void {
    this.formBuilder();
  }
  get createuserGenerate() {
    return this.createUserForm.controls 
   }

  formBuilder(): void {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z- /]*$/)]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]{6,}")]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      },)
  }

  // submitCreateUserData() {
  //   if(this.createUserForm.invalid){
  //     return;
  //   }
  //   const createUserData = {
  //       name:this.createUserForm.value.name,
  //       email:this.createUserForm.value.email,
  //       password:this.createUserForm.value.password
  //   }

  //   this.auth.signUp(createUserData.name,createUserData.email,createUserData.password).pipe(
  //     this.toast.observe({
  //       success:'Congrats! You are all sined up',
  //       loading:'Signing in',
  //       error:({messaage}) => `${messaage}`
        
  //     })
  //     ).subscribe(() => {
  //       debugger
  //       this.router.navigate(['/login'])
  //     })
  // }


  submitCreateUserData(){ 
    set(ref(this.db,' New Users/' + this.createUserForm.value.name),{
      name:this.createUserForm.value.name,
        email:this.createUserForm.value.email,
        password:this.createUserForm.value.password
    })
    alert("Users add Succesfully....")
    this.router.navigate(['/login'])

  }


}
