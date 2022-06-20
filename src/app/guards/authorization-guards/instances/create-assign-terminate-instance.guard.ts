import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CreateAssignTerminateInstanceGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isAuthorized = this.authService.containPrivilege('CREATE_TERMINATE_ASSIGN_INSTANCE');
    if (!isAuthorized){
      this.router.navigateByUrl("not-authorized")
    }
    return isAuthorized;
  }

}
