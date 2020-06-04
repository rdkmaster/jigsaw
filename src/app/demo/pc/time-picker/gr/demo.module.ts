import {NgModule} from "@angular/core";
import {JigsawTimePickerModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerGrDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerGrDemoComponent],
    exports: [ TimePickerGrDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawButtonBarModule, JigsawDemoDescriptionModule]
})
export class TimePickerGrDemoModule{

}
