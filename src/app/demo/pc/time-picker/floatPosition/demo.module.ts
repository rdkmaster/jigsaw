import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerFloatPositionDemoComponent} from "./demo.component";
import {JigsawTimePickerModule} from "jigsaw/pc-components/date-and-time/time-picker";

@NgModule({
    declarations: [TimePickerFloatPositionDemoComponent],
    exports: [ TimePickerFloatPositionDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerFloatPositionDemoModule{

}
