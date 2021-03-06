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
import {UserdetailsComponent} from "./compnents/user/userdetails/userdetails.component";
import {CreateBranchComponent} from "./compnents/branch/create-branch/create-branch.component";
import {ShowBranchsComponent} from "./compnents/branch/show-branchs/show-branchs.component";
import {EditBranchComponent} from "./compnents/branch/edit-branch/edit-branch.component";
import { ManageTracksComponent } from './compnents/tracks/manage-tracks/manage-tracks.component';
import {NotFoundComponent} from "./compnents/pages/not-found/not-found.component";
import {NotAuthorizedComponent} from "./compnents/pages/not-authorized/not-authorized.component";
import {CreateAssignTerminateInstanceGuard} from "./guards/authorization-guards/instances/create-assign-terminate-instance.guard";
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
import {CreateRoleComponent} from "./compnents/roles/create-role/create-role.component";
import {ShowAllRolesComponent} from "./compnents/roles/show-all-roles/show-all-roles.component";
import {ViewTemplatesComponent} from "./compnents/template/view-templates/view-templates.component";
import {AssignTemplateComponent} from "./compnents/template/assign-template/assign-template.component";

import { AddStaffComponent } from './compnents/user/staff/add-staff/add-staff.component';
import {CreateMyinstanceComponent} from "./compnents/instance/create-myinstance/create-myinstance.component";
import {ViewStatisticsGuard} from "./guards/authorization-guards/statistics/view-statistics.guard";
import {ManageStudentsGuard} from "./guards/authorization-guards/users/manage-students.guard";
import {ManageStaffGuard} from "./guards/authorization-guards/users/manage-staff.guard";
import {ManageTracksGuard} from "./guards/authorization-guards/tracks/manage-tracks.guard";
import {ManageIntakesGuard} from "./guards/authorization-guards/intakes/manage-intakes.guard";
import {
  ManageTrainingProgramsGuard
} from "./guards/authorization-guards/trainingPrograms/manage-training-programs.guard";
import {ManageRolesGuard} from "./guards/authorization-guards/role/manage-roles.guard";
import {ViewInstanceLogsGuard} from "./guards/authorization-guards/instances/view.instance.logs.guard";
const routes: Routes = [

  {path:'home', component:HomeComponent , canActivate:[AuthGuard]},
  {path:'dashboard', component:HomeComponent , canActivate:[AuthGuard, ViewStatisticsGuard]},

  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},

  {path:'instances/createInstance',component:CreateInstanceComponent, canActivate:[AuthGuard, CreateAssignTerminateInstanceGuard]},
  {path:'instances/createMyInstance',component:CreateMyinstanceComponent, canActivate:[AuthGuard, CreateAssignTerminateInstanceGuard]},
  {path:'instances/:id',component:ViewInstanceDetailsComponent, canActivate:[AuthGuard, StartStopViewInstanceGuard]},
  {path:'instances',component:ViewInstancesComponent, canActivate:[AuthGuard, StartStopViewInstanceGuard]},

  {path:'template',component:CreateTemplateComponent, canActivate:[AuthGuard, ManageTemplatesGuard]},
  {path:'templates/view',component:ViewTemplatesComponent, canActivate:[AuthGuard, ManageTemplatesGuard]},
  {path:'templates/assign',component:AssignTemplateComponent, canActivate:[AuthGuard, ManageTemplatesGuard]},


  {path:'user/staff/addStaff', component:AddStaffComponent, canActivate:[AuthGuard, ManageStaffGuard]},
  {path:'user/staff/search',component:UserSearchComponent, canActivate:[AuthGuard, ManageStaffGuard]},
  {path:'user/addStudent', component:AddStudentsComponent, canActivate:[AuthGuard, ManageStudentsGuard]},
  //TODO
  {path:'user/edit/:id', component: EdituserComponent, canActivate:[AuthGuard]},
  //TODO
  {path:'users', component:UserdetailsComponent, canActivate:[AuthGuard]},
  {path:'user/profile',component:UserprofileComponent, canActivate:[AuthGuard]},

  {path:'branch/create', component:CreateBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branches', component:ShowBranchsComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'branch/edit/:id', component:EditBranchComponent, canActivate:[AuthGuard, ManageBranchesGuard]},
  {path:'tracks/update_track/:id', component: UpdateTrackComponent, canActivate:[AuthGuard, ManageTracksGuard]},
  {path:'tracks/manage_tracks', component:ManageTracksComponent, canActivate:[AuthGuard, ManageTracksGuard]},
  {path:'tracks/view_tracks', component: ViewTracksComponent, canActivate:[AuthGuard, ManageTracksGuard]},
  //TODO
  {path:'branch/show', component:ShowBranchsComponent, canActivate:[AuthGuard, ManageBranchesGuard]},

  {path:'not-found', component:NotFoundComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},

  {path:'intakes/edit/:id',component:EditIntakeComponent, canActivate:[AuthGuard, ManageIntakesGuard]},
  {path:'intakes/show',component:ShowAllIntakesComponent, canActivate:[AuthGuard, ManageIntakesGuard]},
  {path:'intakes',component:ManageIntakesComponent, canActivate:[AuthGuard, ManageIntakesGuard]},



  {path:'training-programs/show', component: ViewTrainingProgramsComponent, canActivate:[AuthGuard, ManageTrainingProgramsGuard]},
  {path:'training-programs/create', component: CreateTrainingProgramComponent, canActivate:[AuthGuard, ManageTrainingProgramsGuard]},
  {path:'training-programs/edit/:id', component: UpdateTrainingProgramsComponent, canActivate:[AuthGuard, ManageTrainingProgramsGuard]},

  {path:'instances-logs/view', component: ViewInstancesLogsComponent, canActivate:[AuthGuard, ViewInstanceLogsGuard]},


  {path:'roles/create',component:CreateRoleComponent, canActivate:[AuthGuard, ManageRolesGuard]},
  {path:'roles/show-all',component:ShowAllRolesComponent, canActivate:[AuthGuard, ManageRolesGuard]},
  {path:'**',component:NotFoundComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
