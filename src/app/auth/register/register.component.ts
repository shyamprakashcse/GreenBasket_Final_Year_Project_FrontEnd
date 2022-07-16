import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData={}
  password:string
  BackEndPayLoad={}
  ExisitingUser:any;

  constructor(private _auth:AuthService,private route:Router) { }

  ngOnInit(): void {
    this._auth.deleteLocalStorage();

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

 async registerUser(regForm:NgForm)
  {
    this._auth.setSpinnerValue(true);
    this.registerUserData=regForm.value;
    console.log("hey this is from the regiter user function",this.registerUserData);
    this.ExisitingUser=await this._auth.checkExistingUser(this.registerUserData);
    if(await this.ExisitingUser){
      this._auth.setSpinnerValue(false);
      this._auth.setUserExistingValue(true);
      this.route.navigate(['/useralert']);
      this._auth.setUserExistingValue(false);
    }
    else{
      this._auth.setSpinnerValue(false);
    this._auth.setMailSendvalue(true);
    this.route.navigate(['/response']);





    this._auth.registerUser(this.registerUserData).subscribe(
      res=>{

        this.BackEndPayLoad=res;
        console.log(this.BackEndPayLoad);
        this._auth.setMailSendvalue(false);


      },
      err=>{
        console.log(err);
        this._auth.setMailSendvalue(false);
      }
    );
    }
    this._auth.setSpinnerValue(false);
  }
  }


