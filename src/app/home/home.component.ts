import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,private _homeservice:HomeService) {
    //Agricultural And Farming
    this._homeservice.FarmingToolsDataFetcher(); 
    this._homeservice.TractorPartsDataFetcher(); 
    this._homeservice.IrrigationDataFetcher(); 
    this._homeservice.FreshFlowerDataFetcher(); 
    this._homeservice.AnimalFarmingFeedDataFetcher() 
    this._homeservice.CoirAgroProductsDataFetcher(); 
    this._homeservice.FertilizersDataFetcher()
    this._homeservice.SeedSaplingsDataFetcher() 
    this._homeservice.PetsDataFetcher();
    //Food And Beverages

    this._homeservice.CerealAndPulsesDataFetcher();
    this._homeservice.MeatAndPoultryDataFetcher();
    this._homeservice.FreshDriedVegetableDataFetcher();
    this._homeservice.MilkAndDairyDataFetcher();
    this._homeservice.CookingMasalaDataFetcher();
    this._homeservice.EdibleOilDataFetcher(); 


    // userproducts schemas 
      this._homeservice.setUserDetails(); 


   }

  ngOnInit(): void {
    this._homeservice.setUserDetails(); 
  } 

  



}
