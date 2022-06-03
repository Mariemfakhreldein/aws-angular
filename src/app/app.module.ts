import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AuthModule} from "./auth/auth.module";

import { AppComponent } from './app.component';
import { SidebarHeaderComponent } from './compnents/sidebar-header/sidebar-header.component';
import {AppRoutingModule} from "./app-routing-module";
import {HomeComponent} from "./compnents/home/home.component";
import {LoginComponent} from "./compnents/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarHeaderComponent,
    HomeComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule
  ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
