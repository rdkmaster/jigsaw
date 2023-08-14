import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawButtonModule,
    JigsawDateTimeSelectModule,
    JigsawRadioModule,
    JigsawSelectModule,
    JigsawSwitchModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DateTimeSelectShowBorderDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [DateTimeSelectShowBorderDemoComponent],
    exports: [ DateTimeSelectShowBorderDemoComponent ],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawDateTimeSelectModule, JigsawButtonBarModule,
        JigsawRadioModule, JigsawSwitchModule, JigsawSelectModule, JigsawHeaderModule, JigsawButtonModule]
})
export class DateTimeSelectShowBorderDemoModule{

}
