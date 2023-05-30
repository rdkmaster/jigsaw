import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDateTimePickerModule, JigsawHeaderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DatePickerTimeOptionsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DatePickerTimeOptionsDemoComponent],
    exports: [ DatePickerTimeOptionsDemoComponent ],
    imports: [JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule, JigsawHeaderModule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ]
})
export class DateTimePickerOptionsDemoModule{

}
