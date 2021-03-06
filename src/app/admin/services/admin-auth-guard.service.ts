import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean>{
    return this.authService.appUser$
      .map(appUser=> appUser.isAdmin);
  }
}
