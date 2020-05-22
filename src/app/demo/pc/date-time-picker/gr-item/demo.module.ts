import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerGrItemDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-picker/date-time-picker";

@NgModule({
    declarations: [DateTimePickerGrItemDemoComponent],
    exports: [ DateTimePickerGrItemDemoComponent ],
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule]
})
export class DateTimePickerGrItemDemoModule{

}
