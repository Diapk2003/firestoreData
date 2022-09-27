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

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: [''],

    }) 
  }

  submit(){
  console.log(this.forgotForm.value);
  
  }

}
