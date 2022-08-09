import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../markdown/markdown';
import {JigsawDatePickerModule} from "jigsaw/public_api";
import {DatePickerAllComponent} from "./demo.component";
import {DatePickerBasicDemoComponent} from "./basic/demo.component";
import {DatePickerGrWeekComponent} from "./gr-week/demo.component";
import {DatePickerGrMonthComponent} from "./gr-month/demo.component";
import {CommonModule} from "@angular/common";
import {DatePickerGrItemDemoComponent} from "./gr-items/demo.component";
import {DatePickerLimitComponent} from "./limit/demo.component";
import {DatePickerMarkDemoComponent} from "./mark/demo.component";
import {DatePickerWeekStartComponent} from "./week-start/demo.component";

@NgModule({
    declarations: [
        DatePickerAllComponent,
        DatePickerBasicDemoComponent,
        DatePickerGrWeekComponent,
        DatePickerGrMonthComponent,
        DatePickerGrItemDemoComponent,
        DatePickerLimitComponent,
        DatePickerMarkDemoComponent,
        DatePickerWeekStartComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawDatePickerModule,
        CommonModule

    ]
})
export class DatePickerDemoModule {
}
