import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute,Params} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
   id:any;
   listing:any;
   imageUrl:any;
  constructor(private firebaseService:FirebaseService,
            private router:Router,
            private route:ActivatedRoute) { }

  ngOnInit() {
    //get id
    this.id=this.route.snapshot.params['id'];

    this.listing=this.firebaseService.getlistingDetails(this.id).subscribe(listing=>{
      this.listing=listing;
      console.log('IIIIIIIIIIIIIIIIIIIIIIIII')
      console.log(listing);
      let storageRef=firebase.storage().ref();
      let spaceRef =storageRef.child(listing.path);

      storageRef.child(listing.path).getDownloadURL().then((url)=>{
        this.imageUrl=url;
      }).catch((error)=>{
        console.log(error);
      })
    });
     
   
  }

  onDelClick(){
    this.firebaseService.delListing(this.id);

    this.router.navigate(['listings']);
  }

}
