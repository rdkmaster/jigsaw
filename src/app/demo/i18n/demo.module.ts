import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {I18nFullDemoComponent} from "./i18n-full/app.component";
import {I18nFullDemoModule} from "./i18n-full/app.module";

const routes = [
    {
        path: 'i18n-full', component: I18nFullDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: I18nFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), I18nFullDemoModule
    ]
})
export class I18nDemoModule {
}
