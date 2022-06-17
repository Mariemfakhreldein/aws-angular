import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.css']
})
export class SidebarHeaderComponent implements OnInit {


  canManageTemplate:boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.canManageTemplate = this.authService.getPrivileges().some(function(p){ return p === 'MANAGE_TEMPLATE'});
  }

}
