import { NgModule } from "@angular/core";
import {TagAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawTagModule} from "../../../../jigsaw/pc-components/tag/tag";
import {TagBasicComponent} from "./basic/demo.component";
import {TagPresetColorComponent} from "./preset-color/demo.component";
import {TagSelectableComponent} from "./selectable/demo.component";
import {TagAddRemoveComponent} from "./add-remove/demo.component";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {TagWithIconComponent} from "./with-icon/demo.component";

@NgModule({
    imports: [
        JigsawMarkdownModule,
        DemoTemplateModule,
        CommonModule,
        JigsawButtonModule,
        JigsawTagModule,
        JigsawInputModule
    ],
    declarations: [
        TagAllComponent,
        TagBasicComponent,
        TagPresetColorComponent,
        TagSelectableComponent,
        TagAddRemoveComponent,
        TagWithIconComponent
    ],
    exports: [TagAllComponent]
})
export class TagAllModule {}
