import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawFloatModule,
    JigsawListLiteModule,
    JigsawRootModule,
    JigsawTreeExtModule,
    JigsawButtonBarModule,
    SupportedTheme,
    JigsawCheckBoxModule,
    JigsawNumericInputModule,
    JigsawSelectModule,
    MajorStyle, JigsawThemeService
} from "jigsaw/public_api";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from '../libs/app.interceptor';
import {routerConfig} from "./router-config";
import {PCDemoListComponent} from "./pc-demo-list.component";
import {MobileDemoListComponent} from "./mobile-demo-list.component";
import {SwitchDemoComponent} from "./switch-demo.component";
import {DemoCodeComponent} from "./demo-code.component";

@NgModule({
    declarations: [
        AppComponent, PCDemoListComponent, MobileDemoListComponent, SwitchDemoComponent, DemoCodeComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot([
            ...routerConfig,
            {path: '', component: SwitchDemoComponent},
            {path: 'pc', component: PCDemoListComponent},
            {path: 'mobile', component: MobileDemoListComponent},
            {path: 'demo-code', component: DemoCodeComponent, children: [
                    {path: '**', component: DemoCodeComponent}
                ]},
            {path: '**', redirectTo: '/'}
        ], {useHash: true}),
        JigsawRootModule, JigsawFloatModule, JigsawListLiteModule, JigsawTreeExtModule, JigsawButtonBarModule,
        JigsawCheckBoxModule, JigsawNumericInputModule, JigsawSelectModule,
        TranslateModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
        TranslateService,
        JigsawThemeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private _themeService: JigsawThemeService) {
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
        this._themeService.changeTheme(themeName, majorStyle);
    }
}
