import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerLimitDemoComponent} from "./demo.component";
import {JigsawTimePickerModule} from "jigsaw/pc-components/date-picker/time-picker";

@NgModule({
    declarations: [TimePickerLimitDemoComponent],
    exports: [ TimePickerLimitDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerLimitDemoModule{

}
