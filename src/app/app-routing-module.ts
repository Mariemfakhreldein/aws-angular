import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

import { ViewInstancesComponent } from './components/instance/view-instances/view-instances.component';
import { CreateInstanceComponent } from './components/instance/create-instance/create-instance.component';
import { ViewInstanceDetailsComponent } from './components/instance/view-instance-details/view-instance-details.component';
import {LogoutComponent} from "./components/logout/logout.component";
import {CreateTemplateComponent} from "./components/template/create-template/create-template.component";
import {CreatenewstaffComponent} from "./components/user/staff/createnewstuff/createnewstaff.component";
import {UserdetailsComponent} from "./components/user/userdetails/userdetails.component";
import {CreateBranchComponent} from "./components/branch/create-branch/create-branch.component";
import {ShowBranchsComponent} from "./components/branch/show-branchs/show-branchs.component";
import {DetailBranchComponent} from "./components/branch/detail-branch/detail-branch.component";
import {EditBranchComponent} from "./components/branch/edit-branch/edit-branch.component";
import { ManageTracksComponent } from './components/tracks/manage-tracks/manage-tracks.component';
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {NotAuthorizedComponent} from "./components/pages/not-authorized/not-authorized.component";
import {
  CreateAssignTerminateInstanceGuard
} from "./guards/authorization-guards/instances/create-assign-terminate-instance.guard";
import {StartStopViewInstanceGuard} from "./guards/authorization-guards/instances/start.stop.view.instance.guard";
import {ManageTemplatesGuard} from "./guards/authorization-guards/templates/manage-templates.guard";
import {ManageBranchesGuard} from "./guards/authorization-guards/branches/manage-branches.guard";
import { ManageIntakesComponent} from "./components/intakes/manage-intakes/manage-intakes.component"
import  {ShowAllIntakesComponent} from "./components/intakes/show-all-intakes/show-all-intakes.component";

import { ViewTracksComponent } from './components/tracks/view-tracks/view-tracks.component';
import { UpdateTrackComponent } from './components/tracks/update-track/update-track.component';

import { ViewTrainingProgramsComponent } from './compnents/training-programs/view-training-programs/view-training-programs.component';
import { CreateTrainingProgramComponent } from './compnents/training-programs/create-training-program/create-training-program.component';
import { UpdateTrainingProgramsComponent } from './compnents/training-programs/update-training-programs/update-training-programs.component';

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
  {path:'tracks/update_track/:id', component: UpdateTrackComponent},
  {path:'tracks/manage_tracks', component:ManageTracksComponent},
  {path:'branch/create', component:CreateBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branch/show', component:ShowBranchsComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branch/detail/:id', component:DetailBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard] },
  {path:'not-found', component:NotFoundComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'branch/edit/:id', component:EditBranchComponent},
  {path:'intakes/show',component:ShowAllIntakesComponent},
  {path:'intakes',component:ManageIntakesComponent},

  {path:'tracks/view_tracks', component: ViewTracksComponent},

  {path:'training-programs/show', component: ViewTrainingProgramsComponent},
  {path:'training-programs/create', component: CreateTrainingProgramComponent},
  {path:'training-programs/edit/:id', component: UpdateTrainingProgramsComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
