import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { HotToastService} from '@ngneat/hot-toast'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router, private auth:FireserviceService, private toast:HotToastService) { }
  get forgotpasswordGenerate() {
    return this.forgotForm.controls 
   }
  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],

    }) 
  }

  submit(){
  console.log(this.forgotForm.value);
  
  }

}
