import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JigsawRootModule } from "@rdkmaster/jigsaw";
import { AjaxInterceptor } from "./app.interceptors";
import { AppComponent } from "./app.component";
import { $DemoModuleClassName } from "./demo/demo.module";

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
