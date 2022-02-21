import { NgModule } from "@angular/core";
import { JigsawTransferModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferTablePageableDemoComponent } from "./demo.component";

import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [TransferTablePageableDemoComponent],
    exports: [TransferTablePageableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferTablePageableDemoModule {

}
