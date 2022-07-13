import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerGrItemDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DateTimePickerGrItemDemoComponent],
    exports: [ DateTimePickerGrItemDemoComponent ],
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class DateTimePickerGrItemDemoModule{

}
