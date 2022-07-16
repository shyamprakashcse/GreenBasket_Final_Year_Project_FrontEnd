import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  date:any;
  constructor(private home_serve:HomeService) {
    this.date=new Date().getFullYear();
   }

  ngOnInit(): void {
   this.deviceInfo();
  }
  deviceInfo()
  {
    return this.home_serve.getDeviceInfo();
  }





}
