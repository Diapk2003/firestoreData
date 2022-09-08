import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Data, LoginData } from './data';
import { collection, getFirestore } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  getEditData: any = []

  constructor(private fService: Firestore) { }

  // Registration Data

  // add new data code here
  addData(data: Data) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'RegistrationData'), data)
  }

  // get all data from Database
  getData() {
    let dataRef = collection(this.fService, 'RegistrationData')
    return collectionData(dataRef, { idField: 'id' })
  }

  // Delete all data from Database
  deleteData(data: Data) {
    let docRef = doc(collection(this.fService, 'RegistrationData'), data.id);
    return deleteDoc(docRef)
  }

  setDataById(data: Data) {
    this.getEditData = data
  }

  getDataById() {
    return this.getEditData
  }


  // Update Data from Data base
  updateData(data: Data, Datas: any) {
    let dataRef = doc(this.fService, `RegistrationData/${data}`);
    return updateDoc(dataRef, Datas)
  }


  // Login Data

   // add new data code here
    addloginData(data: LoginData) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'LoginData'), data)
  }
}



