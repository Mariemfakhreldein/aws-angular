import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/users/user.model";

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.css']
})
export class SidebarHeaderComponent implements OnInit {

  user : UserModel;

  canStopStartViewInstances: boolean = false; //START_STOP_VIEW_INSTANCE
  canCreateTerminateAssignInstance: boolean = false; //CREATE_TERMINATE_ASSIGN_INSTANCE

  canManageProfile: boolean = false; //MANAGE_PROFILE

  canManageStudents: boolean = false; //MANAGE_STUDENTS
  canViewStudents: boolean = false; //VIEW_STUDENTS

  canManageStaff: boolean = false; //MANAGE_STAFF
  canViewStaff: boolean = false; //VIEW_STAFF

  canViewInstructor: boolean= false; //VIEW_INSTRUCTOR
  canViewUser: boolean = false; //VIEW_INSTRUCTOR

  canManageRoles: boolean = false; //MANAGE_ROLES
  canViewRoles: boolean = false; //VIEW_ROLES

  canViewPrivileges: boolean = false; //VIEW_PRIVILEGES

  canManageTemplates: boolean = false; //MANAGE_TEMPLATES
  canViewTemplates: boolean = false; //VIEW_TEMPLATES

  canViewInstanceLogs: boolean = false; //VIEW_INSTANCE_LOGS

  canViewStatistics:boolean = false; //VIEW_STATISTICS

  canManageTrainingPrograms: boolean = false; //MANAGE_TRAINING_PROGRAMS
  canViewTrainingPrograms: boolean = false; //VIEW_TRAINING_PROGRAMS

  canManageIntakes: boolean = false; //MANAGE_INTAKES
  canViewIntakes: boolean = false; //VIEW_INTAKES

  canManageTracks: boolean = false; //MANAGE_TRACKS
  canViewTracks: boolean = false; //VIEW_TRACKS

  canManageBranches: boolean = false; //MANAGE_BRANCHES
  canViewBranches: boolean = false; //VIEW_BRANCHES

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUserNameAndRole();

    this.canStopStartViewInstances = this.authService.containPrivilege("START_STOP_VIEW_INSTANCE");
    this.canCreateTerminateAssignInstance = this.authService.containPrivilege("CREATE_TERMINATE_ASSIGN_INSTANCE");

    this.canManageProfile = this.authService.containPrivilege("MANAGE_PROFILE")

    this.canManageStudents = this.authService.containPrivilege('MANAGE_STUDENTS');
    // this.canViewStudents = this.authService.containPrivilege("VIEW_STUDENTS")

    this.canManageStaff = this.authService.containPrivilege("MANAGE_STAFF");
    // this.canViewStaff = this.authService.containPrivilege("VIEW_STAFF")

    this.canViewInstructor = this.authService.containPrivilege("VIEW_INSTRUCTOR");
    // this.canViewUser = this.authService.containPrivilege("VIEW_INSTRUCTOR");

    this.canManageRoles = this.authService.containPrivilege("MANAGE_ROLES");
    // this.canViewRoles = this.authService.containPrivilege("VIEW_ROLES");

    // this.canViewPrivileges = this.authService.containPrivilege("VIEW_PRIVILEGES");

    this.canManageTemplates = this.authService.containPrivilege('MANAGE_TEMPLATES');
    // this.canViewTemplates = this.authService.containPrivilege('VIEW_TEMPLATES');

    this.canViewInstanceLogs = this.authService.containPrivilege("VIEW_INSTANCE_LOGS");

    this.canViewStatistics = this.authService.containPrivilege("VIEW_STATISTICS");

    this.canManageTrainingPrograms = this.authService.containPrivilege('MANAGE_TRAINING_PROGRAMS');
    // this.canViewTrainingPrograms = this.authService.containPrivilege("VIEW_TRAINING_PROGRAMS");

    this.canManageIntakes = this.authService.containPrivilege('MANAGE_INTAKES');
    // this.canViewIntakes = this.authService.containPrivilege("VIEW_INTAKES");

    this.canManageTracks = this.authService.containPrivilege('MANAGE_TRACKS');
    // this.canViewTracks = this.authService.containPrivilege("VIEW_TRACKS");

    this.canManageBranches = this.authService.containPrivilege('MANAGE_BRANCHES');
    // this.canViewBranches = this.authService.containPrivilege("VIEW_BRANCHES");
  }

  getUserNameAndRole(){
    this.userService.getUserById().subscribe(
      (response:any)=>{
        this.user = response;
        console.log('success'+response);
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

}
