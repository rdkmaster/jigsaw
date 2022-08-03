import {NgModule} from "@angular/core";
import {TimeSectionDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawTimeSectionModule} from "../../../../jigsaw/pc-components/date-and-time";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawCheckBoxModule} from "../../../../jigsaw/pc-components/checkbox";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TimeSectionBasicDemoComponent} from "./basic/demo.component";
import {TimeSectionPickerDemoComponent} from "./time-section-picker/demo.component";
import {WeekSectionPickerDemoComponent} from "./week-section-picker/demo.component";
import {DaySectionPickerDemoComponent} from "./day-section-picker/demo.component";
import {TimeSectionHorizontalDemoComponent} from "./horizontal/demo.component";

@NgModule({
    declarations: [TimeSectionDemoComponent, TimeSectionBasicDemoComponent, TimeSectionPickerDemoComponent, WeekSectionPickerDemoComponent,
    DaySectionPickerDemoComponent, TimeSectionHorizontalDemoComponent],
    imports: [
        JigsawMarkdownModule,  JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawButtonBarModule, JigsawCheckBoxModule,
        JigsawCheckBoxModule, JigsawHeaderModule, DemoTemplateModule
    ]
})
export class  TimeSectionDemoModule {

}


