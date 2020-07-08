import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user$ = of(null);
  }

  async googleSignIn(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.user$ = of({
      email: credential.user.email,
      uid: credential.user.uid,
      displayName: credential.user.displayName,
      photoURL: credential.user.photoURL
    });
    return credential;
  }


}
