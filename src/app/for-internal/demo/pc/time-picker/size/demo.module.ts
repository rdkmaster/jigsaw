import {NgModule} from "@angular/core";
import {JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimePickerSizeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerSizeDemoComponent],
    exports: [ TimePickerSizeDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerSizeDemoModule{

}
