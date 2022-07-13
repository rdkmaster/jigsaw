import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {I18nFullDemoModule} from "./full/demo.module";

import {I18nFullDemoComponent} from "./full/demo.component";
import {I18nDemoAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig = [
    {
        path: 'all', component: I18nDemoAllComponent
    },
    {
        path: 'full', component: I18nFullDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        I18nFullDemoModule,
        JigsawMarkdownModule
    ],
    declarations: [
        I18nDemoAllComponent
    ]
})
export class I18nDemoModule {
}
