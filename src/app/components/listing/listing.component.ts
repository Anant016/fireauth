import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

interface Listing{
  bedroom?:string;
  city?:string;
  image?:string;
  path?:string;  
}
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(public fs:FirebaseService) { }
  listings:Listing[];
  ngOnInit() {
    this.fs.getlistings().subscribe(listings=>{
      console.log(listings);
      this.listings=listings;
    })
  }

}
