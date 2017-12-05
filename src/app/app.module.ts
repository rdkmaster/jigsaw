import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {JigsawRootModule} from "jigsaw/component/root/root";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptors';
import {DemoListComponent} from "./demo-list.component";
import {routerConfig} from "./router-config";

{
    (<any[]>routerConfig).push(
        {path: '', component: DemoListComponent},
        {path: '**', redirectTo: ''}
    );
}

@NgModule({
    declarations: [
        AppComponent, DemoListComponent
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
}
