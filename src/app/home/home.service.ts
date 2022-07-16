import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _homeUrl="http://localhost:3000/api/home";
  private _userUrl=`http://localhost:3000/api/userinfo?token=${localStorage.getItem("token")}`;
  private _barrerTokenCheckURL="http://localhost:3000/api/barrer";
  private SpinnerValue:boolean=false; 


  // others 
  public UserProductSchemas:any=[]  
  public UserProducts:any=[]
  public userId:string=""; 
  public userEmail:string=""; 
  public selectedCompany=""; 
  public companyProducts=[]

  //Agricultural and Farming
 
  public FarmToolsEquip=[]
  public Tractor=[]
  public Irrigation=[]
  public FreshFlowersPlants=[]
  public AnimalFarmingFeed=[]
  public CoirAgroProducts=[]
  public SeedsSaplings=[]
  public Fertilizers=[]
  public Pets=[] 

  //Agricultural and Farming docId 
  public FarmToolsEquipSchema=[]   
  public TractorSchema=[]
  public IrrigationSchema=[]
  public FreshFlowersPlantsSchema=[]
  public AnimalFarmingFeedSchema=[]
  public CoirAgroProductsSchema=[]
  public SeedsSaplingsSchema=[]
  public FertilizersSchema=[]
  public PetsSchema=[] 



  // Food And Beverages
  public Cereals=[]
  public Meat=[]
  public FreshVeg=[]
  public Milk=[]
  public CookingMasala=[]
  public EdibleOil=[] 


  // Food And Beverages Schema  

  public CerealsSchema=[]
  public MeatSchema=[]                 
  public FreshVegSchema=[]
  public MilkSchema=[]
  public CookingMasalaSchema=[]
  public EdibleOilSchema=[]  



  constructor(private http:HttpClient,private firestore:AngularFirestore,private _FireBaseAuth:AngularFireAuth,private Route:Router ) {  

    this._FireBaseAuth.onAuthStateChanged((user)=>{
      this.userId=user.uid;
      this.userEmail=user.email; 
      console.log(this.userId)

     },(err)=>{
       console.log(err);
       alert("Authentication Error");  
       this.Route.navigateByUrl('/login');

     }); 

   }

  getHomeContents()
  {
    return this.http.get<any>(this._homeUrl);
  }

  getUserInfo()
  {
    return this.http.get<any>(this._userUrl);
   }
   getDeviceInfo()
   {
     if(window.screen.width>=300 && window.screen.width<=800)
     {
       return true;
     }
     else{
       return false;
     }
   }

   setSpinnerValue(val:boolean)
   {
     this.SpinnerValue=val;
   }
   getSpinnerValue()
   {
     return this.SpinnerValue;
   }

