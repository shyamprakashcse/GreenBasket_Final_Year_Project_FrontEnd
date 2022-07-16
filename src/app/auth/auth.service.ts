import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl="http://localhost:3000/api/signup";
  private _loginUrl="http://localhost:3000/api/login";
  private _responseUrl="http://localhost:4200/home";
  private _refreshTokenUrl="http://localhost:3000/api/refreshtoken";
  private _userInfoUrl=`http://localhost:3000/api/userinfo?token=${localStorage.getItem("token")}`;
  private _invalidUserUrl="http://localhost:3000/api/invalidAuth";
  private _barrerTokenCheckURL="http://localhost:3000/api/barrer";
  public userdetails:any;
  private isMailSend=false;
  public isExistingUser=false;
  private errorCode:any;
  private errorMessage:any;
  private spinner:boolean;
  private validAuth:any;
 private token:any;

  constructor(private http:HttpClient,private _route:Router,private firebaseauth:AngularFireAuth,private loader:NgxSpinnerService) { }

  registerUser(registerUserFormData:object)
  {
   return this.http.post<any>(this._registerUrl,registerUserFormData)
  }

 async loginUser(loginUserFormData:any)
  {
   await this.firebaseauth.signInWithEmailAndPassword(loginUserFormData.email,loginUserFormData.password).then((res)=>{
      this.validAuth=true;
      this.http.post(this._loginUrl,loginUserFormData).subscribe((res)=>{
        this.token=res;
        this.setSpinnerValue(false);
        localStorage.setItem('token',this.token.token);

        this._route.navigate(['/home/explore']);

      });

      return true;

    }).catch((err)=>{
      this.validAuth=false;
      console.log("hey error from login user");
      this.setSpinnerValue(false);
      this._route.navigate(['/invalidAuth']);

    });
    this.setSpinnerValue(false);
    return this.validAuth;





  }

   isLoggedIn():boolean
  {

    return !!localStorage.getItem('token');
  }

  setMailSendvalue(value:boolean)
  {
    this.isMailSend=value;
  }

  getMailSendValue():boolean{
   return this.isMailSend;
  }
  setSpinnerValue(value:boolean)
  {
    this.spinner=value;
  }
  getSpinnerValue()
  {
    return this.spinner;
  }
  getTokenFromLocalStorage()
  {
    return localStorage.getItem('token');
  }


  async checkExistingUser(value:any)
  {
    await this.firebaseauth.signInWithEmailAndPassword(value.email,value.password).then((res)=>{
      this.isExistingUser=true;
      return true;
    }).catch((err)=>{
      console.log("hey error");
      console.log(err.code);
      if(err.code==='auth/wrong-password')
      {
        this.isExistingUser=true;
        console.log("inside wrong password");
        return true;
      }
      else if(err.code==='auth/user-not-found')
      {
        this.isExistingUser=false;
        console.log("hey I am from user not exists");
      }
      else{
        this.isExistingUser=false;
        return false;
      }
    })
    return this.isExistingUser;
  }

  setUserExistingValue(value:boolean)
  {
    this.isExistingUser=value;
  }
  getUserExistingValue()
  {
    return this.isExistingUser;
  }

  logout()
  {
    localStorage.removeItem('token');
    this._route.navigate(['/login']);
  }
  deleteLocalStorage()
  {
    localStorage.removeItem('token');
  }

 async checkBarrerToken()
  {
    this.http.get<any>(this._barrerTokenCheckURL).subscribe((res)=>{
     return true;
   },(err)=>{
     this._route.navigate(['/login']);
     return false;
   })
  }

}
