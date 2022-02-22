import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferListDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TransferListDemoComponent],
    exports: [ TransferListDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferListDemoModule{

}