// Agricultural And Farming Collection Record Data Fetcher 
// FARMINGTOOLSANDMACHINEEQUIPMENTS
// "TRACTORANDPARTS"
// "IRRIGATIONANDMACHINES"
// "FRESHFLOWERSPLANTSANDTREES" 
// "BIRDFOODPOULTRYANIMALFEED"
// "COIRANDAGROPRODUCTS"
// "FERTILIZERSANDSOILADDICTIVES"
// "FARMINGANDPETANIMALS"

  async FarmingToolsDataFetcher(){
     this.FarmToolsEquip=[]

    const snapshot=  this.firestore.collection("FARMINGTOOLSANDMACHINEEQUIPMENTS").get();
    snapshot.forEach(res=>{
      res.docs.map(doc=>{
        var tempObj=doc.data() 
        if(this.userId==tempObj["UserID"]) 
        {
          this.UserProducts.push(tempObj); 
          this.UserProductSchemas.push(doc.id)
        }
      this.FarmToolsEquip.push(doc.data());
       // console.log(doc.data());
      //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
      })
    });


    }

   async TractorPartsDataFetcher(){
      this.Tractor=[]
      const snapshot=  this.firestore.collection("TRACTORANDPARTS").get();
    snapshot.forEach(res=>{
      res.docs.map(doc=>{ 
        var tempObj=doc.data() 
        if(this.userId==tempObj["UserID"]) 
        {
          this.UserProducts.push(tempObj); 
          this.UserProductSchemas.push(doc.id)
        }
        this.TractorSchema.push(doc.id);
      this.Tractor.push(doc.data());
       // console.log(doc.data());
      //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
      })
    });
    }

   async IrrigationDataFetcher(){
      this.Irrigation=[]
      const snapshot=  this.firestore.collection("IRRIGATIONANDMACHINES").get();
    snapshot.forEach(res=>{
      res.docs.map(doc=>{  
        var tempObj=doc.data() 
        if(this.userId==tempObj["UserID"]) 
        {
          this.UserProducts.push(tempObj); 
          this.UserProductSchemas.push(doc.id)
        }
        
        this.IrrigationSchema.push(doc.id);
      this.Irrigation.push(doc.data());
       // console.log(doc.data());
      //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
      })
    });

    }

   async FreshFlowerDataFetcher(){
      this.FreshFlowersPlants=[]
      const snapshot=  this.firestore.collection("FRESHFLOWERSPLANTSANDTREES").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id)
          }
          this.FreshFlowersPlantsSchema.push(doc.id);
        this.FreshFlowersPlants.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });

    }

  async  AnimalFarmingFeedDataFetcher(){
      this.AnimalFarmingFeed=[]
      const snapshot=  this.firestore.collection("BIRDFOODPOULTRYANIMALFEED").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id)
          } 
          this.AnimalFarmingFeedSchema.push(doc.id);
        this.AnimalFarmingFeed.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });

    }

  async  CoirAgroProductsDataFetcher(){
      this.CoirAgroProducts=[]
      const snapshot=  this.firestore.collection("COIRANDAGROPRODUCTS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id)
          }
          this.CoirAgroProductsSchema.push(doc.id);
        this.CoirAgroProducts.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });

    }

   async SeedSaplingsDataFetcher(){
      this.SeedsSaplings=[] ;
      const snapshot=  this.firestore.collection("SEEDSANDPLANTSAPLINGS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id)
          }
        
        this.SeedsSaplings.push(doc.data()); 
        this.SeedsSaplingsSchema.push(doc.id)
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });

    }

   async FertilizersDataFetcher(){
      this.Fertilizers=[];
      const snapshot=  this.firestore.collection("FERTILIZERSANDSOILADDICTIVES").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id)
          }
          this.FertilizersSchema.push(doc.id);
        this.Fertilizers.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });

    }

  async  PetsDataFetcher(){
      this.Pets=[];
      const snapshot=  this.firestore.collection("FARMINGANDPETANIMALS").get(); 
      this.Pets=[];
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.PetsSchema.push(doc.id);;
          }
        this.PetsSchema.push(doc.id);
        this.Pets.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });


    }

    // Food And Beverage collections record fetcher

    CerealAndPulsesDataFetcher(){
      this.Cereals=[]
      const snapshot=  this.firestore.collection("CEREALSANDFOODGRAINS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id);
          }
          this.CerealsSchema.push(doc.id);
        this.Cereals.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });

    }


    MeatAndPoultryDataFetcher(){
      this.Meat=[]
      const snapshot=  this.firestore.collection("MEATANDPOULTRYFOODS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id);
          }
          this.MeatSchema.push(doc.id);
        this.Meat.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });


    }


    FreshDriedVegetableDataFetcher(){
      this.FreshVeg=[]
      const snapshot=  this.firestore.collection("FRESHDRIEDPRESERVEDVEGETABLESFRUITS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id);
          }
          this.FreshVegSchema.push(doc.id);
        this.FreshVeg.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });


    }

    MilkAndDairyDataFetcher()
    {
      this.Milk=[];
      const snapshot=  this.firestore.collection("MILKANDDAIRYPRODUCTS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id);
          }
          this.MilkSchema.push(doc.id);
        this.Milk.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });


    }

    CookingMasalaDataFetcher()
    {
      this.CookingMasala=[];
      const snapshot=  this.firestore.collection("COOKINGSPICIESANDMASALAS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id);
          }
          this.CookingMasalaSchema.push(doc.id);
        this.CookingMasala.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });


    }

    EdibleOilDataFetcher(){
      this.EdibleOil=[];
      const snapshot=  this.firestore.collection("EDIBLEOILSANDALLIEDPRODUCTS").get();
      snapshot.forEach(res=>{
        res.docs.map(doc=>{ 
          var tempObj=doc.data() 
          if(this.userId==tempObj["UserID"]) 
          {
            this.UserProducts.push(tempObj); 
            this.UserProductSchemas.push(doc.id);
          }
          this.EdibleOilSchema.push(doc.id);
        this.EdibleOil.push(doc.data());
         // console.log(doc.data());
        //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
        })
      });


    }
  

    async getUserSchemas()
    { 
    
      return this.UserProducts;
    }
   
    async setUserDetails()
    {
      this._FireBaseAuth.onAuthStateChanged((user)=>{
        this.userId=user.uid;
        this.userEmail=user.email;
  
       },(err)=>{
         console.log(err);
         alert("Authentication Error"); 
  
  
       }); 
    } 

    
     
    async getUserDocId(){
      return this.UserProductSchemas;
    } 

    setSelectedCompany(compid:string){
      this.selectedCompany=compid;
    }

    getSelectedCompany(){
      return this.selectedCompany; 
    }
    
    async getCompanyProducts(companyId:string)
    {
      this.companyProducts=[]
    await this.firestore.collection("IndustryProducts").get().forEach(res=>{
       res.docs.map(doc=>{
           let dataObj=doc.data(); 
           if(dataObj["CompanyID"]==companyId)
           {
             this.companyProducts.push(dataObj);
             console.log(dataObj);
           }
       }); 
        
     }); 

    

     
    } // end of getCompanyProducts 
     
    
  
  }


