import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatalistComponent } from './datalist/datalist.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FormComponent } from './form/form.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'
import { CreateuserComponent } from './createuser/createuser.component';

const redirectLogin = () =>  redirectUnauthorizedTo(['login']);
const redirectDashboard = () =>  redirectLoggedInTo(['dashbord']);

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'registrationform',
    component:RegistrationformComponent,
    ...canActivate(redirectLogin)
  },
  {
    path: 'registrationform/:id',
    component:RegistrationformComponent,
    ...canActivate(redirectLogin)
  },
  {
    path: 'dashbord',
    component:FormComponent,
    ...canActivate(redirectLogin)
  },
  {
    path: 'datalist',
    component:DatalistComponent,
    ...canActivate(redirectLogin)
  },
  {
    path: 'login',
    component:LoginpageComponent,
    ...canActivate(redirectDashboard)
  },
  {
    path: 'forgotpassword',
    component:ForgotpasswordComponent,
    ...canActivate(redirectDashboard)
  },
  {
    path: 'createuser',
    component:CreateuserComponent,
    ...canActivate(redirectDashboard)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
