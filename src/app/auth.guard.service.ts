import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
// This is a interface
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
   canActivate(route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return  this.authService.isAuthenticated().then((authenticated:boolean)=>{
         if(authenticated) {
             return true;
         } else {
             this.route.navigate(['/']);
             //return false ; May be required aviod default navigtion 
         }
     })
   }
   canActivateChild(route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        return  this.canActivate(route, state);
   } 
   constructor(private authService:AuthService, private route : Router) {
     
   }
}