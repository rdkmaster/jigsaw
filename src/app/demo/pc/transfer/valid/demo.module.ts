import { NgModule } from "@angular/core";
import { JigsawTransferModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TransferArrayValidDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [TransferArrayValidDemoComponent],
    exports: [TransferArrayValidDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, DemoTemplateModule]
})
export class TransferArrayValidDemoModule {

}
