import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawLoadingModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ButtonFullComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule]
})
export class ButtonFullModule {

}
