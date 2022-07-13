import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DatePickerBasicDemoComponent],
    exports: [ DatePickerBasicDemoComponent ],
    imports: [JigsawDatePickerModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class DatePickerBasicDemoModule{

}
