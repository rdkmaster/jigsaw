import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawButtonBarModule, JigsawRangeDateTimePickerModule, JigsawRadioModule, JigsawRangeDateTimeSelectModule } from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { RangeDateTimeGrWeekComponent } from "./gr-week/demo.component";
import { RangeDataTimePickerAllComponent } from "./demo.component";
import { RangeDateTimeGrMonthComponent } from "./gr-month/demo.component";
import { RangeDateTimeGrItemsComponent } from "./gr-items/demo.component";
import { RangeDateTimeLimitComponent } from "./limit/demo.component";
import { RangeDateTimeSelectComponent } from "./range-date-time-select/demo.component";
import { RangeDateTimeWeekStartComponent } from "./week-start/demo.component";
import { RangeDateTimeBasicDemoComponent } from "./basic/demo.component";

@NgModule({
    declarations: [
        RangeDataTimePickerAllComponent,
        RangeDateTimeGrWeekComponent,
        RangeDateTimeGrMonthComponent,
        RangeDateTimeGrItemsComponent,
        RangeDateTimeLimitComponent,
        RangeDateTimeSelectComponent,
        RangeDateTimeWeekStartComponent,
        RangeDateTimeBasicDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonBarModule,
        JigsawRangeDateTimePickerModule,
        CommonModule,
        JigsawRadioModule,
        JigsawRangeDateTimeSelectModule
    ]
})
export class RangeDateTimeDemoModule {
}
