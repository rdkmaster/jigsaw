import { NgModule } from "@angular/core";
import { TransferDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonModule, JigsawHeaderModule, JigsawTransferModule } from "jigsaw/public_api";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { TransferBasicDemoComponent } from "./basic/demo.component";
import { TransferItemDisabledDemoComponent } from "./item-disabled/demo.component";
import { TransferListDemoComponent } from "./transfer-list/demo.component";
import { TransferListLocalPageableDemoComponent } from "./transfer-list-local-pageable/demo.component";
import { TransferTableDemoComponent } from "./transfer-table/demo.component";
import { TransferTableLocalPageableDemoComponent } from "./transfer-table-local-pageable/demo.component";
import { TransferTreeDemoComponent } from "./transfer-tree/demo.component";
@NgModule({
    declarations: [TransferDemoComponent, TransferBasicDemoComponent, TransferItemDisabledDemoComponent, TransferListDemoComponent,
        TransferListLocalPageableDemoComponent, TransferTableDemoComponent, TransferTableLocalPageableDemoComponent, TransferTreeDemoComponent, TransferTableLocalPageableDemoComponent],
    imports: [JigsawMarkdownModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule, DemoTemplateModule]
})
export class TransferDemoModule {
}
