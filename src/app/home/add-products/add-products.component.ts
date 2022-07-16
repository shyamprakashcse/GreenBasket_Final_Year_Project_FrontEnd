import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import {finalize} from 'rxjs/operators'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit,AfterViewInit {
 uploadProgress:number=1;
 previewImgSrc:string="/assets/images/image_preview_add_products.jpg" ;
 selectedImage:any=null;
 fileName:string=null;
 fileSize:number=null;
 acceptFile:boolean=false;
 fileType:any;
 firstIndex:number=0;
 prodTypInd:number=0;
 prodInd:number=0;
 productTypes=[];
 productMenu=[];
 selectedProductTitle:string;
 selectedProductType:string;
 selectedProductName:string;
 folderPath:string;
 ProductSchema={};
 userId:any;
 userEmail:any;
 uploadingPath:string;
 downLoadingPath:string;
 CollectionName:string;
 ProductSchemaDOCID:string;
 docrefid:string;
 userSchema:any={};
 schemaExists:boolean=false;
 tempUserProducts=[]
 tempUserSchema:any={}
 secdocrefid:string;
 displayForm:boolean=true;

 productCatagories=[    { title:"Food And Beverages",
                          catagories:[

                        { types:"Cereals and Food Grains",
                          products:["Pulses","Rice","Wheat","Sugar","Salt","Cereals","Oat","Barley","others"]
                        },
                        {
                          types:"Meat And Poultry Foods",
                          products:["Egg","chicken","Birds Meats","Goat","Beef","Pork","Animal Meats","Others"]
                        },
                        {
                          types:"Fresh Dried And Preserved Vegetables",
                          products:["Fresh Vegetables","Frozen Vegetables","Exotic Vegetables","Dried Vegetables","Dehydrated Vegetables","Herbs and Flakes","Lettuces","Greens","Grains","Others"]
                        },
                        {
                          types:"Milk And Dairy Products",
                          products:["Milk","Ghee","Butter","Curd","Cheese","IceCreams","Panner","Others"]
                        },
                        {
                          types:"Cooking Spicies and Masalas",
                          products:["Seed Powders","Masala Powders","Others"]
                        },
                        {
                          types:"Edible Oils and Allied Products",
                          products:["Oils","Others"]
                        }

                       ]
                       },


                       {
                         title:"Agricultural And Farming",
                         catagories:[
                           {
                           types:"Farming Tools Equipments & Machines",
                           products:["Agricultural Pipes","Agricultural Equipments","Agricultural Machinery","Agricultural Implements","Agricultural Tools","others"]
                         },

                         {
                            types:"Tractor,Tractor Parts & Assemblies",
                            products:["Tractor Attachments","Tractor Spare Parts","Tractor","Rotavator","Cultivator","others"]
                         },

                         {
                           types:"Irrigation And Harvesting Machines",
                           products:["Agricultural Irrigation Systems","Harvester","Sprinkler Irrigation Systems","Drip Irrigation Systems","others"]
                         },

                         {
                           types:"Fresh Flowers,Plants & Trees",
                           products:["Fruit Plants","Saplings","Outdoor Plants","Indoor Plants","Garden Plants","others"]
                         },
                         {
                           types:"Bird Food,Poultry,Animal Feeds",
                           products:["Animal Feed Supplement","Cattle feed","Pet feed","others"]
                         },

                         {
                           types:"Coir And Agro Products",
                           products:["Coir Products","Agro Waste Managements","others"]
                         },
                         {
                           types:"Seeds and Plant Saplings",
                           products:["Seed","Seed Spicies","plants seed","Vegetable seeds","Others"]
                         },
                         {
                           types:"fertilizers and soli addictives",
                           products:["Bio-fertilizers","Manure and Organic Fertilizers","Nitrogen Fertilizers","Others"]
                         },
                         {
                           types:"Farming and Pet Animals",
                           products:["Poultry","Aquaculture","Apiculture","Horticulture","Cattle Farming","Others"]
                         }


                        ]
                       },



]
  constructor(private _FireBaseAuth:AngularFireAuth,private storage:AngularFireStorage,
    private _auth:AuthService,private _firestore:AngularFirestore,private _homeService:HomeService,private route:Router) {

   }

  ngOnInit(): void {

    // getting user details

     this._FireBaseAuth.onAuthStateChanged((user)=>{
      this.userId=user.uid;
      this.userEmail=user.email;

     },(err)=>{
       console.log(err);
       alert("Authentication Error");


     });


     // getting user schema



  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.



  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.



  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.


  }

  uploadFile(uploadingPath:any)
 {
   const fileref=this.storage.ref(uploadingPath);
 //  await this.storage.upload(uploadingPath,this.selectedImage,{contentType:this.fileType});

   fileref.put(this.selectedImage,{contentType:this.fileType}).then((res)=>{
    res.ref.getDownloadURL().then((link)=>{
      console.log(link);
    })
  })


 }
 showSpinner():boolean{
   return this._auth.getSpinnerValue();
 }


  showPreview(event:any,sellerform:NgForm){
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
      if(fileSizeInMB>=0 && fileSizeInMB<=2)
      {
        console.log("no problem file is within the limit of 2mb");
        this.acceptFile=true;
      }
      else{

        this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
        this.acceptFile=false;
        this.fileName='';
        this.fileSize=null;
        sellerform.reset();
        alert("fileSize should be less than 5MB.");
        this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

      }

    }
    else{
      this.previewImgSrc="/assets/images/image_preview_add_products.jpg" ;
      this.acceptFile=false;
      alert("file uploading error");
      sellerform.reset();
    }


  }

  getFolder(CatInd:number,ProdInd:number){
    var FolderName="";
    if(CatInd==0)
    {
      if(ProdInd==0)
      {
        FolderName="CEREALSANDFOODGRAINS"

      }
      else if(ProdInd==1)
      {
        FolderName="MEATANDPOULTRYFOODS"
      }
      else if(ProdInd==2)
      {
        FolderName="FRESHDRIEDPRESERVEDVEGETABLESFRUITS"
      }
      else if(ProdInd==3)
      {
        FolderName="MILKANDDAIRYPRODUCTS"
      }
      else if(ProdInd==4)
      {
        FolderName="COOKINGSPICIESANDMASALAS"
      }
      else if(ProdInd==5)
      {
        FolderName="EDIBLEOILSANDALLIEDPRODUCTS"
      }
    }
    else if(CatInd==1)
    {
      if(ProdInd==0)
      {
        FolderName="FARMINGTOOLSANDMACHINEEQUIPMENTS"
      }
      else if(ProdInd==1)
      {
        FolderName="TRACTORANDPARTS"
      }
      else if(ProdInd==2)
      {
        FolderName="IRRIGATIONANDMACHINES"
      }
      else if(ProdInd==3)
      {
        FolderName="FRESHFLOWERSPLANTSANDTREES"
      }
      else if(ProdInd==4)
      {
        FolderName="BIRDFOODPOULTRYANIMALFEED"
      }
      else if(ProdInd==5)
      {
        FolderName="COIRANDAGROPRODUCTS"
      }
      else if(ProdInd==6)
      {
        FolderName="SEEDSANDPLANTSAPLINGS"
      }
      else if(ProdInd==7)
      {
        FolderName="FERTILIZERSANDSOILADDICTIVES"
      }
      else if(ProdInd==8)
      {
        FolderName="FARMINGANDPETANIMALS"
      }

    }

    return FolderName;

  }

  updateSelectedProductIndex(prodTitleIndex:any)
  {
     this.firstIndex=prodTitleIndex;
     this.prodTypInd=0;
     this.prodInd=0;
     this.productMenu=[];
     this.productTypes=[];

     let productObject=[]
     this.productCatagories[this.firstIndex].catagories.forEach(element => {
       productObject.push(element.types);

     });
     this.productTypes=productObject;

     //console.log(this.productTypes);
  }
  updateSelectedProductTypeIndex(prodTypeInd:any)
  {
    this.prodTypInd=prodTypeInd;
    this.prodInd=0;
    let prodmenu=[];
    this.productCatagories[this.firstIndex].catagories[this.prodTypInd].products.forEach(element => {
      prodmenu.push(element);
    });
    this.productMenu=prodmenu;
    //console.log(this.productMenu);
  }




 async  submit(sellerForm:NgForm){
   // console.log(sellerForm.value);
    //console.log(sellerForm.valid);
    //console.log(this.fileName);
    //console.log(this.fileSize);
    console.log(this.schemaExists);
    this.displayForm=false;

    this.selectedProductTitle=this.productCatagories[sellerForm.value.productTitleIndex].title;
    this.selectedProductType=this.productCatagories[sellerForm.value.productTitleIndex].catagories[sellerForm.value.productTypeIndex].types;
    this.selectedProductName=this.productCatagories[sellerForm.value.productTitleIndex].catagories[sellerForm.value.productTypeIndex].products[sellerForm.value.product];
   // console.log(this.selectedProductTitle);
    //console.log(this.selectedProductType);
    //console.log(this.selectedProductName);
    this.folderPath= this.getFolder(sellerForm.value.productTitleIndex,sellerForm.value.productTypeIndex);
    this.CollectionName=this.folderPath;
   this.uploadingPath=`${this.folderPath}/${this.userId}_${new Date().getTime()}_${Math.floor(Math.random()*10000)+1}_${this.fileName}`;
   const fileref=this.storage.ref(this.uploadingPath);





    /*const task=this.storage.upload(this.uploadingPath,this.selectedImage).then((snapshot)=>{
      snapshot.ref.getDownloadURL().then((url)=>{
        console.log(url);
      })
    })*/



   /* const task=fileref.put(this.selectedImage,{contentType:this.fileType}).then((snapshot)=>{
      snapshot.ref.getDownloadURL().then(url=>{
        this.downLoadingPath=url;

        console.log(this.downLoadingPath);
      })
    })*/





   /* await fileref.put(this.selectedImage,{contentType:this.fileType}).then((res)=>{
      res.ref.getDownloadURL().then((link)=>{
       this.ProductSchema["DownLoadingPath"]=link;
       console.log(link);
      })
    })*/










    this.ProductSchema["ProductNameLocal"]=sellerForm.value.productname;
    this.ProductSchema["Cost"]=sellerForm.value.cost;
    this.ProductSchema["ShopName"]=sellerForm.value.shopname;
    this.ProductSchema["ShopAddress"]=sellerForm.value.shopaddress;
    this.ProductSchema["ProductCatagory"]=this.selectedProductTitle;
    this.ProductSchema["ProductType"]=this.selectedProductType;
    this.ProductSchema["ProductName"]=this.selectedProductName;
    this.ProductSchema["State"]=sellerForm.value.state;
    this.ProductSchema["City"]=sellerForm.value.city;
    this.ProductSchema["Contact"]=sellerForm.value.contact;
    this.ProductSchema["UserID"]=this.userId;
    this.ProductSchema["UserEMAIL"]=this.userEmail;
   this.ProductSchema["FolderPath"]=this.folderPath;
    this.ProductSchema["FileName"]=this.fileName;
    this.ProductSchema["UploadPath"]=this.uploadingPath;
    this.ProductSchema["CollectionName"]=this.CollectionName;

    //new try start
    this._auth.setSpinnerValue(true);
   await this._firestore.collection(this.folderPath).add(this.ProductSchema).then(docref=>{

      this.docrefid=docref.id;
      console.log("docref id is"+" "+this.docrefid);

    }).catch(err=>{
      alert("error while uploading ");
      console.log(err);
      sellerForm.reset();
      this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

           this._auth.setSpinnerValue(false);
    });

    // checking the user existence

  //  await this._firestore.collection("USERLIST").get().forEach(res=>{
  //     res.docs.map(doc=>{

  //       if(doc.id==this.userId)
  //       {
  //         // user has already created a product so this is not their first products
  //         this.schemaExists=true;
  //         console.log("user has already uploaded some products")


  //       }



  //     })

  //   });




  //   if(this.schemaExists==true)
  //   {

  //     const snapshot=  this._firestore.collection("USERLIST").get()

  //     snapshot.forEach(res=>{
  //       res.docs.map(doc=>{
  //         if(doc.id==this.userId){
  //        this.tempUserSchema=doc.data();
  //        this.tempUserSchema["USERPRODUCTS"].push({"FOLDERNAME":this.folderPath,"PRODDOCID":this.docrefid});
  //        this.tempUserProducts=this.tempUserSchema["USERPRODUCTS"]
  //         console.log(doc.data());
  //         console.log("temp user schema is "+ " "+this.tempUserSchema)
  //       //console.log("hey from doc fetcher",doc.data()["downloadlink"]);

  //       this._firestore.collection("USERLIST").doc(this.userId).set({"USERPRODUCTS":this.tempUserProducts},{merge:true}).then(()=>{
  //         console.log("user schema updated successfully");
  //       }, (err)=>{
  //         console.log(err);
  //         sellerForm.reset();
  //          this._auth.setSpinnerValue(false);
  //       })

  //     }
  //       })
  //     });

  //   }
  //   else{
  //     this.tempUserSchema["USERPRODUCTS"]=[{"FOLDERNAME":this.folderPath,"PRODDOCID":this.docrefid}];
  //     this.tempUserSchema["INDUSTRY"]=[]
  //     this.tempUserSchema["INDUSTRYPROD"]=[]
  //     this.tempUserSchema["PROFILE"]=[]
  //     this.tempUserSchema["QUESTION"]=[]
  //     console.log(this.tempUserSchema);

  //     this._firestore.collection("USERLIST").doc(this.userId).set(this.tempUserSchema).then(docref=>{

  //      console.log("new user schema added sucessfully");

  //     }).catch(err=>{
  //       console.log(err);
  //       sellerForm.reset();
  //          this._auth.setSpinnerValue(false);
  //          this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

  //     }) ;


  //   }



  //   // await this._firestore.collection(this.userId).add({"ProductSchemaType":this.folderPath,"ProductSchemaID":this.docrefid}).then(res=>{
    //   console.log("Successfully Record Schema uploaded");
    // }).catch(err=>{
    //   console.log(err);
    // });



    // PRODUCT IMAGE UPLOADING AND IT WILL RETURN DOWNLOADING PATH
    this.storage.upload(this.uploadingPath,this.selectedImage,{contentType:this.fileType}).task.on('state_changed',(snapshot)=>{
      this.uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log("Upload is "+this.uploadProgress+"% done");
      if(this.uploadProgress==100)
      {
        this.route.navigateByUrl('/home/view');
      }
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
          sellerForm.reset();
           this._auth.setSpinnerValue(false);
           this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

          break;
        case 'storage/canceled':
          // User canceled the upload
          sellerForm.reset();
           this._auth.setSpinnerValue(false);
           this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          sellerForm.reset();
           this._auth.setSpinnerValue(false);
           this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

          break;
      }
    },()=>{
      fileref.getDownloadURL().subscribe((res)=>{
        console.log(res);
        this.downLoadingPath=res.toString();
        console.log(this.ProductSchema);
         console.log("downloaded url is",this.downLoadingPath);

         // ADDING RETURNED PRODUCT IMAGE DOWNLOADING PATH IN DOCUMENT OBEJECT
         this._firestore.collection(this.CollectionName).doc(this.docrefid).set({"downloadlink":this.downLoadingPath,"docid":this.docrefid},{merge:true}).then(()=>{
           console.log("Succesfully uploaded and updated download link");
         },(err)=>{
           console.log(err);
           sellerForm.reset();
           this._auth.setSpinnerValue(false);
           this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

         })
      },(err)=>{
        console.log(err);
        sellerForm.reset();
           this._auth.setSpinnerValue(false);
           this.previewImgSrc="/assets/images/image_preview_add_products.jpg"

      })
      sellerForm.reset();
      this.previewImgSrc="/assets/images/image_preview_add_products.jpg"
      this._auth.setSpinnerValue(false);

    })


    this.displayForm=false;
    this._auth.setSpinnerValue(false);

    // new try end here.

    //downloading path getting
   /*this._auth.setSpinnerValue(true);
    await fileref.put(this.selectedImage,{contentType:this.fileType}).then((res)=>{


      res.ref.getDownloadURL().then((url)=>{

        this.downLoadingPath.push(url);

        console.log("downloading path is",this.downLoadingPath);
        this.ProductSchema["Image"]=this.downLoadingPath;


      }).catch(err=>{
        console.log("error in file uploading",err);
      })

    })

    this._auth.setSpinnerValue(false);


    this._firestore.collection(this.folderPath).add(this.ProductSchema).then(docref=>{
      console.log(docref.id);
      let record={};
      record["ProductSchemaType"]=this.folderPath;
      record["ProductSchemaID"]=docref.id;

      this._firestore.collection(this.userId).add(record);


    }).catch(err=>{
      console.log(err);
    })*/

    //old try
    /*
    console.log(this.ProductSchema);
    console.log("downloaded url is",this.downLoadingPath);*/
  }




}

  // -----------------  FIREBASE USER PRODUCT UPLOADING SCHEMA -----------------------------

  //    ------FOLDER_NAME ------  AGRICULTURALANDFARMING
  //            -----PROD_DOCID1       --SA#2JJEBWUEGSBB123AH

  //                       {
  //                                      PRODUCT SCHEMA OBJECTS 1
                                          // PRODUCT_NAME: TRACTOR
                                          // CITY:CHENNAI,
                                          //
  //                        }

  //           -----PROD_DOCID2
  //                      {
  //                        PRODUCT SCHEMA OBJECTS 2
  //                      }


          //  -----UID------------
                      // ---USER_DOCID1
                      //        {
                      //          PRODUCTSCHEMA_TYPE:FOLDERNAME
                      //          PRODUCTSCHEMA_ID : PROD_DOCID1
                      //        }
