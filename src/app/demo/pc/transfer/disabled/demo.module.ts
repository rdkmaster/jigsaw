import {NgModule} from "@angular/core";
import {JigsawTransferModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayDisabledDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TransferArrayDisabledDemoComponent],
    exports: [ TransferArrayDisabledDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawSwitchModule, JigsawHeaderModule, DemoTemplateModule]
})
export class TransferArrayDisabledDemoModule {

}
