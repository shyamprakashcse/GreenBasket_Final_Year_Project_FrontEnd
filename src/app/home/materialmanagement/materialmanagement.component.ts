import { Component, Input, OnInit } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './../home.service';

@Component({
  selector: 'app-materialmanagement',
  templateUrl: './materialmanagement.component.html',
  styleUrls: ['./materialmanagement.component.css']
})
export class MaterialmanagementComponent implements OnInit {
  
  docid:string=""; 
  compobj:any={}; 
  displayProfile:boolean=true; 
  displayProduct:boolean=false;  
  validURL:boolean=false;  

  constructor(private router:Router,private firestore:AngularFirestore,
    private activerouter:ActivatedRoute,private homeservice:HomeService) { }

  ngOnInit(): void { 
  
    this.URLValidator();
    
  }   

//   his.itemCollection = this.afs.collection<Item>('items', ref => ref.where('size', '==', 
// 'large').where('brand', '==', 'some-brand'))
// return this.items = this.itemCollection.valueChanges();


  productsCRUD(){
    this.displayProfile=false;  
    this.displayProduct=true; 
    this.router.navigate(['home/prodcrud'])

  }

  profile(){
    this.displayProfile=true; 
    this.displayProduct=false; 
  }

  async URLValidator(){ 

    let id=this.activerouter.snapshot.paramMap.get('id');  
    let uid=this.homeservice.userId; 
   
    this.docid=id ;  

    await this.firestore.collection("industry",ref=>ref.where('docid','==',id).where('userid','==',uid)).get().forEach(res=>{
      if(res.empty)
      {
       
       this.router.navigate(['login']);  
       alert("Invalid Authentication");
      }
      else{
               res.docs.map(doc=>{
                 this.compobj=doc.data(); 
                 this.homeservice.setSelectedCompany(this.compobj.docid);
                 console.log(this.compobj);
               })
      }
    
    })

  }



}
