import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {I18nFullDemoModule} from "./i18n-full/app.module";

import {I18nFullDemoComponent} from "./i18n-full/app.component";

export const routerConfig = [
    {
        path: 'i18n-full', component: I18nFullDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        I18nFullDemoModule
    ]
})
export class I18nDemoModule {
}
