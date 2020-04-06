import { BrowserModule } from '@angular/platform-browser'; // super-set over CommonModule, fwiw
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module'; // << Need to bring into top-most App Module, too!

// import { FlexLayoutModule } from '@angular/flex-layout'; // << Now in SharedModule
// import { MyMaterialModule } from './my-material.module'; // << Now in SharedModule

// import { ReactiveFormsModule } from '@angular/forms'; // << Now in SharedModule
// earlier: << Now in FabricatorModule; also NYTimesModule

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.reducer';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';


import { FabricatorModule } from './fabricator/fabricator.module';
import { NYTimesModule } from './nytimes/nytimes.module';
import { RxjsPlaygroundModule } from './rxjs-playground/rxjs-playground.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {WelcomeComponent} from './welcome/welcome.component';
// import { RxjsPlaygroundComponent } from './rxjs-playground/rxjs-playground.component'; // nope

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
    // RxjsPlaygroundComponent, // nope
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    // https://blog.angular-university.io/angular-ngrx-devtools/
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 10
    }) : [], // 03 hmm ?

    SharedModule,
    // FlexLayoutModule, // << SharedModule
    // ReactiveFormsModule, // << SharedModule
    CoreModule,
    // MyMaterialModule, // << SharedModule
    FabricatorModule,
    NYTimesModule,
    RxjsPlaygroundModule,
  ],
  providers: [], // << None. From CoreModule (for (singleton) Services)
  bootstrap: [AppComponent]
})
export class AppModule { }
