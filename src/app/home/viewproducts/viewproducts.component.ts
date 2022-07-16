import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  productBar=[];
  totalLength:any;
  page:number=1;


  // Agriculturral and Farming
  FarmToolsEquip=[]
  Tractor=[]
  Irrigation=[]
  FreshFlower=[]
  AnimalFeed=[]
  CoirProducts=[]
  Fertilizers=[]
  Pets=[]


  // Food And Beverages
  Cereals=[]
  MeatAndPoultry=[]
  FreshVeg=[]
  MilkAndDairy=[]
  CookingMasalas=[]
  EdibleOil=[]

  constructor(private firestore:AngularFirestore,private homeservice:HomeService) {

    // Agricultural And Farming  

    this.homeservice.FarmingToolsDataFetcher(); 
    this.homeservice.TractorPartsDataFetcher(); 
    this.homeservice.IrrigationDataFetcher(); 
    this.homeservice.FreshFlowerDataFetcher(); 
    this.homeservice.AnimalFarmingFeedDataFetcher() 
    this.homeservice.CoirAgroProductsDataFetcher(); 
    this.homeservice.FertilizersDataFetcher()
    this.homeservice.SeedSaplingsDataFetcher() 
    this.homeservice.PetsDataFetcher();
 
    
    this.FarmToolsEquip=this.homeservice.FarmToolsEquip;
    this.Tractor=this.homeservice.Tractor
    this.Irrigation=this.homeservice.Irrigation
    this.FreshFlower=this.homeservice.FreshFlowersPlants
    this.AnimalFeed=this.homeservice.AnimalFarmingFeed
    this.CoirProducts=this.homeservice.CoirAgroProducts  
    this.Fertilizers= this.homeservice.Fertilizers
    this.Pets=this.homeservice.Pets


    // Food And Beverages 

    this.homeservice.CerealAndPulsesDataFetcher();
    this.homeservice.MeatAndPoultryDataFetcher();
    this.homeservice.FreshDriedVegetableDataFetcher();
    this.homeservice.MilkAndDairyDataFetcher();
    this.homeservice.CookingMasalaDataFetcher();
    this.homeservice.EdibleOilDataFetcher();



    this.Cereals=this.homeservice.Cereals;
    this.MeatAndPoultry=this.homeservice.Meat;
    this.FreshVeg=this.homeservice.FreshVeg;
    this.MilkAndDairy=this.homeservice.Milk;
    this.CookingMasalas=this.homeservice.CookingMasala;
    this.EdibleOil=this.homeservice.EdibleOil;


   }

  ngOnInit(): void { 
   

    // food and beverages 
    
    this.productBar=this.FarmToolsEquip;
    this.totalLength=this.productBar.length;
  }

  // Agricultural And Farming

  AgriToolData(){  
  

    this.productBar=this.FarmToolsEquip;
    this.totalLength=this.productBar.length;
  }

   TractorData(){ 
   
    this.productBar=this.Tractor;
    this.totalLength=this.productBar.length;
  }
   IrrigationData(){
    this.productBar=this.Irrigation;
    this.totalLength=this.productBar.length;
  }
  FreshFlowerData(){
    this.productBar=this.FreshFlower;
    this.totalLength=this.productBar.length;
  }
  AnimalFeedData(){
    this.productBar=this.AnimalFeed;
    this.totalLength=this.productBar.length;
  }
  CoirProductsData(){
    this.productBar=this.CoirProducts;
    this.totalLength=this.productBar.length;
  }
  FertilizersData(){
    this.productBar=this.Fertilizers;
    this.totalLength=this.productBar.length;
  }
  PetsData(){
    this.productBar=this.Pets;
    this.totalLength=this.productBar.length;
  }


  // Food And Beverages


  CerealsData(){
    this.productBar=this.Cereals;
    this.totalLength=this.productBar.length;
  }

  PoultryData(){
    this.productBar=this.MeatAndPoultry;
    this.totalLength=this.productBar.length;

  }

  FreshVegData(){
    this.productBar=this.FreshVeg;
    this.totalLength=this.productBar.length;
  }
  MilkDairyData(){
    this.productBar=this.MilkAndDairy;
    this.totalLength=this.productBar.length;
  }

  CookingMasalaData(){
    this.productBar=this.CookingMasalas;
    this.totalLength=this.productBar.length;
  }

  EdibleOilData(){
    this.productBar=this.EdibleOil;
    this.totalLength=this.productBar.length;
  }
}
