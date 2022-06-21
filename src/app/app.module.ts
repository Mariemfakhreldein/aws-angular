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
import { CreatenewstaffComponent } from './compnents/user/staff/createnewstuff/createnewstaff.component';
import { UserdetailsComponent } from './compnents/user/userdetails/userdetails.component';
import { LogoutComponent } from './compnents/logout/logout.component';
import { CreateBranchComponent } from './compnents/branch/create-branch/create-branch.component';
import { ShowBranchsComponent } from './compnents/branch/show-branchs/show-branchs.component';
import { DetailBranchComponent } from './compnents/branch/detail-branch/detail-branch.component';
import { SuccessPopupComponent } from './compnents/success-popup/success-popup.component';
import { FailedPopupComponent } from './compnents/failed-popup/failed-popup.component';
import { EditBranchComponent } from './compnents/branch/edit-branch/edit-branch.component';
import { LoaderComponent } from './compnents/loader/loader.component';
import { ManageTracksComponent } from './compnents/tracks/manage-tracks/manage-tracks.component';
import { NotFoundComponent } from './compnents/pages/not-found/not-found.component';
import { NotAuthorizedComponent } from './compnents/pages/not-authorized/not-authorized.component';
import { ManageIntakesComponent } from './compnents/intakes/manage-intakes/manage-intakes.component';
import { ShowAllIntakesComponent } from './compnents/intakes/show-all-intakes/show-all-intakes.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarHeaderComponent,
    HomeComponent,
    LoginComponent,
    ViewInstancesComponent,
    CreateInstanceComponent,
    ViewInstanceDetailsComponent,
    LogoutComponent,
    CreateTemplateComponent,
    LogoutComponent,
    ViewInstanceDetailsComponent,
    CreateTemplateComponent,
    CreatenewstaffComponent,
    UserdetailsComponent,
    CreateTemplateComponent,
    CreateBranchComponent,
    ShowBranchsComponent,
    DetailBranchComponent,
    SuccessPopupComponent,
    FailedPopupComponent,
    DetailBranchComponent,
    EditBranchComponent,
    LoaderComponent,
    ManageTracksComponent,
    DetailBranchComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    LoaderComponent,
    ManageIntakesComponent,
    ShowAllIntakesComponent
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
