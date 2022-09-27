import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { FormComponent } from './form/form.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoginpageComponent } from './loginpage/loginpage.component'
import { DatalistComponent } from './datalist/datalist.component';

import { provideFirebaseApp,initializeApp} from '@angular/fire/app'
import { getFirestore,provideFirestore} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment.prod';
import {AngularFireModule} from "@angular/fire/compat";
import { MenubarComponent } from './menubar/menubar.component';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { environment } from '../environments/environment.prod';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationformComponent,
    FormComponent,
    DatalistComponent,
    LoginpageComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    AngularFireModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore()),

    // AngularFireAuthModule,
    // AngularFireStorageModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
