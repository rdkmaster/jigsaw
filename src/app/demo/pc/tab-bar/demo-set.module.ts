import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawTabBarComponent} from "./basic/demo.component";
import {JigsawTabBarDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: JigsawTabBarComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), JigsawTabBarDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabBarDemoModule {
}
