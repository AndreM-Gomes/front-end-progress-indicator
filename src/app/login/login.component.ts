import { UserService } from '../../app/user.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async signInWithGoogle(){
    const user = await this.userService.googleSignIn();
    if (user){
      this.router.navigate(['/home']);
    }
  }
}
