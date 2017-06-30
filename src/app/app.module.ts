import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";

import {RdkJigsawModule} from '@rdkmaster/jigsaw';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, 'app/i18n/', '.json');
}

const appRoutes = [
    {
        path: '', redirectTo: 'demo', pathMatch: 'full'
    },
    {
        path: 'demo',
        loadChildren: 'app/demo/demo-list#DemoListModule'
    },
    {
        path: '**',//fallback router must in the last
        loadChildren: 'app/demo/demo-list#DemoListModule'
    }
];

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
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [Http]
                }, isolate: true
            }
        ),
        RdkJigsawModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
