import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JigsawRootModule } from "@rdkmaster/jigsaw";
import { AjaxInterceptor } from "./app/ajax-interceptor";
import { AppComponent } from "./app/app.component";
import { $DemoModuleClassName } from "app/demo/demo.module";

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