import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { TransferTablePageableDemoComponent } from "./demo.component";

@NgModule({
    declarations: [TransferTablePageableDemoComponent],
    exports: [TransferTablePageableDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule]
})
export class TransferTablePageableDemoModule {

}
