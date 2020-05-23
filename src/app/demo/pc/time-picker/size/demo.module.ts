import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerSizeDemoComponent} from "./demo.component";
import {JigsawTimePickerModule} from "jigsaw/pc-components/date-picker/time-picker";

@NgModule({
    declarations: [TimePickerSizeDemoComponent],
    exports: [ TimePickerSizeDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerSizeDemoModule{

}
