import { NgModule } from "@angular/core";
import { TimePickerDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { TimePickerBasicDemoComponent } from "./basic/demo.component";
import { JigsawButtonModule, JigsawTimePickerModule } from "jigsaw/public_api";
import { TimePickerGrDemoComponent } from "./gr/demo.component";
import { JigsawButtonBarModule } from "jigsaw/public_api";
import { TimePickerLimitDemoComponent } from "./limit/demo.component";
import { TimePickerStepDemoComponent } from "./step/demo.component";

@NgModule({
    declarations: [TimePickerDemoComponent, TimePickerBasicDemoComponent, TimePickerGrDemoComponent, TimePickerLimitDemoComponent,
        TimePickerStepDemoComponent],
    imports: [JigsawMarkdownModule, JigsawTimePickerModule, DemoTemplateModule, JigsawButtonModule, JigsawButtonBarModule]
})
export class TimePickerDemoModule {
}
