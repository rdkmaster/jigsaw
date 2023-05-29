import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawTimePickerModule, JigsawHeaderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimePickerOptionsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimePickerOptionsDemoComponent],
    exports: [ TimePickerOptionsDemoComponent ],
    imports: [JigsawTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule, JigsawHeaderModule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ]
})
export class TimePickerOptionsDemoModule{

}
