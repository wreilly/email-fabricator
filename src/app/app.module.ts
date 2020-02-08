import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { ReactiveFormsModule } from '@angular/forms'; // << Now in FabricatorModule

import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './my-material.module';
import { FabricatorModule } from './fabricator/fabricator.module';
import { NYTimesModule } from './nytimes/nytimes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {WelcomeComponent} from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // ReactiveFormsModule,
    MyMaterialModule,
    FabricatorModule,
    NYTimesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
