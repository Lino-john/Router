import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth.guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver";

const appRoutes : Routes = [
    {path:'', component: HomeComponent},
    {path:'users', component: UsersComponent, children: [
      {path:':id/:name', component: UserComponent}
    ]},
    {path:'servers', 
    //canActivate:[AuthGuard], 
    canActivateChild:[AuthGuard],
    component: ServersComponent, 
    children: [
      {path:':id', component: ServerComponent, resolve:{server:ServerResolver}},
      {path:':id/:edit', component: EditServerComponent, canDeactivate:[CanDeactivateGuard]}
    ]},
    {path:'not-found', component: PageNotFoundComponent, data : {message:'Page Not found!'}},
    {path:'not-found', component: ErrorPageComponent},
    {path:'**', redirectTo: 'not-found'},
    // wildcard route will catch all the invalid routes. it should add at the bottom of route list.
  ];

@NgModule({
  imports : [
      // For resolving 404 error router error issues in production environment 
      //RouterModule.forRoot(appRoutes, {useHash:true}) 
      RouterModule.forRoot(appRoutes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}