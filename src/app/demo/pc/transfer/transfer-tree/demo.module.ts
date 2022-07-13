import { NgModule } from "@angular/core";
import { JigsawTransferModule, JigsawButtonModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferTreeDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TransferTreeDemoComponent],
    exports: [TransferTreeDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule, DemoTemplateModule]
})
export class TransferTreeDemoModule {

}
