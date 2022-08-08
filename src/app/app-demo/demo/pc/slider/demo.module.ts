import { NgModule } from "@angular/core";
import { JigsawMarkdownModule } from "../../../markdown/markdown";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawSwitchModule, JigsawSliderModule } from "jigsaw/public_api";
import { SliderStepDemoComponent } from "./step/demo.component";
import { SliderChangeStepDemoComponent } from "./change-step/demo.component";
import { SliderBasicDemoComponent } from "./basic/demo.component";
import { SliderSetMinMaxDemoComponent } from "./min-max/demo.component";
import { SliderMultiValueDemoComponent } from "./multi-value/demo.component";
import { SliderMarkDemoComponent } from "./mark/demo.component";
import { SliderDemoComponent } from "./demo.component";
import { SliderVerticalDemoComponent } from "./vertical/demo.component";


@NgModule({
    imports: [
        JigsawMarkdownModule,
        DemoTemplateModule,
        CommonModule,
        JigsawSwitchModule,
        JigsawSliderModule,
        JigsawButtonModule
    ],
    declarations: [
        SliderDemoComponent,
        SliderStepDemoComponent,
        SliderChangeStepDemoComponent,
        SliderBasicDemoComponent,
        SliderSetMinMaxDemoComponent,
        SliderMultiValueDemoComponent,
        SliderMarkDemoComponent,
        SliderVerticalDemoComponent

    ],
})
export class SliderAllDemoModule {
}
