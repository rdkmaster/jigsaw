import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawTabBarComponent} from "./basic/demo.component";
import {JigsawTabBarDemoModule} from "./basic/demo.module";
import { TabBarTypeDemoComponent } from './type/demo.component';
import { TabBarTypeDemoModule } from './type/demo.module';
import { TabBarBackgroundDemoComponent } from './background/demo.component';
import { TabBarBackgroundDemoModule } from './background/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: JigsawTabBarComponent
    },
    {
        path: 'type', component: TabBarTypeDemoComponent
    },
    {
        path: 'background', component: TabBarBackgroundDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), JigsawTabBarDemoModule, TabBarTypeDemoModule, TabBarBackgroundDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabBarDemoModule {
}
