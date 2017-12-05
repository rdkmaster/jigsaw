import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {I18nFullDemoModule} from "./full/app.module";

import {I18nFullDemoComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'full', component: I18nFullDemoComponent
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
