import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from "rxjs/Observable";
import {JigsawButtonModule} from "jigsaw/component/button/button";

import {AppComponent} from './app.component';

const appRoutes = [
    {
        path: '',
        loadChildren: 'app/demo/demo-list#DemoListModule'
    },
    {
        path: '**',//fallback router must in the last
        loadChildren: 'app/demo/demo-list#DemoListModule'
    }
];

export class JigsawI18nLoader extends TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        const zh = {
            'jigsaw-title': '<a href="https://github.com/rdkmaster/jigsaw">Jigsaw</a> 临时演示环境'
        };
        const en = {
            'jigsaw-title': '<a href="https://github.com/rdkmaster/jigsaw">Jigsaw</a>\'s temporary site'
        };
        return Observable.of(lang == 'en' ? en : zh);
    }
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader, useClass: JigsawI18nLoader
                }, isolate: true
            }
        ),
        JigsawButtonModule
    ],
    providers: [TranslateService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(translateService: TranslateService) {
        const lang: string = translateService.getBrowserLang();
        translateService.setDefaultLang(lang);
        translateService.use(lang);
    }
}
