import { NgModule } from "@angular/core";
import {SwitchAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {CommonModule} from "@angular/common";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {SwitchBasicComponent} from "./basic/demo.component";

@NgModule({
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawInputModule, CommonModule, JigsawSwitchModule],
    declarations: [
        SwitchAllComponent,
        SwitchBasicComponent
    ],
    exports: [SwitchAllComponent]
})
export class SwitchAllModule {}
