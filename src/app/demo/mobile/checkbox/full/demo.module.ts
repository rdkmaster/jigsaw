import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class CheckBoxFullModule {

}
