import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateService} from '@ngx-translate/core';

import {JigsawRootModule} from "jigsaw/component/root/root";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptors';
import {DemoListComponent, DemoListManager} from "./demo-list.component";


@NgModule({
    declarations: [
        AppComponent, DemoListComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot(DemoListManager.routerConfig),
        JigsawRootModule
    ],
    providers: [
        TranslateService,
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
