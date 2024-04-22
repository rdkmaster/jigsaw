import { NgModule } from "@angular/core";
import {
    JigsawButtonBarModule,
    JigsawHeaderModule, JigsawNumericInputModule,
    JigsawRangeDateTimePickerModule,
    JigsawRangeDateTimeSelectModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import {RangeDatePickerLimitSpanDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDatePickerLimitSpanDemoComponent],
    exports: [RangeDatePickerLimitSpanDemoComponent],
    imports: [JigsawRangeDateTimePickerModule, JigsawDemoDescriptionModule, JigsawRangeDateTimeSelectModule, JigsawHeaderModule, JigsawButtonBarModule,
        JigsawNumericInputModule]
})
export class RangeDatePickerLimitSpanDemoModule {

}
