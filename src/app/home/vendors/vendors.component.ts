import { Component, OnInit } from '@angular/core'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { Router } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  
  constructor(private fireauth:AngularFireAuth , private firestore : AngularFirestore,private storage:AngularFireStorage,
    private router:Router,private homeservice:HomeService){}

    userId:string=""; 
    userEmail:string="";  
    industry:any=[] 
    myIndustry:any=[] 
    Industry:any=[] 
    display:boolean=false; 
    buttonDisplay:boolean=false;  
    mycompbtnactive:boolean=false;
   vendorbtnactive:boolean=true; 

  ngOnInit(): void {  


    this.fireauth.onAuthStateChanged((user)=>{
      this.userId=user.uid;
      this.userEmail=user.email;

     },(err)=>{
       console.log(err);
       alert("Authentication Error"); 


     });    


     this.firestore.collection("industry").get().forEach(res=>{
      res.docs.map(doc=>{ 
       this.industry.push(doc.data()) ;  

       if(doc.data()["userid"]==this.userId)
       {
         this.myIndustry.push(doc.data()) 
        
       }
        
       // console.log(doc.data());
      //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
      })
    });

  } 

  ngAfterViewInit(){
    this.Industry=this.industry;
  }
 

   userIndustry(){ 
     this.buttonDisplay=true;  
     this.vendorbtnactive=false; 
     this.mycompbtnactive=true;
     this.Industry=this.myIndustry; 
     if(this.Industry.length == 0)
     {
           this.display=true; 
     }
     else{
       this.display=false;
     }
    
   }
   vendor(){ 
     this.buttonDisplay=false; 
     this.vendorbtnactive=true; 
     this.mycompbtnactive=false; 
     this.Industry=this.industry;  

     if(this.Industry.length == 0)
     {
           this.display=true; 
     }
     else{
       this.display=false;
     }
     
   }

  async delete(ind:number,vendorDoc:object){
    if(confirm("Are You Sure want to delete,Data recovery is impossible?")==true)
    {
      var tempObj=vendorDoc
      var collectionName="industry"
      var DocId=tempObj["docid"]
      var uploadPath=tempObj["uploadingPath"] 
      var downloadlink=tempObj["downloadingPath"] 
      console.log(collectionName+" "+DocId+" "+uploadPath+" "+downloadlink);   
      console.log(tempObj); 
  
      // Image deletion 
      // Image deletion 
    this.storage.ref(uploadPath).delete().subscribe(res=>{
      console.log("Image Deleted Sucessfully"); 
      // document deletions  


               this.firestore.collection(collectionName).doc(DocId).delete().then(res=>{ 

   console.log("document deleted sucessfully");  
   this.Industry.splice(ind,1); 

 }).catch(err=>{
   console.log("Error while deleting a document");
 })  ; 



 },(err)=>{
   console.log(err);
 }); 

     
     
    }

   } 


   update(index:number,vendorDoc:object){ 
     alert("hello update was clicked"); 
     console.log(vendorDoc)

   } 

   async vendorDetails(doc:any)
   {
    if(this.buttonDisplay==true)
    {
      this.router.navigate(['home/myind',doc.docid]); 
    } 
    else{
      await this.homeservice.getCompanyProducts(doc.docid);  
       await this.router.navigate(['home/business']); 

        
    }

     
   } 

   
}
