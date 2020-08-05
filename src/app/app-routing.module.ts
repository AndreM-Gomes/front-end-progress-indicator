import {AuthGuard} from './guards/auth.guard';
import {LogedGuard} from './guards/loged.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [

  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [LogedGuard]},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
