import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {JigsawRootModule} from "jigsaw/pc-components/root/root";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptor';
import {routerConfig} from "./router-config";
import {PCDemoListComponent} from "./pc-demo-list.component";
import {MobileDemoListComponent} from "./mobile-demo-list.component";

{
    (<any[]>routerConfig).push(
        {path: '', component: PCDemoListComponent},
         {path: 'mobile', component: MobileDemoListComponent},
        {path: '**', redirectTo: ''}
    );
}

@NgModule({
    declarations: [
        AppComponent, PCDemoListComponent, MobileDemoListComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot(routerConfig),
        JigsawRootModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
