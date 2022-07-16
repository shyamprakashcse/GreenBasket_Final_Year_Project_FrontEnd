import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TokenInterceptorService } from './token-interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './auth.service';
import { HomeModule } from '../home/home.module';
import { ResponseComponent } from './response/response.component';
import { ResponsecontrollerGuard } from './responsecontroller.guard';
import { AuthGuard } from './auth.guard';
import { RegSuccessComponent } from './reg-success/reg-success.component';
import { UserExistAlertResponseComponent } from './user-exist-alert-response/user-exist-alert-response.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { InvalidAuthenticationUserAlertComponent } from './invalid-authentication-user-alert/invalid-authentication-user-alert.component';
import { WaitingResponseComponent } from './waiting-response/waiting-response.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResponseComponent,
    RegSuccessComponent,
    UserExistAlertResponseComponent,
    InvalidAuthenticationUserAlertComponent,
    WaitingResponseComponent,


  ],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule

  ],
  exports:[LoginComponent,RegisterComponent,ResponseComponent,RegSuccessComponent,UserExistAlertResponseComponent,InvalidAuthenticationUserAlertComponent],
  providers:[AuthService,ResponsecontrollerGuard,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
  ],


})

export class AuthModule { }
