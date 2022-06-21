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
import { ManageTracksComponent } from './compnents/tracks/manage-tracks/manage-tracks.component';
import {NotFoundComponent} from "./compnents/pages/not-found/not-found.component";
import {NotAuthorizedComponent} from "./compnents/pages/not-authorized/not-authorized.component";
import {
  CreateAssignTerminateInstanceGuard
} from "./guards/authorization-guards/instances/create-assign-terminate-instance.guard";
import {StartStopViewInstanceGuard} from "./guards/authorization-guards/instances/start.stop.view.instance.guard";
import {ManageTemplatesGuard} from "./guards/authorization-guards/templates/manage-templates.guard";
import {ManageBranchesGuard} from "./guards/authorization-guards/branches/manage-branches.guard";
import { ManageIntakesComponent} from "./compnents/intakes/manage-intakes/manage-intakes.component"
import  {ShowAllIntakesComponent} from "./compnents/intakes/show-all-intakes/show-all-intakes.component";

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'instances/createInstance',component:CreateInstanceComponent, canActivate:[AuthGuard, CreateAssignTerminateInstanceGuard] },
  {path:'instances/:id',component:ViewInstanceDetailsComponent, canActivate:[AuthGuard, StartStopViewInstanceGuard]},
  {path:'instances',component:ViewInstancesComponent, canActivate:[AuthGuard, StartStopViewInstanceGuard]},
  {path:'template',component:CreateTemplateComponent, canActivate:[AuthGuard, ManageTemplatesGuard]},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  {path:'user/createStaff', component:CreatenewstaffComponent, canActivate:[AuthGuard]},
  {path:'users', component:UserdetailsComponent},
  {path:'branch/create', component:CreateBranchComponent},
  {path:'branches', component:ShowBranchsComponent},
  {path:'branch/detail/:id', component:DetailBranchComponent},
  {path:'branch/edit/:id', component:EditBranchComponent},
  {path:'tracks/manage_tracks', component:ManageTracksComponent},
  {path:'branch/create', component:CreateBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branch/show', component:ShowBranchsComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branch/detail/:id', component:DetailBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard] },
  {path:'not-found', component:NotFoundComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'branch/edit/:id', component:EditBranchComponent},
  {path:'intakes/show',component:ShowAllIntakesComponent},
  {path:'intakes',component:ManageIntakesComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
