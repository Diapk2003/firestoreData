import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  registration(){
    this.router.navigate(['registrationform'])
  }

  dataList(){
    this.router.navigate(['datalist'])
  }
  login(){
    this.router.navigate(['login'])
  }

}
