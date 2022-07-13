import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerMarkDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DatePickerMarkDemoComponent],
    exports: [ DatePickerMarkDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class DatePickerMarkDemoModule{

}
