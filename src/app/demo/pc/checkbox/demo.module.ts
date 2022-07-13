import { NgModule } from "@angular/core";
import {CheckboxAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";

import {CommonModule} from "@angular/common";
import {CheckboxBasicComponent} from "./basic/demo.component";
import {JigsawCheckBoxModule} from "../../../../jigsaw/pc-components/checkbox";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {CheckboxIndeterminateComponent} from "./indeterminate/demo.component";
import {CheckboxMinimalistComponent} from "./minimalist/demo.component";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {CheckboxDisabledComponent} from "./disabled/demo.component";


@NgModule({
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawInputModule, CommonModule, JigsawCheckBoxModule, JigsawSwitchModule, JigsawButtonBarModule],
    declarations: [
        CheckboxAllComponent,
        CheckboxBasicComponent,
        CheckboxIndeterminateComponent,
        CheckboxMinimalistComponent,
        CheckboxDisabledComponent
    ],
    exports: [CheckboxAllComponent]
})
export class CheckboxAllModule {}
