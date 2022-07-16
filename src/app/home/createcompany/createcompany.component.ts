import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit { 

 previewImgSrc:string="/assets/images/image_preview_add_products.jpg" ;
 selectedImage:any=null;
 fileName:string=null;
 fileSize:number=null;
 acceptFile:boolean=false;
 fileType:any;
 companyObj={} 
 userId:string=""; 
 userEmail:string=""; 
 uploadingPath:string=""; 
 folderPath:string="";
 uploadProgress:number=1; 
 downLoadingPath:string="";
 docrefid:string="";
 industryUserSchema:any={} 
 IndustryUserExists:boolean=false
 IndustryUserExistsData:any={}
 temparr:any=[] 
 DisplayForm:boolean=true;

  constructor(private storage:AngularFireStorage,private _FireBaseAuth:AngularFireAuth,private _firestore:AngularFirestore,private _auth:AuthService) { }

  ngOnInit(): void { 
    this._FireBaseAuth.onAuthStateChanged((user)=>{
      this.userId=user.uid;
      this.userEmail=user.email;

     },(err)=>{
       console.log(err);
       alert("Authentication Error"); 


     }) 


     // user already have a company or not 

     this._firestore.collection("IndustryUserList").get().forEach(res=>{
       res.docs.map(doc=>{ 
 
         if(doc.id==this.userId)
         {
           // user has already created a company so proceed further   
           this.IndustryUserExists=true;  
           this.IndustryUserExistsData=doc.data(); 
           console.log("user Exists in the individual user lists"); 
           console.log("user  data is ",this.IndustryUserExistsData);
            
         }
         
 
       
       })
 
     }); 
  } 


  async companyRegistration(regform:NgForm){
    //console.log("the form values are:",regform.value)  
    //console.log("fileName is",this.fileName); 
    //console.log("fileSize is",this.fileSize); 
    //console.log("fileType is ",this.fileType); 
    //console.log("selected image is",this.selectedImage); 
    //console.log("preview src is ",this.previewImgSrc);   
    this.DisplayForm=false; 
    this._auth.setSpinnerValue(true);
    this.companyObj=regform.value; 
    //console.log(this.companyObj);  
    this.folderPath="CompanyLogos";   
    

   

    this.uploadingPath=`${this.folderPath}/${this.userId}/${this.userId}_${new Date().getTime()}_${Math.floor(Math.random()*10000)+1}_${this.fileName}`;
    const fileref=this.storage.ref(this.uploadingPath);  

    this.companyObj["uploadingPath"]=this.uploadingPath;    
    this.companyObj["userid"]=this.userId; 
    this.companyObj["useremail"]=this.userEmail ;

    
   await this._firestore.collection("industry").add(this.companyObj).then(docref=>{

      this.docrefid=docref.id;
      console.log("docref id is",this.docrefid);

    }).catch(err=>{
      alert("error while uploading ");
      console.log(err);
    });  


    


   


    if(this.IndustryUserExists==true)
    {  
      this.temparr=this.IndustryUserExistsData["IndustryRef"]
      this.temparr.push(this.docrefid); 

     await this._firestore.collection("IndustryUserList").doc(this.userId).set({"IndustryRef":this.temparr},{merge:true}).then(()=>{
        console.log("Industry Registeration is Updated sucessfully in individual user list");
      },(err)=>{
        console.log(err);
      })
    }
    else{
      this.industryUserSchema["IndustryRef"]=[this.docrefid]
      this.industryUserSchema["IndustryProductRef"]=[]

     await this._firestore.collection("IndustryUserList").doc(this.userId).set(this.industryUserSchema).then(()=>{
         console.log("Industry Registeration is created sucessfully in individual user list");
      },(err)=>{
        console.log(err);
      })
    }

   

   

   
    



    this.storage.upload(this.uploadingPath,this.selectedImage,{contentType:this.fileType}).task.on('state_changed',(snapshot)=>{
      this.uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log("Upload is "+this.uploadProgress+"% done");
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },(error)=>{
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },()=>{
      fileref.getDownloadURL().subscribe((res)=>{
        console.log(res);
        this.downLoadingPath=res.toString();
        
         console.log("downloaded url is",this.downLoadingPath); 

         this._firestore.collection("industry").doc(this.docrefid).set({"downloadingPath":this.downLoadingPath,"docid":this.docrefid},{merge:true}).then(()=>{
           console.log("Downloaded link is updated in the corresponding doc id successfully");
         },(err)=>{
           console.log(err);
         })
        
      },(err)=>{
        console.log(err);
      })
    }); 

    this._auth.setSpinnerValue(false);
    this.DisplayForm=false; 

    regform.reset()
  } 


  showPreview(event:any,companyRegForm:NgForm){
    if(event.target.files && event.target.files.length)
    {
      const file = (event.target as HTMLInputElement).files[0];

      const reader=new FileReader();
      reader.onload=()=>{
        this.previewImgSrc = reader.result as string;
        this.selectedImage=event.target.files[0];
      }
      reader.readAsDataURL(file);

      this.fileName=file.name;
      this.fileSize=file.size;
      this.fileType=file.type;
      console.log(this.fileSize);
      console.log(file.type);
      const fileSizeInMB=(this.fileSize/1024)/1024;
      console.log(fileSizeInMB+"mb");
      if(fileSizeInMB>=0 && fileSizeInMB<=5)
      {
        console.log("no problem file is within the limit of 2mb");
        this.acceptFile=true;
      }
      else{

        this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
        this.acceptFile=false;
        this.fileName='';
        this.fileSize=null;
        companyRegForm.reset();
        alert("fileSize should be less than 5MB.");

      }

    }
    else{
      this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
      this.acceptFile=false;
      alert("file uploading error");
      companyRegForm.reset();
    }


  } 

 

}

