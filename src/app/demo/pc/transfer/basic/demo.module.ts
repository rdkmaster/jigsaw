import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferArrayDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferArrayDemoComponent],
    exports: [TransferArrayDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferArrayDemoModule {

}
