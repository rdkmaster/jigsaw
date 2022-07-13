import {NgModule} from "@angular/core";
import {JigsawTimePickerModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerFloatPositionDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TimePickerFloatPositionDemoComponent],
    exports: [ TimePickerFloatPositionDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, DemoTemplateModule]
})
export class TimePickerFloatPositionDemoModule{

}
