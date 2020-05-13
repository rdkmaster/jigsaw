import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerMarkDemoComponent} from "./demo.component";
import {JigsawDatePickerModule} from "../../../../../jigsaw/pc-components/date-picker/date-picker";

@NgModule({
    declarations: [DatePickerMarkDemoComponent],
    exports: [ DatePickerMarkDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule]
})
export class DatePickerMarkDemoModule{

}
