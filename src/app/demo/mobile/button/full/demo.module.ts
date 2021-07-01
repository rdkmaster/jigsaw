import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawLoadingModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawMobileButtonModule, JigsawMobileCheckBoxModule, JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class ButtonFullModule {

}
