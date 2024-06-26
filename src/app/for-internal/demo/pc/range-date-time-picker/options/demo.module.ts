import { NgModule } from "@angular/core";
import { JigsawButtonBarModule, JigsawButtonModule, JigsawDateTimeSelectModule, JigsawHeaderModule, JigsawIconModule, JigsawNumericInputModule, JigsawRangeDateTimePickerModule, JigsawRangeDateTimeSelectModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { RangeDatePickerTimeOptionsDemoComponent } from "./demo.component";

@NgModule({
    declarations: [RangeDatePickerTimeOptionsDemoComponent],
    exports: [RangeDatePickerTimeOptionsDemoComponent],
    imports: [JigsawRangeDateTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule, JigsawHeaderModule,
        JigsawButtonBarModule, JigsawDateTimeSelectModule, JigsawNumericInputModule, JigsawIconModule, JigsawSwitchModule]
})
export class RangeDateTimePickerOptionsDemoModule {

}
