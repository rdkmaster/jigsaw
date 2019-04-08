import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {JigsawRootModule} from "jigsaw/component/root/root";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptor';
import {DemoListComponent} from "./demo-list.component";
import {routerConfig} from "./router-config";
import {JigsawGraph} from "../jigsaw/component/graph";
import {PopupService} from "../jigsaw/service/popup.service";

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
    constructor() {
        JigsawGraph.globalTheme = 'dark';
        PopupService.theme = 'dark';
    }
}
