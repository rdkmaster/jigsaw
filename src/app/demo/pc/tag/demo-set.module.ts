import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoModule} from "./basic/demo.module";

import {TagBasicDemoComponent} from "./basic/demo.component";
import { TagPresetColorDemoComponent } from './preset-color/demo.component';
import { TagPresetColorDemoModule } from './preset-color/demo.module';
import { TagAddDemoComponent } from './add-tag/demo.component';
import { TagAddDemoModule } from './add-tag/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: TagBasicDemoComponent
    },
    {
        path: 'preset-color', component: TagPresetColorDemoComponent
    },
    {
        path: 'add-tag', component: TagAddDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TagBasicDemoModule,
        TagPresetColorDemoModule,
        TagAddDemoModule
    ]
})

export class TagDemoModule {
}
