import {NgModule} from "@angular/core";
import {JigsawTimePickerModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerGrDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TimePickerGrDemoComponent],
    exports: [ TimePickerGrDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawButtonBarModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class TimePickerGrDemoModule{

}
