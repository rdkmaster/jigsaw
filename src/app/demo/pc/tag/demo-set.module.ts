import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoModule} from "./basic/demo.module";

import {TagBasicDemoComponent} from "./basic/demo.component";
import { TagPresetColorDemoComponent } from './preset-color/demo.component';
import { TagPresetColorDemoModule } from './preset-color/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: TagBasicDemoComponent
    },
    {
        path: 'preset-color', component: TagPresetColorDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TagBasicDemoModule,
        TagPresetColorDemoModule
    ]
})

export class TagDemoModule {
}
