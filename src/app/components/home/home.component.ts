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
    let gprovider=new firebase.auth.GoogleAuthProvider();
    gprovider.setCustomParameters({
      'login_hint': 'anu-fire.herokuapp.com'
    });
    //this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    firebase.auth().signInWithPopup(gprovider);
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
/*//Handling account-exists-with-different-credential Errors-----------------------------
// Step 1.
// User tries to sign in to Google.
this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).catch(function(error) {
  // An error happened.
  if (error.code === 'auth/account-exists-with-different-credential') {
    // Step 2.
    // User's email already exists.
    // The pending Google credential.
    var pendingCred = error.credential;
    // The provider account's email address.
    var email = error.email;
    // Get sign-in methods for this email.
    this.afAuth.auth.fetchSignInMethodsForEmail(email).then(function(methods) {
      // Step 3.
      // If the user has several sign-in methods,
      // the first method in the list will be the "recommended" method to use.
      if (methods[0] === 'password') {
        // Asks the user his password.
        // In real scenario, you should handle this asynchronously.
        var password = this.afAuth.auth.promptUserForPassword(); // TODO: implement promptUserForPassword.
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function(user) {
          // Step 4a.
          return user.link(pendingCred);
        }).then(function() {
          // Google account successfully linked to the existing Firebase user.
          this.afAuth.auth.goToApp();
          this.x=1;
        });
        return ;
      }
      // All the other cases are external providers.
      // Construct provider object for that provider.
      // TODO: implement getProviderForProviderId.
      var provider = this.afAuth.auth.getProviderForProviderId(methods[0]);
      // At this point, you should let the user know that he already has an account
      // but with a different provider, and let him validate the fact he wants to
      // sign in with this provider.
      // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      // so in real scenario you should ask the user to click on a "continue" button
      // that will trigger the signInWithPopup.
      this.afAuth.auth.signInWithPopup(provider).then(function(result) {
        // Remember that the user may have signed in with an account that has a different email
        // address than the first one. This can happen as Firebase doesn't control the provider's
        // sign in flow and the user is free to login using whichever account he owns.
        // Step 4b.
        // Link to Google credential.
        // As we have access to the pending credential, we can directly call the link method.
        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
          // Google account successfully linked to the existing Firebase user.
          this.afAuth.auth.goToApp();
        });
      });
    });
  }
});
*/