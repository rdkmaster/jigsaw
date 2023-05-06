import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule, JigsawButtonBarModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TransferListDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferListDemoComponent],
    exports: [TransferListDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule, JigsawButtonBarModule]
})
export class TransferListDemoModule {

}
