import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<firebase.User> = of(null);

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user$ = afAuth.authState;
  }

  async googleSignIn(){
    try{
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return credential;
    }
    catch (e){
      console.log(e);
    }
  }

  async emailSignIn(email: string, password: string){
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return credential;
  }

  async emailRegister(email: string, password: string){
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return credential;
  }

}
