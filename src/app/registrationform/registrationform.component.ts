import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { Data } from '../data';
import { Database, ref, set } from '@angular/fire/database';
@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.scss']
})
export class RegistrationformComponent implements OnInit {

  editData: any = []
  userId: any
  Registrationform!: FormGroup
  isEditable: boolean = false

  constructor(private formbuilder: FormBuilder, private router: Router, private dataService: FireserviceService, private route: ActivatedRoute , private db:Database) { }

  ngOnInit(): void {

    this.buildForm()

    this.route.params.subscribe((param: any) => {
      this.userId = param['id']

      if (this.userId != undefined) {
        this.isEditable = true;
        this.getDataById()
      } else {
        this.isEditable = false;
      }

    })

  }

  public buildForm() {
    this.Registrationform = this.formbuilder.group({
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      PinCode: ['', Validators.required],
      Password: ['', Validators.required],
      MobilNumber: ['', Validators.required],
      userid: ['', Validators.required],

    });
  }


  // submit() {
  //   const payload: Data = {
  //     id: '',
  //     data_name: this.Registrationform.value.Name,
  //     data_address: this.Registrationform.value.Address,
  //     data_pincode: this.Registrationform.value.PinCode,
  //     data_mobileNo: this.Registrationform.value.MobilNumber,
  //     data_password: this.Registrationform.value.Password,
  //     data_userid: this.Registrationform.value.userid
  //   }

  //   if (this.userId != undefined) {

  //     this.dataService.updateData(this.userId, payload).then(() => {
  //       alert("Note Update Successfully")
  //       this.Registrationform.reset()
  //     })


  //   } else {
  //     this.dataService.addData(payload).then((res) => {
  //       if (res) {
  //         alert('Data Added Succesfully')
  //       }
  //       this.Registrationform.reset()
  //     })
  //   }

  // }

  backtogal() {
    this.router.navigate(['dashbord'])
  }

  getDataById() {
    this.editData = this.dataService.getDataById()
    this.Registrationform.controls['Name'].setValue(this.editData.data_name)
    this.Registrationform.controls['Address'].setValue(this.editData.data_address)
    this.Registrationform.controls['PinCode'].setValue(this.editData.data_pincode)
    this.Registrationform.controls['MobilNumber'].setValue(this.editData.data_mobileNo)
    this.Registrationform.controls['Password'].setValue(this.editData.data_password)
  }

  submit(){ 
    set(ref(this.db,'Registration Form/' + this.Registrationform.value.Name),{
      id: '',
      name: this.Registrationform.value.Name,
      address: this.Registrationform.value.Address,
      pincode: this.Registrationform.value.PinCode,
      mobileNo: this.Registrationform.value.MobilNumber,
      password: this.Registrationform.value.Password,
      userid: this.Registrationform.value.userid
    })
    alert("Users add Succesfully....")
    this.Registrationform.reset()
  }


}
