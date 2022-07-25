import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagAllComponent} from "./all/demo.component";
import {TagBasicDemoModule} from "./basic/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {TagPresetColorDemoModule} from "./preset-color/demo.module";
import {TagSelectableDemoModule} from "./selectable/demo.module";
import {TagAddRemoveDemoModule} from "./add-remove/demo.module";
import {TagWithIconDemoModule} from "./with-icon/demo.module";

export const routerConfig = [
    {
        path: 'all', component: TagAllComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JigsawMarkdownModule,
        TagBasicDemoModule,
        TagPresetColorDemoModule,
        TagSelectableDemoModule,
        TagAddRemoveDemoModule,
        TagWithIconDemoModule
    ],
    declarations: [TagAllComponent]
})

export class TagDemoModule {
}
