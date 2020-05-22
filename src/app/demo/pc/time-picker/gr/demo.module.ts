import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimePickerGrDemoComponent} from "./demo.component";
import {JigsawTimePickerModule} from "jigsaw/pc-components/date-picker/time-picker";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";

@NgModule({
    declarations: [TimePickerGrDemoComponent],
    exports: [ TimePickerGrDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawButtonBarModule, JigsawDemoDescriptionModule]
})
export class TimePickerGrDemoModule{

}
