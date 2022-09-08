import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from '../data';
import { FireserviceService } from '../fireservice.service';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  public showPassword !: boolean;
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router ,private dataService: FireserviceService) { }
  username:string = '';
  password:string = '';
  userId:any
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userid: [""],
      password: [""],
    })
  }
  submit() {
    const payload: LoginData = {
      id: '',
      data_userid: this.loginForm.value.userid,
      data_password: this.loginForm.value.password,

    }

    this.dataService.addloginData(payload).then((res)=>{
          if(res){
            alert(' Login is Succesfully !! ')
          }
          this.loginForm.reset()
          this.router.navigate(['dashbord'])
        })
}
}
