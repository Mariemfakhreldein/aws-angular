import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./compnents/home/home.component";
import {LoginComponent} from "./compnents/login/login.component";


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
