import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferListLocalPageableDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferListLocalPageableDemoComponent],
    exports: [TransferListLocalPageableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferListLocalPageableDemoModule {

}
