import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDatePickerModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DatePickerBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DatePickerBasicDemoComponent],
    exports: [ DatePickerBasicDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule]
})
export class DatePickerBasicDemoModule{

}
