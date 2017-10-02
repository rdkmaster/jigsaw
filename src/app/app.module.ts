import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateService} from '@ngx-translate/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";

import {AppComponent} from './app.component';
import {JigsawRootModule} from "../jigsaw/component/root/root";

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
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),
        BrowserAnimationsModule,
        JigsawRootModule, JigsawButtonModule
    ],
    providers: [TranslateService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
