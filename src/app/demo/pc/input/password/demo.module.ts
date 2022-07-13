import { NgModule } from "@angular/core";
import {JigsawMarkdownModule} from "../../../../markdown/markdown";
import {InputPasswordComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawInputModule} from "../../../../../jigsaw/pc-components/input/input";

@NgModule({
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawInputModule],
    declarations: [
        InputPasswordComponent
    ],
    exports: [InputPasswordComponent]
})
export class InputPasswordModule {}
