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
    JigsawTheme,
    JigsawTreeExtModule,
    JigsawButtonBarModule,
    SupportedTheme,
    JigsawCheckBoxModule,
    JigsawNumericInputModule,
    JigsawSelectModule,
    MajorStyle
} from "jigsaw/public_api";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptor';
import {routerConfig} from "./router-config";
import {PCDemoListComponent} from "./pc-demo-list.component";
import {MobileDemoListComponent} from "./mobile-demo-list.component";
import {SwitchDemoComponent} from "./switch-demo.component";
import {DemoCodeComponent} from "./demo-code.component";
import {ExampleDemoModule} from './demo/pc/example/demo.module';
import {AlertDemoModule} from "./demo/pc/alert/demo.module";
import {HeaderDemoModule} from "./demo/pc/header/demo.module";
import {BreadcrumbDemoModule} from "./demo/pc/breadcrumb/demo.module";
import {ButtonDemoModule} from "./demo/pc/button/demo.module";
import {CheckBoxDemoModule} from "./demo/pc/checkbox/demo.module";
import {RadioGroupDemoModule} from "./demo/pc/radio/demo.module";


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
            {
                path: 'demo-code', component: DemoCodeComponent, children: [
                    {path: '**', component: DemoCodeComponent}
                ]
            },
            { path: '**', redirectTo: '/' }
        ], { useHash: true }),
        JigsawRootModule, CheckBoxDemoModule, JigsawFloatModule, JigsawListLiteModule, JigsawTreeExtModule, JigsawButtonBarModule,
        JigsawCheckBoxModule, JigsawNumericInputModule, JigsawSelectModule, ExampleDemoModule, AlertDemoModule, HeaderDemoModule,
        TranslateModule.forRoot(), BreadcrumbDemoModule, ButtonDemoModule, RadioGroupDemoModule
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
