import {NgModule} from "@angular/core";
import {JigsawTimePickerModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimePickerShowBorderDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerShowBorderDemoComponent],
    exports: [ TimePickerShowBorderDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule]
})
export class TimePickerShowBorderDemoModule{

}
