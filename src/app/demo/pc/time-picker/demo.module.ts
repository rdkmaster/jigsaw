import {NgModule} from "@angular/core";
import {TimePickerDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawTimePickerModule} from "../../../../jigsaw/pc-components/date-and-time";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TimePickerBasicDemoComponent} from "./basic/demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {TimePickerGrDemoComponent} from "./gr/demo.component";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {TimePickerLimitDemoComponent} from "./limit/demo.component";
import {TimePickerStepDemoComponent} from "./step/demo.component";

@NgModule({
    declarations: [TimePickerDemoComponent, TimePickerBasicDemoComponent, TimePickerGrDemoComponent, TimePickerLimitDemoComponent,
        TimePickerStepDemoComponent],
    imports: [JigsawMarkdownModule, JigsawTimePickerModule, DemoTemplateModule, JigsawButtonModule, JigsawButtonBarModule]
})
export class TimePickerDemoModule {
}
