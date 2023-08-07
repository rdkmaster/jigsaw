import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawTimePickerModule, JigsawHeaderModule, JigsawSwitchModule, JigsawButtonBarModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimePickerOptionsDemoComponent} from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [TimePickerOptionsDemoComponent],
    exports: [TimePickerOptionsDemoComponent],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule,
        JigsawHeaderModule, JigsawButtonBarModule, JigsawRadioModule, CommonModule]
})
export class TimePickerOptionsDemoModule{

}
