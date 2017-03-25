import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";

const appRoutes=[
    {
        path:'', redirectTo:'demo', pathMatch:'full'
    },
    {
        path:'demo',
        loadChildren:'../rdk/doc/demo/demo-list#DemoListModule'
    },
    {
        path:'**',//fallback router must in the last
        loadChildren:'../rdk/doc/demo/demo-list#DemoListModule'
    }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
