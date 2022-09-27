import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireserviceService } from '../fireservice.service';
import { HotToastService} from '@ngneat/hot-toast'
import { Router } from '@angular/router';


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

  constructor(private fb: FormBuilder, private auth:FireserviceService, private toast:HotToastService, private router:Router) { }

  ngOnInit(): void {
    this.formBuilder();
  }
  get createuserGenerate() {
    return this.createUserForm.controls 
   }

  formBuilder(): void {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z- /]*$/)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      },)
  }

  submitCreateUserData() {
    if(this.createUserForm.invalid){
      return;
    }
    const createUserData = {
        name:this.createUserForm.value.name,
        email:this.createUserForm.value.email,
        password:this.createUserForm.value.password
    }

    this.auth.signUp(createUserData.name,createUserData.email,createUserData.password).pipe(
      this.toast.observe({
        success:'Congrats! You are all sined up',
        loading:'Signing in',
        error:({messaage}) => `${messaage}`
        
      })
      ).subscribe(() => {
        this.router.navigate(['login'])
      })
  }

}
