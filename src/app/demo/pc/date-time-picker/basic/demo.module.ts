import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerBasicDemoComponent} from "./demo.component";
import {JigsawDatePickerModule} from "../../../../../jigsaw/pc-components/date-picker/date-picker";

@NgModule({
    declarations: [DatePickerBasicDemoComponent],
    exports: [ DatePickerBasicDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule]
})
export class DatePickerBasicDemoModule{

}
