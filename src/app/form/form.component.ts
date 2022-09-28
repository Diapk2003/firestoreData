import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { HotToastService} from '@ngneat/hot-toast'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor( private router:Router,private auth :FireserviceService,  private toast:HotToastService) { }

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
  logout(){
    this.auth.logout().subscribe(()=>{
      this.router.navigate(['login'])
    })
  }

}
