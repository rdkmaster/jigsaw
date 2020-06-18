import {NgModule} from "@angular/core";
import {JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerSizeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerSizeDemoComponent],
    exports: [ TimePickerSizeDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerSizeDemoModule{

}
