import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {



 constructor(private router:Router,private _auth:AuthService,private spinner:NgxSpinnerService){


 }

 ngOnInit(): void {


  this.spinner.show(undefined,{
    type: "line-scale-party",
    color:'white',
    bdColor:'rgba(100,149,237,0.8)',

  });

  /*setTimeout(()=>{
    this.spinner.hide();
  },6000);*/

 }


 isLoggedIn():boolean{
   return this._auth.isLoggedIn();
 }
 logout()
 {
   this._auth.logout();

 }

 showSpinner():boolean{
   return this._auth.getSpinnerValue();
 }

}

