import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferListArrayDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferListArrayDemoComponent],
    exports: [TransferListArrayDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferListArrayDemoModule {

}
