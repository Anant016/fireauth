import { Component, OnInit } from '@angular/core';

import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
   id:any;
   city:any;
   bedrooms:any;
   image:any;
   path:any;
  constructor(private router:Router,
    private fs:FirebaseService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.fs.getlistingDetails(this.id).subscribe((listing)=>{
      console.log(listing)
      this.city=listing.city;
      this.bedrooms=listing.bedrooms;
      this.image=listing.image;
      this.path=listing.path

    });
  }

  onEditSubmit(){
    let listing={
      city:this.city,
      bedrooms:this.bedrooms,
      image:this.image,
      path:this.path
    }

    this.fs.updateListing(this.id,listing);

    this.router.navigate(['/listings']);
  }

}
