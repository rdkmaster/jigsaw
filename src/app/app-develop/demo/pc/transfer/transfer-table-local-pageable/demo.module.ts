import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { TransferTableLocalPageableDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferTableLocalPageableDemoComponent],
    exports: [TransferTableLocalPageableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferTableLocalPageableDemoModule {

}
