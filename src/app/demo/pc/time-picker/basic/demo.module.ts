import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerBasicDemoComponent} from "./demo.component";
import {JigsawTimePickerModule} from "jigsaw/pc-components/date-and-time/time-picker";

@NgModule({
    declarations: [TimePickerBasicDemoComponent],
    exports: [ TimePickerBasicDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerBasicDemoModule{

}
