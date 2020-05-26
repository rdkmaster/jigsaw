import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerGrItemDemoComponent} from "./demo.component";
import {JigsawDatePickerModule} from "../../../../../jigsaw/pc-components/date-and-time/date-picker";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [DatePickerGrItemDemoComponent],
    exports: [ DatePickerGrItemDemoComponent ],
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule]
})
export class DatePickerGrItemDemoModule{

}
