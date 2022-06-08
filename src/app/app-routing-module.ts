import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./compnents/home/home.component";
import {LoginComponent} from "./compnents/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

import { ViewInstancesComponent } from './compnents/instance/view-instances/view-instances.component';
import { CreateInstanceComponent } from './compnents/instance/create-instance/create-instance.component';
import { ViewInstanceDetailsComponent } from './compnents/instance/view-instance-details/view-instance-details.component';
import {CreateTemplateComponent} from "./compnents/template/create-template/create-template.component";
import {CreateBranchComponent} from "./compnents/branch/create-branch/create-branch.component";

const routes: Routes = [
  {path:'home', component:HomeComponent/* , canActivate:[AuthGuard]*/},
  {path:'instances/createInstance',component:CreateInstanceComponent},
  {path:'instances/:id',component:ViewInstanceDetailsComponent},
  {path:'instances',component:ViewInstancesComponent},
  {path:'template',component:CreateTemplateComponent},
  {path:'login', component:LoginComponent},
  {path:'branch/create', component:CreateBranchComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
