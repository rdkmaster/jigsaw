import {NgModule} from "@angular/core";
import {JigsawTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TimePickerBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerBasicDemoComponent],
    exports: [ TimePickerBasicDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule]
})
export class TimePickerBasicDemoModule{

}
