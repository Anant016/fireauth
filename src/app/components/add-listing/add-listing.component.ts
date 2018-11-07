import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  bedrooms:any;
  path:any;
  image:any;
  city:any;
  constructor(private fs:FirebaseService,
    private router:Router) { }

  ngOnInit() {
  }

  onAddSubmit(){
    let listing={
    bedrooms:this.bedrooms,
    city:this.city,
    path:this.path,
    image:this.image
    }

    this.fs.addListing(listing);
    this.router.navigate(['listings']);

  }

}
