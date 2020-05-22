import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerBasicDemoComponent} from "./demo.component";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-picker/date-time-picker";

@NgModule({
    declarations: [DateTimePickerBasicDemoComponent],
    exports: [ DateTimePickerBasicDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule]
})
export class DateTimePickerBasicDemoModule{

}
