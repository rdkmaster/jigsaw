import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabBarAllComponent} from "./all/demo.component";
import {TabBarBasicDemoModule} from "./basic/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {TabBarTypeDemoModule} from "./type/demo.module";
import {TabBarEditableDemoModule} from "./editable/demo.module";
import {TabBarBackgroundDemoModule} from "./background/demo.module";

export const routerConfig = [
    {
        path: 'all', component: TabBarAllComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JigsawMarkdownModule,
        TabBarBasicDemoModule,
        TabBarTypeDemoModule,
        TabBarEditableDemoModule,
        TabBarBackgroundDemoModule
    ],
    declarations: [TabBarAllComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabBarDemoModule {
}
