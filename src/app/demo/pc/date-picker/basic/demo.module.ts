import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DatePickerBasicDemoComponent],
    exports: [ DatePickerBasicDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule]
})
export class DatePickerBasicDemoModule{

}
