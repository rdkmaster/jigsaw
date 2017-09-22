import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from "rxjs/Observable";
import {JigsawButtonModule} from "jigsaw/component/button/button";

import {AppComponent} from './app.component';
import {JigsawRootModule} from "../jigsaw/component/root/root";
import {HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";

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



@Injectable()
export class TestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('ddddddddddddd');
        // return next.handle(req);
        // return Observable.of(new HttpResponse<any>({body: {a: 1, b: 2}}));
        return next.handle(new HttpRequest('get', '/rdk/service/app/example/server/version', null))
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
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),
        BrowserAnimationsModule,
        TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader, useClass: JigsawI18nLoader
                }, isolate: true
            }
        ),
        JigsawRootModule, JigsawButtonModule
    ],
    providers: [TranslateService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TestInterceptor,
        multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(translateService: TranslateService) {
        const lang: string = translateService.getBrowserLang();
        translateService.setDefaultLang(lang);
        translateService.use(lang);
    }
}
