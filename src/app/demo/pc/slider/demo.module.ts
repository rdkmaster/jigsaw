import { NgModule } from "@angular/core";
import {SliderAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {CommonModule} from "@angular/common";
import {SliderBasicComponent} from "./basic/demo.component";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {JigsawSliderModule} from "../../../../jigsaw/pc-components/slider";
import {SliderSetMinMaxComponent} from "./min-max/demo.component";
import {SliderChangeStepComponent} from "./change-step/demo.component"
import {SliderDoubleContactComponent} from "./double-contact/demo.component";
import {SliderWithMarkComponent} from "./with-mark/demo.component";
import {SliderVerticalComponent} from "./vertical/demo.component";
import {SliderUpdateValueComponent} from "./update/demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {SliderMultiValueComponent} from "./handing-multi-value/demo.component";

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
        SliderAllComponent,
        SliderBasicComponent,
        SliderSetMinMaxComponent,
        SliderChangeStepComponent,
        SliderDoubleContactComponent,
        SliderWithMarkComponent,
        SliderVerticalComponent,
        SliderUpdateValueComponent,
        SliderMultiValueComponent
    ],
    exports: [SliderAllComponent]
})
export class SliderAllModule {}
