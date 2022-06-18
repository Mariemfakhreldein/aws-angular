import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./compnents/home/home.component";
import {LoginComponent} from "./compnents/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

import { ViewInstancesComponent } from './compnents/instance/view-instances/view-instances.component';
import { CreateInstanceComponent } from './compnents/instance/create-instance/create-instance.component';
import { ViewInstanceDetailsComponent } from './compnents/instance/view-instance-details/view-instance-details.component';
import {LogoutComponent} from "./compnents/logout/logout.component";
import {CreateTemplateComponent} from "./compnents/template/create-template/create-template.component";
import {CreatenewstaffComponent} from "./compnents/user/staff/createnewstuff/createnewstaff.component";
import {UserdetailsComponent} from "./compnents/user/userdetails/userdetails.component";
import {CreateBranchComponent} from "./compnents/branch/create-branch/create-branch.component";
import {ShowBranchsComponent} from "./compnents/branch/show-branchs/show-branchs.component";
import {DetailBranchComponent} from "./compnents/branch/detail-branch/detail-branch.component";
import {EditBranchComponent} from "./compnents/branch/edit-branch/edit-branch.component";

const routes: Routes = [
  {path:'home', component:HomeComponent , canActivate:[AuthGuard]},
  {path:'instances/createInstance',component:CreateInstanceComponent},
  {path:'instances/:id',component:ViewInstanceDetailsComponent},
  {path:'instances',component:ViewInstancesComponent},
  {path:'template',component:CreateTemplateComponent},
  {path:'login', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  {path:'user/createStaff', component:CreatenewstaffComponent},
  {path:'users', component:UserdetailsComponent},
  {path:'branch/create', component:CreateBranchComponent},
  {path:'branches', component:ShowBranchsComponent},
  {path:'branch/detail/:id', component:DetailBranchComponent},
  {path:'branch/edit/:id', component:EditBranchComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
