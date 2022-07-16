import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-businessportal',
  templateUrl: './businessportal.component.html',
  styleUrls: ['./businessportal.component.css']
})
export class BusinessportalComponent implements OnInit {
 
  companyProducts=[]
  constructor(private _route:Router,private homeService : HomeService) { }

  ngOnInit(): void {
    this.companyProducts=this.homeService.companyProducts;
    
    
  } 

  

}
