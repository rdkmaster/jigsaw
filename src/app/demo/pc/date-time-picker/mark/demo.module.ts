import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerMarkDemoComponent} from "./demo.component";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-picker/date-time-picker";

@NgModule({
    declarations: [DateTimePickerMarkDemoComponent],
    exports: [ DateTimePickerMarkDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule]
})
export class DateTimePickerMarkDemoModule{

}
