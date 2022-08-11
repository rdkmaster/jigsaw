import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DatePickerMarkDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DatePickerMarkDemoComponent],
    exports: [ DatePickerMarkDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule]
})
export class DatePickerMarkDemoModule{

}
