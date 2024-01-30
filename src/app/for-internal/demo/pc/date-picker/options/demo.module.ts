import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDatePickerModule, JigsawHeaderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DatePickerOptionsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DatePickerOptionsDemoComponent],
    exports: [ DatePickerOptionsDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule, JigsawHeaderModule,
        JigsawSwitchModule]
})
export class DatePickerOptionsDemoModule{

}
