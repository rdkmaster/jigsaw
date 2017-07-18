import {NgModule} from "@angular/core";
import {AlertInDomDemoComponent} from "./app.component";
import {JigsawAlertModule} from "../../../../jigsaw/component/alert/alert";
import {Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, 'app/i18n/', '.json');
}

@NgModule({
    declarations: [AlertInDomDemoComponent],
    imports: [
        JigsawAlertModule,
        TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [Http]
                }, isolate: true
            }
        ),
    ],
    exports: [AlertInDomDemoComponent]
})
export class AlertInDomDemoModule {

}
