import {NgModule} from "@angular/core";
import {JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerLimitDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TimePickerLimitDemoComponent],
    exports: [ TimePickerLimitDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class TimePickerLimitDemoModule{

}
