import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawTabBarComponent} from "./basic/demo.component";
import {JigsawTabBarDemoModule} from "./basic/demo.module";
import { TabBarTypeDemoComponent } from './type/demo.component';
import { TabBarTypeDemoModule } from './type/demo.module';
import { TabBarBackgroundDemoComponent } from './background/demo.component';
import { TabBarBackgroundDemoModule } from './background/demo.module';
import { TabBarEditableDemoComponent } from './editable/demo.component';
import { TabBarEditableDemoModule } from './editable/demo.module';
import { TabBarStyleOptionsDemoModule } from './style-options/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: JigsawTabBarComponent
    },
    {
        path: 'type', component: TabBarTypeDemoComponent
    },
    {
        path: 'background', component: TabBarBackgroundDemoComponent
    },
    {
        path: 'editable', component: TabBarEditableDemoComponent
    },
    {
        path: 'style-options', component: TabBarEditableDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), JigsawTabBarDemoModule, TabBarTypeDemoModule, TabBarBackgroundDemoModule, TabBarEditableDemoModule,
        TabBarStyleOptionsDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabBarDemoModule {
}
