import { Component, OnInit } from '@angular/core';

import{AngularFireAuth}from '@angular/fire/auth';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private fms:FlashMessagesService) { }

  ngOnInit() {

  }

  logout() {
    this.afAuth.auth.signOut();
    this.fms.show('You are Logged Out',
    {cssClass:'alert-success',timeout:3000});
  }
}
