import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';

//
import { AngularFireModule } from '@angular/fire';

import { auth } from 'firebase/app';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';

// for AngularFireAuth
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
//
import{AngularFireStorageModule} from '@angular/fire/storage'

//
import{AngularFirestoreModule} from '@angular/fire/firestore';
import { FlashMessagesModule } from 'angular2-flash-messages';

import {environment} from '../environments/environment.prod';
const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'listings',component:ListingComponent},
  {path:'add-listing',component:AddListingComponent},
  {path:'listings/:id',component:ListingsComponent},
  {path:'edit-listing/:id',component:EditListingComponent}
]

export const firebaseConfig={
  apiKey: "AIzaSyBduujd3UvAVlyS0cAOmmP2GN1CE556uW8",
  authDomain: "proplist-5f5f8.firebaseapp.com",
  databaseURL: "https://proplist-5f5f8.firebaseio.com",
  projectId: "proplist-5f5f8",
  storageBucket: "proplist-5f5f8.appspot.com",
  messagingSenderId: "377638039512"
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),  
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule
  ],
  providers: [ AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
