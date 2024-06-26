import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimePickerStepDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerStepDemoComponent],
    exports: [ TimePickerStepDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class TimePickerStepDemoModule{

}
