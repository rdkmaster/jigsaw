import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TransferListPageableDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferListPageableDemoComponent],
    exports: [TransferListPageableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferListPageableDemoModule {

}
