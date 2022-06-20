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
    this.canManageTemplates = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_TEMPLATES'});
    this.canStopStartViewInstances = this.authService.getPrivileges().some(function(p){ return p === 'START_STOP_VIEW_INSTANCE'});
    this.canViewTemplates = this.authService.getPrivileges().some(function(p){ return p === 'VIEW_TEMPLATE'});
    this.canManageStudents = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_STUDENTS'});
    this.canManageInstructors = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_INSTRUCTORS'});
    this.canManageTrainingPrograms = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_TRAINING_PROGRAMS'});
    this.canManageIntakes = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_INTAKES'});
    this.canManageTracks = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_TRACKS'});
    this.canManageSupervisors = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_SUPERVISORS'});
    this.canManageTrainingManagers = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_TRAINING_PROGRAMS'});
    this.canManageBranches = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_BRANCHES'});
  }

}
