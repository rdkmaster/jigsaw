import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {JigsawFloatModule, JigsawListLiteModule, JigsawRootModule} from "jigsaw/public_api";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptor';
import {routerConfig} from "./router-config";
import {PCDemoListComponent} from "./pc-demo-list.component";
import {MobileDemoListComponent} from "./mobile-demo-list.component";
import {SwitchDemoComponent} from "./switch-demo.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AppComponent, PCDemoListComponent, MobileDemoListComponent, SwitchDemoComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot([
            ...routerConfig,
            {path: '', component: SwitchDemoComponent},
            {path: 'pc', component: PCDemoListComponent},
            {path: 'mobile', component: MobileDemoListComponent},
            {path: '**', redirectTo: '/'}
        ], {useHash: true}),
        JigsawRootModule, JigsawFloatModule, JigsawListLiteModule,
        TranslateModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
        TranslateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        //JigsawTheme.majorStyle = 'purple';
    }
}
