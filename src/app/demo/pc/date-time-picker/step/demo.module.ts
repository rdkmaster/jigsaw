import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerStepDemoComponent} from "./demo.component";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-and-time/date-time-picker";

@NgModule({
    declarations: [DateTimePickerStepDemoComponent],
    exports: [ DateTimePickerStepDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule]
})
export class DateTimePickerStepDemoModule{

}
