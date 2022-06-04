import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.css']
})
export class SidebarHeaderComponent implements OnInit {



  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

}
