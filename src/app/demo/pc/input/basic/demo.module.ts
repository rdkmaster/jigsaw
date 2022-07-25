import { NgModule } from "@angular/core";
import {JigsawMarkdownModule} from "../../../../markdown/markdown";
import {InputBasicComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawInputModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawInputModule],
    declarations: [
        InputBasicComponent
    ],
    exports: [InputBasicComponent]
})
export class InputBasicModule {}
