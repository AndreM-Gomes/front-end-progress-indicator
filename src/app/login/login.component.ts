import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../app/user.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { tap, take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.pipe(
      take(1),
      map(user => !!user)
    )
    .subscribe( isLoged => {
      if (isLoged){
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  async signInWithGoogle(){
    const user = await this.userService.googleSignIn();
    if (user){
      this.router.navigate(['/home']);
    }
  }
}
