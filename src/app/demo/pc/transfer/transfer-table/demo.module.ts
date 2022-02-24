import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferTableDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferTableDemoComponent],
    exports: [TransferTableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferTableDemoModule {

}
