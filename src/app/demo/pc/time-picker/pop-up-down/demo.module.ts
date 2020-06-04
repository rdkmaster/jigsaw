import {NgModule} from "@angular/core";
import {JigsawTimePickerModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerFloatPositionDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerFloatPositionDemoComponent],
    exports: [ TimePickerFloatPositionDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class TimePickerFloatPositionDemoModule{

}
