import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TransferItemDisabledDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TransferItemDisabledDemoComponent],
    exports: [ TransferItemDisabledDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferItemDisabledDemoModule{

}
