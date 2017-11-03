import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateService} from '@ngx-translate/core';

import {JigsawRootModule} from "jigsaw/component/root/root";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptors';
import {DemoListComponent} from "./demo-list.component";
import {routes} from "./demo-urls";

(<any>routes.config).push(
    {
        path: '', component: DemoListComponent
    },
    {
        path: '**', //fallback router must in the last
        component: DemoListComponent
    }
);

@NgModule({
    declarations: [
        AppComponent, DemoListComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot(routes.config),
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
