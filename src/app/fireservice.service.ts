import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { Data } from './data';
import { collection, getFirestore } from '@firebase/firestore';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { sendPasswordResetEmail } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  getEditData: any = []

  constructor(private fService: Firestore, private auth : Auth) { }

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

login(username : string, password: string){
  return from(signInWithEmailAndPassword(this.auth,username,password));
}

signUp(name:string, email:string, password:string){
  return from(createUserWithEmailAndPassword(this.auth, email, password)
  ).pipe(switchMap(({user})=> updateProfile(user,{displayName:name})))
}

logout(){
  return from(this.auth.signOut());
}

// async resetPassword(email: string): Promise<void> {
//   await this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
//      this.router.navigate(['auth/reset-confirm']);
//   }).catch((error) => {
//      this.notifier.showError(error.message);
//   });
// }




}



