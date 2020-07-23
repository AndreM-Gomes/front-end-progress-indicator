import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){}  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user$.pipe(
      take(1),
      map(user => !user),
      tap( notLogged => {
        if (!notLogged){
          this.router.navigate(['/home']);
        }
      })
    );
  }

}
