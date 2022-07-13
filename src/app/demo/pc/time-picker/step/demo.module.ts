import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerStepDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TimePickerStepDemoComponent],
    exports: [ TimePickerStepDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, DemoTemplateModule]
})
export class TimePickerStepDemoModule{

}
