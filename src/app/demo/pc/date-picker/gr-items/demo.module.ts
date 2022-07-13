import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerGrItemDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DatePickerGrItemDemoComponent],
    exports: [ DatePickerGrItemDemoComponent ],
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class DatePickerGrItemDemoModule{

}
