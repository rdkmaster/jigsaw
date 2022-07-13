import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabBarAllModule} from "./demo.module";
import {TabBarAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: 'all', component: TabBarAllComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TabBarAllModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabBarDemoModule {
}
