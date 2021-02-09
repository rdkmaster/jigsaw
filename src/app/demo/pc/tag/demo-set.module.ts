import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoModule} from "./basic/demo.module";
import {TagBasicDemoComponent} from "./basic/demo.component";
import { TagPresetColorDemoComponent } from './preset-color/demo.component';
import { TagPresetColorDemoModule } from './preset-color/demo.module';
import { TagSelectableDemoComponent } from './selectable/demo.component';
import { TagSelectableDemoModule } from './selectable/demo.module';
import {TagAddRemoveDemoComponent} from "./add-remove/demo.component";
import {TagAddRemoveDemoModule} from "./add-remove/demo.module";
import {TagWithIconDemoComponent} from "./with-icon/demo.component";
import {TagWithIconDemoModule} from "./with-icon/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TagBasicDemoComponent
    },
    {
        path: 'preset-color', component: TagPresetColorDemoComponent
    },
    {
        path: 'selectable', component: TagSelectableDemoComponent
    },
    {
        path: 'add-remove', component: TagAddRemoveDemoComponent
    },
    {
        path: 'disabled', component: TagSelectableDemoComponent
    },
    {
        path: 'with-icon', component: TagWithIconDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), TagBasicDemoModule, TagPresetColorDemoModule,
        TagSelectableDemoModule, TagAddRemoveDemoModule, TagWithIconDemoModule
    ]
})

export class TagDemoModule {
}
