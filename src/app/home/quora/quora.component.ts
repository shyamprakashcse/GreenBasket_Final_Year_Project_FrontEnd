import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-quora',
  templateUrl: './quora.component.html',
  styleUrls: ['./quora.component.css']
})



export class QuoraComponent implements OnInit {


  constructor(private _firebaseauth:AngularFireAuth,private _firestore:AngularFirestore) { }




  questionslist:any=[]
  QuestionObject:any={}
  docIdList:any=[]
  answers=[]
  showanswerstatus:boolean=false;
  showquestionbox:boolean=false;
  selectedIndex:number=-1;
  selecteddocid:string=""
  showanswer:boolean=false;
  userans:string="";
  query:any;
  LikesColor="blue";
  userid:string="";
  useremail:string="";
  unwantedKeywords=[]
  mainKeywords=[]
  userquery:string="";
  searchInput:any={question:""}
  page:number=1





  ngOnInit(): void {

    // getting current username and their details

    this._firebaseauth.onAuthStateChanged((user:any)=>{
      this.userid=user.uid;
      this.useremail=user.email;


    },(err:any)=>{
      console.log(err);
    });



    // getting questions from firebase db.

    const snapshot=this._firestore.collection("quora").get();
    snapshot.forEach(res=>{
      res.docs.map(doc=>{



        let tempobject=doc.data()
        tempobject["docid"]=doc.id;
        this.questionslist.push(tempobject);
        console.log(tempobject);
      //console.log("hey from doc fetcher",doc.data()["downloadlink"]);
      })
    });






  }


 show()
 {


   this.query=this.userquery.split(" ");
   console.log("splitted query is",this.query);
   this.userquery="";
 }

 AddQuestion(qform:NgForm){
   console.log(qform.value.question);
   this.QuestionObject={};
   this.QuestionObject["userid"]=this.userid;
   this.QuestionObject["useremail"]=this.useremail;
   this.QuestionObject["question"]=qform.value.question;
   this.QuestionObject["date"]=this.getCurrentDate();
   this.QuestionObject["answers"]=[];
   this.QuestionObject["likes"]=0;
   this.QuestionObject["likestatus"]=0;
   this.questionslist.push(this.QuestionObject);
   console.log(this.questionslist);

   qform.reset();
   this.showquestionbox=false;

   this._firestore.collection("quora").add(this.QuestionObject).then((docref)=>{
     console.log(docref.id);
     this.docIdList.push(docref.id);
   }).catch((err)=>{
     console.log(err);
   })


 }

 AddAnswer(){


 console.log("hello this is user ans",this.userans);
  let answerobject={};
  answerobject["userid"]=this.userid;
  answerobject["useremail"]=this.useremail;
  answerobject["likes"]=0;
  answerobject["date"]=this.getCurrentDate();
  answerobject["answer"]=this.userans;
  this.showanswerstatus=false;
  this.questionslist[this.selectedIndex]["answers"].push(answerobject);
  this.userans="";
  let docid=this.questionslist[this.selectedIndex]["docid"];

  let tempansarr=this.questionslist[this.selectedIndex]["answers"]

  this._firestore.collection("quora").doc(docid).update({"answers":tempansarr}).then(()=>{
    console.log("answer uploaded successfully");

  }).catch((err)=>{
    console.log("error while uploading the document ",err);
  });



  this.selectedIndex=-1;

 }

 Reply(index:number){
  this.selectedIndex=index;
   this.showanswerstatus=true;

    document.documentElement.scrollTop=0;
 }

 ToggleLikes(index:number){
   if(this.questionslist[index]["likestatus"]==0)
   {
     this.questionslist[index]["likestatus"]=1;
     this.questionslist[index]["likes"]+=1;
     this._firestore.collection("quora").doc(this.questionslist[index]["docid"]).update({"likes":this.questionslist[index]["likes"]}).then(()=>{
       console.log("likes updated sucessfully");
     }).catch((err)=>{
       console.log("error in updating the likes object",err);
     })

   }
   else{
    this.questionslist[index]["likestatus"]=0;
    this.questionslist[index]["likes"]-=1;

    this._firestore.collection("quora").doc(this.questionslist[index]["docid"]).update({"likes":this.questionslist[index]["likes"]}).then(()=>{
      console.log("likes updated sucessfully");
    }).catch((err)=>{
      console.log("error in updating the likes object",err);
    })

   }

 }

 showAskQuestionPopUp(){
   this.showquestionbox=true;
   document.documentElement.scrollTop=0;
 }

 closeQuestionBox(){
   this.showquestionbox=false;
 }
  closeAnswerBox(){
    this.showanswerstatus=false;
    this.selectedIndex=-1;
  }

  answersButton(){
    this.showanswer=true;
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
  }
  closeAnswerButton()
  {
    this.showanswer=false;
  }



  getCurrentDate()
  {
    let d=new Date();
  let splitteddate=d.toString().split(" ");


    return (splitteddate[1]+" "+splitteddate[2]+" "+splitteddate[3])
  }


}
