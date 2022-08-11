import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {
    JigsawFloatModule,
    JigsawListLiteModule,
    JigsawRootModule,
    JigsawTheme,
    JigsawTreeExtModule,
    JigsawButtonBarModule,
    SupportedTheme,
    JigsawCheckBoxModule,
    JigsawNumericInputModule,
    JigsawSelectModule,
    MajorStyle
} from "jigsaw/public_api";
import { AppComponent } from './app.component';
import { AjaxInterceptor } from '../libs/app.interceptor';
import { routerConfig } from "./router-config";
import { PCDemoListComponent } from "./pc-demo-list.component";
import { SwitchDemoComponent } from "./switch-demo.component";
import { DemoCodeComponent } from "./demo-code.component";
import { AlertDemoModule } from "./demo/alert/demo.module";
import { AdjustFontColorDemoModule } from "./demo/adjust-font-color/demo.module";



@NgModule({
    declarations: [
        AppComponent, PCDemoListComponent, SwitchDemoComponent, DemoCodeComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule, AdjustFontColorDemoModule,
        RouterModule.forRoot([
            ...routerConfig,
            { path: '', component: SwitchDemoComponent },
            { path: 'pc', component: PCDemoListComponent },
            {
                path: 'demo-code', component: DemoCodeComponent, children: [
                    { path: '**', component: DemoCodeComponent }
                ]
            },
            { path: '**', redirectTo: '/' }
        ], { useHash: true }),
        JigsawRootModule, JigsawFloatModule, JigsawListLiteModule, JigsawTreeExtModule, JigsawButtonBarModule,
        JigsawCheckBoxModule, JigsawNumericInputModule, JigsawSelectModule, AlertDemoModule,
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
        let themeName: SupportedTheme, majorStyle: MajorStyle;
        const themeString = localStorage.getItem("jigsawDemoTheme");
        if (themeString === null) {
            themeName = 'paletx-pro';
            majorStyle = 'light';
        } else {
            const themeData = JSON.parse(themeString);
            themeName = themeData.name;
            majorStyle = themeData.majorStyle;
        }
        JigsawTheme.changeTheme(themeName, majorStyle);
    }
}

