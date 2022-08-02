import {NgModule} from "@angular/core";
import {TagDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawTagModule} from "../../../../jigsaw/pc-components/tag/tag";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TagBasicComponent} from "./basic/demo.component";
import {TagPresetColorComponent} from "./preset-color/demo.component";
import {TagCustomColorComponent} from "./custom-color/demo.component";
import {TagSelectableComponent} from "./selectable/demo.component";
import {CommonModule} from "@angular/common";
import {TagWithIconComponent} from "./with-icon/demo.component";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {TagAddRemoveComponent} from "./add-remove/demo.component";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";

@NgModule({
    declarations: [TagDemoComponent, TagBasicComponent,  TagPresetColorComponent, TagCustomColorComponent, TagSelectableComponent,
        TagWithIconComponent, TagAddRemoveComponent],
    imports: [JigsawMarkdownModule, JigsawTagModule, JigsawButtonModule, DemoTemplateModule, CommonModule, JigsawHeaderModule,
        JigsawInputModule]
})
export class TagDemoModule {
}
