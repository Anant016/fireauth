import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireObject, AngularFireList } from "@angular/fire/database";

import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from'@angular/fire/firestore';
import{Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { FlashMessagesModule} from 'angular2-flash-messages';
import * as firebase from 'firebase';

interface Listing{
  bedrooms?:string;
  city?:string;
  image?:string;
  path?:string;  
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  listingsCollection:AngularFirestoreCollection<Listing>;
  listings:Observable<Listing[]>;
  listing:Observable<Listing>;
  listingDoc:AngularFirestoreDocument<Listing>;
 
  folder:any;

  constructor(private afs:AngularFirestore) { 
    this.listingsCollection=this.afs.collection('listings');
    this.listings = this.listingsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Listing;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.folder='listing_images';

  }

  getlistings(){
    return this.listings;
  }

  getlistingDetails(id){
    this.listing = this.afs.collection('listings/').doc(id).valueChanges();
    console.log(this.listing)
     return this.listing;
  }
  
  addListing(listing){
     this.listingsCollection=this.afs.collection('listings');
     var storageRef = firebase.storage().ref();
     for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
           let path=`/${this.folder}/${selectedFile.name}`
           listing.image=selectedFile.name;
           let iRef=storageRef.child(path);
           listing.path=path;
          
           iRef.put(selectedFile).then((snapshot)=>{
             console.log(listing);
            this.listingsCollection.add(listing);   
           })
           
     }
  }

  updateListing(id,listing){
    this.listingsCollection=this.afs.collection('listings');
    this.listingsCollection.doc(id).update(listing);
  }

  delListing(id){
    this.listingsCollection.doc(id).delete();
  }
}
