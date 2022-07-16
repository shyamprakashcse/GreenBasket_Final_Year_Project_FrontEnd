import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/auth/auth.service';

interface material{
  MaterialName:string,
  MaterialCost:number,
  MaterialQuantity:number,
  WarehouseName:string,
  WarehouseLocation:string,
  SupplierName:string,
  SupplierCost:number,
  SupplierLocation:string,
  CompanyID:string,
  UserID:string,
  docid:string,
  uploadingPath:string,
  downloadingPath:string
}

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {

 previewImgSrc:string="/assets/images/image_preview_add_products.jpg" ;
 selectedImage:any=null;
 fileName:string=null;
 fileSize:number=null;
 acceptFile:boolean=false;
 fileType:any;
 uploadingPath:string="";
 downloadingPath:string=""
 userId:string=""
 folderPath:string=""
 docid:string=""
 industryID=[]
 mapper=[]
 displayForm:boolean=true
 displayUpdateButton:boolean=false;
 company:string="argentina"
 selectedDocID:string="";
 orderField:string='';
 reverseSort:boolean=false;
 searchInput:any={MaterialName:'',MaterialCost:null,MaterialQuantity:null,
                       WarehouseName:'',WarehouseLocation:'',SupplierName:'',
                       SupplierLocation:'',SupplierCost:null,CompanyID:'',
                       UserID:'',uploadingPath:'',downloadingPath:'',docid:''}

 uploadProgress:number=1
  compobj:any={}
  temparr:any=[]

  // {
  //   "MaterialName":"Cotton" ,
  //   "MaterialCost":"234",
  //   "MaterialQuantity":"23",
  //   "WarehouseName":"Azole",
  //   "WarehouseLocation":"Pharameer",
  //   "SupplierName":"Azaria",
  //   "SupplierCost":"200",
  //   "SupplierLocation":"Chennai"}



  compid:string=""



  productobj:any={
    "MaterialName":"" ,
    "MaterialCost":"",
    "MaterialQuantity":"",
    "WarehouseName":"",
    "WarehouseLocation":"",
    "SupplierName":"",
    "SupplierCost":"",
    "SupplierLocation":"",
    "CompanyID":""

  }

  selectedItem={}


  page:number=1




  constructor(private homeservice:HomeService,private activerouter:ActivatedRoute,
    private router:Router,private firestore:AngularFirestore,private storage:AngularFireStorage,private auth:AuthService) { }

  ngOnInit(): void {
      this.checkCompanyExists();
      this.userId=this.homeservice.userId;
      this.getProducts();


  }




  // show preview

  showPreview(event:any,prodRegForm:NgForm){
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
        console.log("no problem file is within the limit of 5mb");
        this.acceptFile=true;
      }
      else{

        this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
        this.acceptFile=false;
        this.fileName='';
        this.fileSize=null;
        prodRegForm.reset();
        alert("fileSize should be less than 5MB.");

      }

    }
    else{
      this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
      this.acceptFile=false;
      alert("file uploading error");
      prodRegForm.reset();
    }


  }


  async productRegisteration(prodForm:NgForm){


    this.productobj["MaterialName"]=prodForm.value.MaterialName
    this.productobj["MaterialCost"]=prodForm.value.MaterialCost
    this.productobj["MaterialQuantity"]=prodForm.value.MaterialQuantity
    this.productobj["WarehouseName"]=prodForm.value.WarehouseName
    this.productobj["WarehouseLocation"]=prodForm.value.WarehouseLocation
    this.productobj["SupplierName"]=prodForm.value.SupplierName
    this.productobj["SupplierLocation"]=prodForm.value.SupplierLocation
    this.productobj["SupplierCost"]=prodForm.value.SupplierCost
    this.productobj["UserID"]=this.homeservice.userId;
    this.productobj["CompanyID"]=prodForm.value.companyID


    this.temparr.push(this.productobj)


    console.log(this.temparr);
    console.log("hello this is prodobj");

    this.auth.setSpinnerValue(true);
    this.displayForm=false;


    // Image Uploading Path
    this.folderPath="IndustryProductsImages"
    this.uploadingPath=`${this.folderPath}/${this.userId}/${this.userId}_${new Date().getTime()}_${Math.floor(Math.random()*10000)+1}_${this.fileName}`;
    const fileref=this.storage.ref(this.uploadingPath);
    this.temparr[this.temparr.length-1]["uploadingPath"]=this.uploadingPath;

    // products schema uploading
    await this.firestore.collection("IndustryProducts").add(this.temparr[this.temparr.length-1]).then(docref=>{

      this.docid=docref.id;
      console.log("docref id is",this.docid);

    }).catch(err=>{
      alert("error while uploading ");
      console.log(err);
      this.auth.setSpinnerValue(false);
      this.displayForm=true
      return ;
    });




    // image uploading into the storage server DB

    this.storage.upload(this.uploadingPath,this.selectedImage,{contentType:this.fileType}).task.on('state_changed',(snapshot)=>{
      this.uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      if(this.uploadProgress==100)
      {
        this.displayForm=true;
        this.auth.setSpinnerValue(false);
        setTimeout(this.scrollDown,2000);
        setTimeout(this.getProducts,5000);
        this.uploadProgress=1;
        this.temparr=[]
       this.getProducts();
       this.scrollDown();



      }
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
          this.auth.setSpinnerValue(false);
         this.displayForm=true

          break;
        case 'storage/canceled':
          // User canceled the upload
          this.auth.setSpinnerValue(false);
          this.displayForm=true

          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          this.auth.setSpinnerValue(false);
         this.displayForm=true
         return ;
          break;
      }
    },()=>{
      fileref.getDownloadURL().subscribe((res)=>{
        console.log(res);
        this.downloadingPath=res.toString();

         console.log("downloaded url is",this.downloadingPath);

         this.firestore.collection("IndustryProducts").doc(this.docid).set({"downloadingPath":this.downloadingPath,"docid":this.docid},{merge:true}).then(()=>{
           console.log("Downloaded link is updated in the corresponding doc id successfully");
         },(err)=>{
           console.log(err);
           this.auth.setSpinnerValue(false);
           this.displayForm=true

         })

      },(err)=>{
        console.log(err);
        this.auth.setSpinnerValue(false);

      })
    });





    this.auth.setSpinnerValue(false);


    this.productobj={
      "MaterialName":"" ,
      "MaterialCost":"",
      "MaterialQuantity":"",
      "WarehouseName":"",
      "WarehouseLocation":"",
      "SupplierName":"",
      "SupplierCost":"",
      "SupplierLocation":"",
      "CompanyID":""

    }



   this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
   this.acceptFile=false;










  }

  async checkCompanyExists(){
  await this.firestore.collection("industry").get().forEach(res=>{
        res.docs.map(doc=>{
           let tempdata=doc.data()
           if(tempdata["userid"]==this.homeservice.userId)
           {
             this.industryID.push({"CompanyName":tempdata["companyName"],"CompanyID":tempdata["docid"]});

           }
        })
   })

   if(this.industryID.length==0){
     this.router.navigate(['home/indcrt'])
   }
  }

  scrollTop(){
    document.documentElement.scrollTop=0;
  }
  scrollDown(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  up(){
    document.documentElement.scrollTop=0;
  }

  async delete(selectedItem:any){

    if(confirm("Are you sure want to delete?"))
    {
      this.auth.setSpinnerValue(true);
      await this.deleteImage(selectedItem);


      // document deletions
    this.firestore.collection("IndustryProducts").doc(selectedItem["docid"]).delete().then(res=>{
      console.log("document deleted sucessfully");
      this.auth.setSpinnerValue(false);
      this.temparr=[]
      this.getProducts();
      this.scrollDown();


    }).catch(err=>{
      console.log("Error while deleting a document");
      this.auth.setSpinnerValue(false)

    })

        this.auth.setSpinnerValue(false);
        this.getProducts();



     }
     else{
      this.auth.setSpinnerValue(false);
      return;
     }
  }

  cancel()
  {
    this.displayUpdateButton=false;
   this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
   this.acceptFile=false;
   this.selectedImage=null;
   this.fileName=null;
   this.fileSize=null;
   this.selectedItem={}
   this.productobj={
    "MaterialName":"" ,
    "MaterialCost":"",
    "MaterialQuantity":"",
    "WarehouseName":"",
    "WarehouseLocation":"",
    "SupplierName":"",
    "SupplierCost":"",
    "SupplierLocation":"",
    "CompanyID":""

  }

  this.scrollDown()




  }

  update(item:any){
    console.log("hello from update function");

    this.displayUpdateButton=true
    this.previewImgSrc=item["downloadingPath"];
    this.productobj=item;
    this.acceptFile=true;
    this.selectedItem=item;
    this.selectedDocID=this.selectedItem["docid"];
    console.log(this.selectedItem["docid"])
    console.log(this.selectedItem)
    this.scrollTop()


  }

  async updateData(updateForm:NgForm){
    this.auth.setSpinnerValue(true)
    await this.updateDocument(updateForm.value);
    this.displayForm=false;

    if(this.previewImgSrc!=this.selectedItem["downloadingPath"])
    {

      this.deleteImage(this.selectedItem);
      this.uploadImage()


    }
    else{
      this.auth.setSpinnerValue(false);
      this.displayForm=true;
      this.cancel();
      this.scrollDown();
    }

  }

  async updateDocument(updatedValue:any){

    this.firestore.collection("IndustryProducts").doc(this.selectedItem["docid"]).update(updatedValue).then(()=>{
      console.log("updated successfully");
      this.auth.setSpinnerValue(false);
    },(err)=>{
      console.log(err);
      console.log("error while updating the document data");
      this.auth.setSpinnerValue(false);

    })

  }

  async deleteImage(selectedItem:any){

    // Image deletion
    this.storage.ref(selectedItem["uploadingPath"]).delete().forEach(res=>{
      console.log("Image deleted Successfully")

    }).catch(err=>{
      console.log("some thing error occured in image deletion")
    })


  }


  async uploadImage(){
     // Image Uploading Path
     this.folderPath="IndustryProductsImages";
     this.displayForm=false
     this.uploadingPath=`${this.folderPath}/${this.userId}/${this.userId}_${new Date().getTime()}_${Math.floor(Math.random()*10000)+1}_${this.fileName}`;
     const fileref=this.storage.ref(this.uploadingPath);



       // image uploading into the storage server DB

    this.storage.upload(this.uploadingPath,this.selectedImage,{contentType:this.fileType}).task.on('state_changed',(snapshot)=>{
      this.uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      if(this.uploadProgress==100)
      {
        this.displayForm=true
        this.auth.setSpinnerValue(false);

        this.uploadProgress=1
        this.displayUpdateButton=false
        this.cancel()
        this.getProducts()
        setTimeout(this.getProducts,2000);
      }
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
          this.auth.setSpinnerValue(false);
         this.displayForm=true

          break;
        case 'storage/canceled':
          // User canceled the upload
          this.auth.setSpinnerValue(false);
          this.displayForm=true

          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          this.auth.setSpinnerValue(false);
         this.displayForm=true
         return ;
          break;
      }
    },()=>{
      fileref.getDownloadURL().subscribe((res)=>{
        console.log(res);
        this.downloadingPath=res.toString();
        console.log("downloading path is "+this.downloadingPath);
        this.firestore.collection("IndustryProducts").doc(this.selectedDocID).set({"downloadingPath":this.downloadingPath,"uploadingPath":this.uploadingPath},{merge:true}).then(()=>{
          console.log("Successfully updated the Downloading path");
          this.getProducts()
        },(err)=>{
          console.log("error in updating Downloading path");
        })



      },(err)=>{
        console.log(err);
        this.auth.setSpinnerValue(false);

      })
    });





  }




  async getProducts(){
    this.temparr=[]
    this.mapper=[]
   await this.firestore.collection("IndustryProducts").get().forEach(ref=>{
      ref.docs.map(doc=>{
        if(doc.data()["UserID"]==this.homeservice.userId){
        this.temparr.push(doc.data())
        this.getMapper(doc.data()["CompanyID"])
        }
      })
    }).catch(err=>{
      console.log("some thing err")
    })
  }

  async getMapper(id:string){

    this.industryID.forEach(element => {
      if(element["CompanyID"]==id){
        this.mapper.push(element["CompanyName"])
      }

    });
  }


  sortHeader(sortField:string){
    this.orderField=sortField;
    if(this.reverseSort==true)
    {
      this.reverseSort=false;
    }
    else{
      this.reverseSort=true;
    }
  }

}
