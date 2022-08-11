import {NgModule} from "@angular/core";
import {JigsawMobileCheckBoxModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawMobileCheckBoxModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule]
})
export class CheckBoxFullModule {

}
