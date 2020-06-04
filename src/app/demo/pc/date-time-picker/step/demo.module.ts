import {NgModule} from "@angular/core";
import {JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerStepDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DateTimePickerStepDemoComponent],
    exports: [ DateTimePickerStepDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawDateTimePickerModule]
})
export class DateTimePickerStepDemoModule{

}
