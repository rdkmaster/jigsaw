import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    JigsawBoxModule, JigsawFloatModule, JigsawListLiteModule, JigsawRootModule, JigsawTreeExtModule
} from "jigsaw/public_api";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptor';
import {DemoListComponent} from "./demo-list.component";
import {routerConfig} from "./router-config";
import {DemoCodeComponent} from "./demo-code.component";

@NgModule({
    declarations: [
        AppComponent, DemoListComponent, DemoCodeComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot([
            ...routerConfig,
            {path: '', component: DemoListComponent},
            {path: '**', redirectTo: ''},
            {path: 'demo-code', component: DemoCodeComponent, children: [
                    {path: '**', component: DemoCodeComponent}
                ]},
        ], {useHash: true}),
        JigsawRootModule, JigsawFloatModule, JigsawListLiteModule, JigsawBoxModule, JigsawTreeExtModule
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
        //JigsawTheme.majorStyle = 'dark';
    }
}
