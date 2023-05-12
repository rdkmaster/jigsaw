import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TransferListLocalPageableDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [TransferListLocalPageableDemoComponent],
    exports: [TransferListLocalPageableDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule, JigsawSwitchModule]
})
export class TransferListLocalPageableDemoModule {

}
