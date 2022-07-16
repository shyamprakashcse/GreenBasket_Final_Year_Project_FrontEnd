import { ResponseComponent } from './auth/response/response.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResponsecontrollerGuard } from './auth/responsecontroller.guard';
import { AuthGuard } from './auth/auth.guard';

import { RegSuccessComponent } from './auth/reg-success/reg-success.component';
import { UserExistAlertResponseComponent } from './auth/user-exist-alert-response/user-exist-alert-response.component';
import { UseralertGuard } from './auth/useralert.guard';
import { InvalidAuthenticationUserAlertComponent } from './auth/invalid-authentication-user-alert/invalid-authentication-user-alert.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  {path:'',redirectTo:"/login",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'response',component:ResponseComponent,canActivate:[ResponsecontrollerGuard]},
  {path:'verification/:token',component:RegSuccessComponent},
  {path:'useralert',component:UserExistAlertResponseComponent},
  {path:'invalidAuth',component:InvalidAuthenticationUserAlertComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
