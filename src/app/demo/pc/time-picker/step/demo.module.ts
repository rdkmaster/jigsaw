import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerStepDemoComponent} from "./demo.component";
import {JigsawTimePickerModule} from "jigsaw/pc-components/date-and-time/time-picker";

@NgModule({
    declarations: [TimePickerStepDemoComponent],
    exports: [ TimePickerStepDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerStepDemoModule{

}
