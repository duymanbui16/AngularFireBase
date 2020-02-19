import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db:AngularFirestore) { }

  // getUser(){
  //   return this.db.collection('items').snapshotChanges();
  // }

  // addItems(item:Items){
  //   return this.db.collection('items').add(item);
  // }

  // deleteItems(itemId:string){
  //   this.db.doc('items/' + itemId).delete();
  // }

  getQuestion(){
    return this.db.collection('questions').snapshotChanges();
  }

  addData(data: Question){
    return this.db.collection('questions').add(data)
  }

  deleteData(dataId:string){
    this.db.doc('questions/' + dataId).delete();
  }

  updateData(data: Question){
    this.db.doc('questions/' + data.id).update(data);
  }
}

interface Question {
  id?:string;
  question?:string;
  ansA?:string;
  ansB?: string;
  correct?: string;
}

