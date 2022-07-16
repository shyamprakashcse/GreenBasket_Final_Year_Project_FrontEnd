import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-exist-alert-response',
  templateUrl: './user-exist-alert-response.component.html',
  styleUrls: ['./user-exist-alert-response.component.css']
})
export class UserExistAlertResponseComponent implements OnInit {

  constructor(private _route:Router) { }

  ngOnInit(): void {
  }
  Login(){
    this._route.navigate(['/login']);
  }

}
