import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loggedUserData={}
  validAuth:any;

  constructor(private _auth:AuthService,private _route:Router) { }

  ngOnInit(): void {
    this._auth.deleteLocalStorage();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.


  }

  loginUser(loginForm:NgForm)
  {
    this._auth.setSpinnerValue(true);
    this.loggedUserData=loginForm.value;

    console.log("hey this is from login user function",this.loggedUserData);

    /*setTimeout(() => {
      this._auth.setSpinnerValue(false);
    }, 5000);

    this._auth.loginUser(this.loggedUserData).subscribe(res=>{
      console.log(res);
      localStorage.setItem("token",res.token);
      this._route.navigate(['/home']);


    },err=>{
      this._route.navigate(['/invalidAuth']);
      console.log(err);
    })*/



    this.validAuth=this._auth.loginUser(this.loggedUserData);


  }



}
