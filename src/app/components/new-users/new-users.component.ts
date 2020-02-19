import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent implements OnInit {

  data: {};
  editState:boolean=false;
  dataToEdit: Question;


  ques:Question={
    question:'',
    ansA:'',
    ansB:'',
    correct: ''
  }

  constructor(public userService: UsersService) { }

  ngOnInit() {

     // console.log(this.data);
    
    this.userService.getQuestion().subscribe(async data => {
      this.data = await data.map(e => {
        return {
          id: e.payload.doc.id,
          ques: e.payload.doc.get('question'),
          ansA: e.payload.doc.get('ansA'),
          ansB: e.payload.doc.get('ansB'),
          correct: e.payload.doc.get('correct')
        }
      });
    })
  }

  onSubmit(){
    if(this.ques.question!=''&&this.ques.ansA!=''&&this.ques.ansB!='' && this.ques.correct!='')
    {
          this.userService.addData(this.ques);
          this.ques.question='';
          this.ques.ansA='';
          this.ques.ansB='';
          this.ques.correct='';
    }
  }

  OnReset(){
    this.ques.question='';
    this.ques.ansA='';
    this.ques.ansB='';
    this.ques.correct='';
  }

  editData(event, data){
    this.editState=true;
    this.dataToEdit= data
  }

  clearData(){
    this.editState=false;
    this.dataToEdit= null;
  }



  deleteData(id: string) {
    this.userService.deleteData(id);
    // this.userService.deleteItems(id);
  }

  update(ques: Question){
    this.userService.updateData(ques);
    this.clearData();
  }
}


interface Question {
  id?:string;
  question?:string;
  ansA?:string;
  ansB?: string;
  ansC?:string;
  ansD?: string;
  correct?: string;
}


