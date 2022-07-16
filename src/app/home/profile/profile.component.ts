import { Component, OnInit } from '@angular/core'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 

  userEmail:string=""; 
  userId:string=""; 
  UserProductSchemas:any=[]
  UserProducts:any=[] 
  
  constructor(private firestore:AngularFirestore,
    private _FireBaseAuth:AngularFireAuth,private storage:AngularFireStorage,private Route:Router,private homeService:HomeService) {  

      this.userEmail=this.homeService.userEmail; 
      this.userId=this.homeService.userId;  
     
      
      
     }

  ngOnInit(): void { 
     
     // getting user details   
     this.homeService.setUserDetails(); 
    
     
    

     
  }  



  async getSchemas() {  

    await this.homeService.setUserDetails();  
   await this.homeService.getUserSchemas().then(res=>{
     console.log(res); 
     this.UserProducts=res; 
   }).catch(err=>{
     console.log(err);
   })
    

    

     



   

   

  } 

 
  async prodDelete(ind:number)
  { 
    if(confirm("Are you sure want to delete ? Data recovery is impossible once you deleted. ")==true){ 

      
    var tempObj=this.UserProducts[ind]; 
    var collectionName=tempObj["CollectionName"]
    var DocId=tempObj["docid"]
    var uploadPath=tempObj["UploadPath"] 
    var downloadlink=tempObj["downloadlink"] 
    console.log(collectionName+" "+DocId+" "+uploadPath+" "+downloadlink);  

    // Image deletion 
    this.storage.ref(uploadPath).delete().subscribe(res=>{
         console.log("Image Deleted Sucessfully");
    },(err)=>{
      console.log(err);
    }); 
   // document deletions 
    this.firestore.collection(collectionName).doc(DocId).delete().then(res=>{
      console.log("document deleted sucessfully");  
      this.UserProducts.splice(ind,1);
    }).catch(err=>{
      console.log("Error while deleting a document");
    }) 

  }
    
  }





}