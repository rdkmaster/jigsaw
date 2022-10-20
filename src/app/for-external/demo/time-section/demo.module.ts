import { NgModule } from "@angular/core";
import { TimeSectionDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonBarModule, JigsawTimeSectionModule, JigsawCheckBoxModule, JigsawHeaderModule } from "jigsaw/public_api";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { DocTemplateModule } from '../../doc-template/doc-template';
import { TimeSectionBasicDemoComponent } from "./basic/demo.component";
import { TimeSectionPickerDemoComponent } from "./time-section-picker/demo.component";
import { WeekSectionPickerDemoComponent } from "./week-section-picker/demo.component";
import { DaySectionPickerDemoComponent } from "./day-section-picker/demo.component";
import { TimeSectionHorizontalDemoComponent } from "./horizontal/demo.component";

@NgModule({
    declarations: [
        TimeSectionDemoComponent,
        TimeSectionBasicDemoComponent,
        TimeSectionPickerDemoComponent,
        WeekSectionPickerDemoComponent,
        DaySectionPickerDemoComponent,
        TimeSectionHorizontalDemoComponent
    ],
    imports: [
        JigsawMarkdownModule,
        JigsawTimeSectionModule,
        JigsawButtonBarModule,
        JigsawCheckBoxModule,
        JigsawCheckBoxModule,
        JigsawHeaderModule,
        DemoTemplateModule,
        DocTemplateModule
    ]
})
export class TimeSectionDemoModule {

}


