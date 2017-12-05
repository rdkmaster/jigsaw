import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JigsawRootModule } from "@rdkmaster/jigsaw";
import { AjaxInterceptor } from "ajax-interceptor.ts";
import { $DemoModuleClassName } from "app/app.module";

@Component({
    selector: 'demo-root',
    template: '<jigsaw-root><jigsaw-live-demo></jigsaw-live-demo></jigsaw-root>'
})
export class AppComponent {
}

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        JigsawRootModule, $DemoModuleClassName
    ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);