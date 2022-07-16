import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  homecontent=[]
  userinfo={
   email:"",
    password:""
  }
  constructor(private _homeServices:HomeService,private route:Router,private _auth:AuthService,private _firebaseAuth:AngularFireAuth) { }

  ngOnInit(): void {

    this._homeServices.getHomeContents().subscribe(
      res =>{
        this.homecontent=res;
        console.log(this.homecontent);

      },
      err =>{
        this.route.navigate(['/login']);
      }
      );

      /*this._homeServices.getUserInfo().subscribe(
        res=>{
          this.userinfo=res;
        },
        err=>{
          console.log(err);

        }
      );*/

    this._firebaseAuth.onAuthStateChanged((user)=>{
      console.log(user);
      this.userinfo.email=user.email;
    },(err)=>{
      console.log(err);
    })

   }

   ngAfterViewInit(): void {
     //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
     //Add 'implements AfterViewInit' to the class.

   }



}
