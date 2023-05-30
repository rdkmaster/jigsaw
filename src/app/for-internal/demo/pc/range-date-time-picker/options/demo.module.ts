import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawRangeDateTimePickerModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RangeDatePickerTimeOptionsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDatePickerTimeOptionsDemoComponent],
    exports: [ RangeDatePickerTimeOptionsDemoComponent ],
    imports: [JigsawRangeDateTimePickerModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawButtonModule, JigsawHeaderModule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ]
})
export class RangeDateTimePickerOptionsDemoModule{

}
