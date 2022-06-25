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
import {CreatenewstudentComponent} from "./compnents/user/student/createnewstudent/createnewstudent.component";
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

import { ViewTracksComponent } from './compnents/tracks/view-tracks/view-tracks.component';
import { UpdateTrackComponent } from './compnents/tracks/update-track/update-track.component';
import {EdituserComponent} from "./compnents/user/edituser/edituser.component";
import {UserSearchComponent} from "./compnents/user/user-search/user-search.component";
import {EditIntakeComponent} from "./compnents/intakes/edit-intake/edit-intake.component";

import { ViewTrainingProgramsComponent } from './compnents/training-programs/view-training-programs/view-training-programs.component';
import { CreateTrainingProgramComponent } from './compnents/training-programs/create-training-program/create-training-program.component';
import { UpdateTrainingProgramsComponent } from './compnents/training-programs/update-training-programs/update-training-programs.component';
import {AddStudentsComponent} from "./compnents/user/students/add-students/add-students.component";
import {UserprofileComponent} from "./compnents/user/userprofile/userprofile.component";
import { ViewInstancesLogsComponent } from './compnents/instance-logs/view-instances-logs/view-instances-logs.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'instances/createInstance',component:CreateInstanceComponent, canActivate:[AuthGuard, CreateAssignTerminateInstanceGuard] },
  {path:'instances/:id',component:ViewInstanceDetailsComponent, canActivate:[AuthGuard, StartStopViewInstanceGuard]},
  {path:'instances',component:ViewInstancesComponent, canActivate:[AuthGuard, StartStopViewInstanceGuard]},
  {path:'template',component:CreateTemplateComponent, canActivate:[AuthGuard, ManageTemplatesGuard]},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  {path:'user/createStaff', component:CreatenewstaffComponent, canActivate:[AuthGuard]},
  {path:'user/staff/search',component:UserSearchComponent},
  {path:'users', component:UserdetailsComponent},
  {path:'branch/create', component:CreateBranchComponent},
  {path:'branches', component:ShowBranchsComponent},
  {path:'branch/edit/:id', component:EditBranchComponent},
  {path:'tracks/update_track/:id', component: UpdateTrackComponent},
  {path:'tracks/manage_tracks', component:ManageTracksComponent},
  {path:'branch/create', component:CreateBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branch/show', component:ShowBranchsComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'not-found', component:NotFoundComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'branch/edit/:id', component:EditBranchComponent},
  {path:'intakes/edit/:id',component:EditIntakeComponent},
  {path:'intakes/show',component:ShowAllIntakesComponent},
  {path:'intakes',component:ManageIntakesComponent},
  {path:'tracks/view_tracks', component: ViewTracksComponent},
  {path:'user/edit/:id', component: EdituserComponent},

  {path:'training-programs/show', component: ViewTrainingProgramsComponent},
  {path:'training-programs/create', component: CreateTrainingProgramComponent},
  {path:'training-programs/edit/:id', component: UpdateTrainingProgramsComponent},
  {path:'training-programs/edit/:id', component: UpdateTrainingProgramsComponent},

  {path:'instances-logs/view', component: ViewInstancesLogsComponent},

  {path:'branch/show', component:ShowBranchsComponent},
  {path:'user/createStudent',component:CreatenewstudentComponent},
  {path:'user/profile',component:UserprofileComponent},

  // {path:'user/createStudent',component:CreatenewstudentComponent},
  {path:'user/addStudent', component:AddStudentsComponent, canActivate:[AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
