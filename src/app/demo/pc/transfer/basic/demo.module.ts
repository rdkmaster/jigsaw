import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";
import { JigsawTransferRendererModule } from "jigsaw/pc-components/transfer/renderer/transfer-renderer";

@NgModule({
    declarations: [TransferArrayDemoComponent],
    exports: [ TransferArrayDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawTransferRendererModule]
})
export class TransferArrayDemoModule{

}
