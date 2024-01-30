import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawButtonModule, JigsawDateTimePickerModule, JigsawHeaderModule, JigsawRadioModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DatePickerTimeOptionsDemoComponent} from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DatePickerTimeOptionsDemoComponent],
    exports: [ DatePickerTimeOptionsDemoComponent ],
    imports: [JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule, JigsawHeaderModule,
        JigsawButtonBarModule, JigsawRadioModule, CommonModule, JigsawSwitchModule]
})
export class DateTimePickerOptionsDemoModule{

}
