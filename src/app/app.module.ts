import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarHeaderComponent } from './components/sidebar-header/sidebar-header.component';
import {AppRoutingModule} from "./app-routing-module";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule, HttpClient} from "@angular/common/http";

import {NgxPaginationModule} from 'ngx-pagination';
import { ViewInstancesComponent } from './components/instance/view-instances/view-instances.component';
import { CreateInstanceComponent } from './components/instance/create-instance/create-instance.component';
import { ViewInstanceDetailsComponent } from './components/instance/view-instance-details/view-instance-details.component';
import {CreateTemplateComponent} from "./components/template/create-template/create-template.component";
import { CreatenewstaffComponent } from './components/user/staff/createnewstuff/createnewstaff.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CreateBranchComponent } from './components/branch/create-branch/create-branch.component';
import { ShowBranchsComponent } from './components/branch/show-branchs/show-branchs.component';
import { DetailBranchComponent } from './components/branch/detail-branch/detail-branch.component';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';
import { FailedPopupComponent } from './components/failed-popup/failed-popup.component';
import { EditBranchComponent } from './components/branch/edit-branch/edit-branch.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ManageTracksComponent } from './components/tracks/manage-tracks/manage-tracks.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { NotAuthorizedComponent } from './components/pages/not-authorized/not-authorized.component';
import { ManageIntakesComponent } from './components/intakes/manage-intakes/manage-intakes.component';
import { ShowAllIntakesComponent } from './components/intakes/show-all-intakes/show-all-intakes.component';
import { ViewTracksComponent } from './components/tracks/view-tracks/view-tracks.component';
import { UpdateTrackComponent } from './components/tracks/update-track/update-track.component';

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
    ShowAllIntakesComponent,
    ManageTracksComponent,
    ViewTracksComponent,
    UpdateTrackComponent,
    CreateTrainingProgramComponent,
    ViewTrainingProgramsComponent,
    UpdateTrainingProgramsComponent
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
