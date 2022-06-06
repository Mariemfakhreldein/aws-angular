import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarHeaderComponent } from './compnents/sidebar-header/sidebar-header.component';
import {AppRoutingModule} from "./app-routing-module";
import {HomeComponent} from "./compnents/home/home.component";
import {LoginComponent} from "./compnents/login/login.component";
import {HttpClientModule, HttpClient} from "@angular/common/http";

import {NgxPaginationModule} from 'ngx-pagination';
import { ViewInstancesComponent } from './compnents/instance/view-instances/view-instances.component';
import { CreateInstanceComponent } from './compnents/instance/create-instance/create-instance.component';
import { ViewInstanceDetailsComponent } from './compnents/instance/view-instance-details/view-instance-details.component';
import {CreateTemplateComponent} from "./compnents/template/create-template/create-template.component";
import { CreatenewstuffComponent } from './compnents/user/staff/createnewstuff/createnewstuff.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarHeaderComponent,
    HomeComponent,
    LoginComponent,
    ViewInstancesComponent,
    CreateInstanceComponent,
    ViewInstanceDetailsComponent,
    CreateTemplateComponent,
    CreatenewstuffComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
