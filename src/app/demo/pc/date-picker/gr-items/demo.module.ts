import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerGrItemDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DatePickerGrItemDemoComponent],
    exports: [ DatePickerGrItemDemoComponent ],
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule]
})
export class DatePickerGrItemDemoModule{

}
