import {NgModule} from "@angular/core";
import {JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerLimitDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerLimitDemoComponent],
    exports: [ TimePickerLimitDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerLimitDemoModule{

}
