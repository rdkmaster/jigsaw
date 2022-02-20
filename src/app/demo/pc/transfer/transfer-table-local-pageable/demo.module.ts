import { NgModule } from "@angular/core";
import { JigsawTransferModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferTableLocalPageableDemoComponent } from "./demo.component";

import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [TransferTableLocalPageableDemoComponent],
    exports: [TransferTableLocalPageableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferTableLocalPageableDemoModule {

}
