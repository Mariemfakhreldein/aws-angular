import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.css']
})
export class SidebarHeaderComponent implements OnInit {


  canManageTemplates: boolean = false;
  canStopStartViewInstances: boolean = false;
  canViewTemplates: boolean = false;
  canManageStudents: boolean = false;
  canManageInstructors: boolean = false;
  canManageTrainingPrograms: boolean = false;
  canManageIntakes: boolean = false;
  canManageTracks: boolean = false;
  canManageSupervisors: boolean = false;
  canManageTrainingManagers: boolean = false;
  canManageBranches: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.canManageTemplates = this.authService.containPrivilege('MANAGE_TEMPLATES');
    this.canStopStartViewInstances = this.authService.containPrivilege('START_STOP_VIEW_INSTANCE');
    this.canViewTemplates = this.authService.containPrivilege('VIEW_TEMPLATE');
    this.canManageStudents = this.authService.containPrivilege('MANAGE_STUDENTS');
    this.canManageInstructors = this.authService.containPrivilege('MANAGE_INSTRUCTORS');
    this.canManageTrainingPrograms = this.authService.containPrivilege('MANAGE_TRAINING_PROGRAMS');
    this.canManageIntakes = this.authService.containPrivilege('MANAGE_INTAKES');
    this.canManageTracks = this.authService.containPrivilege('MANAGE_TRACKS');
    this.canManageSupervisors = this.authService.containPrivilege('MANAGE_SUPERVISORS');
    this.canManageTrainingManagers = this.authService.containPrivilege('MANAGE_TRAINING_MANAGERS');
    this.canManageBranches = this.authService.containPrivilege('MANAGE_BRANCHES');
  }

}
