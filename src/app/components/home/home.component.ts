import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFireStorage } from '@angular/fire/storage';

import {Observable } from 'rxjs';
 import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  x:number;
  constructor(public afAuth: AngularFireAuth,
              private afStorage:AngularFireStorage) { }

  ngOnInit() {
  }

  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }
  //Simple---------------------
  //signInWithPopup
  //this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

  login_fb(){
    let provider=new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'Anu';
    const task = this.afStorage.upload(filePath, file);
  }

}
