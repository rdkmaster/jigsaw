import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateService} from '@ngx-translate/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";

import {AppComponent} from './app.component';
import {JigsawRootModule} from "../jigsaw/component/root/root";
import {AjaxInterceptor} from 'app/app.interceptors';

const appRoutes = [
    {
        path: '',
        loadChildren: 'app/e2e-testee/demo-list#DemoListModule'
    },
    {
        path: '**',//fallback router must in the last
        loadChildren: 'app/e2e-testee/demo-list#DemoListModule'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),
        JigsawRootModule, JigsawButtonModule
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
