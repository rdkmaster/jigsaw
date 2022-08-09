import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {DateTimePickerAllComponent} from "./demo.component";
import {DateTimePickerBasicDemoComponent} from "./basic/demo.component";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawDateTimePickerModule,
    JigsawDateTimeSelectModule,
    JigsawRangeDateTimePickerModule,
    JigsawRangeDateTimeSelectModule,
    JigsawSwitchModule
} from "jigsaw/public_api";
import {DateTimePickerConfirmButtonDemoComponent} from "./confirm-button/demo.component";
import {DateTimePickerGrMinuteComponent} from "./gr-minute/demo.component";
import {DateTimePickerGrSecondComponent} from "./gr-second/demo.component";
import {DateTimePickerGrItemDemoComponent} from "./gr-items/demo.component";
import {DateTimePickerLimitComponent} from "./limit/demo.component";
import {DateTimeSelectDemoComponent} from "./date-time-select/demo.component";

@NgModule({
    declarations: [
        DateTimePickerAllComponent,
        DateTimePickerBasicDemoComponent,
        DateTimePickerConfirmButtonDemoComponent,
        DateTimePickerGrMinuteComponent,
        DateTimePickerGrSecondComponent,
        DateTimePickerGrItemDemoComponent,
        DateTimePickerLimitComponent,
        DateTimeSelectDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        CommonModule,
        JigsawButtonBarModule,
        JigsawDateTimePickerModule,
        JigsawDateTimeSelectModule,
        JigsawRangeDateTimePickerModule,
        JigsawRangeDateTimeSelectModule,
        JigsawSwitchModule
    ]
})
export class DateTimePickerDemoModule {
}
