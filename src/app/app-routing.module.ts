import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatalistComponent } from './datalist/datalist.component';
import { FormComponent } from './form/form.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'registrationform',
    component:RegistrationformComponent
  },
  {
    path: 'registrationform/:id',
    component:RegistrationformComponent
  },
  {
    path: 'dashbord',
    component:FormComponent
  },
  {
    path: 'datalist',
    component:DatalistComponent
  },
  {
    path: 'login',
    component:LoginpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
