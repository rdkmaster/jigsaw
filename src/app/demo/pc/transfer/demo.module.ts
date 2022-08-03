import {NgModule} from "@angular/core";
import {TransferDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawTransferModule} from "../../../../jigsaw/pc-components/transfer/transfer";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TransferBasicDemoComponent} from "./basic/demo.component";
import {TransferItemDisabledDemoComponent} from "./item-disabled/demo.component";
import {TransferListDemoComponent} from "./transfer-list/demo.component";
import {TransferListLocalPageableDemoComponent} from "./transfer-list-local-pageable/demo.component";
import {TransferTableDemoComponent} from "./transfer-table/demo.component";
import {TransferTableLocalPageableDemoComponent} from "./transfer-table-local-pageable/demo.component";
import {TransferTreeDemoComponent} from "./transfer-tree/demo.component";
@NgModule({
    declarations: [TransferDemoComponent, TransferBasicDemoComponent, TransferItemDisabledDemoComponent, TransferListDemoComponent,
        TransferListLocalPageableDemoComponent, TransferTableDemoComponent, TransferTableLocalPageableDemoComponent, TransferTreeDemoComponent],
    imports: [JigsawMarkdownModule, JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawButtonModule, DemoTemplateModule]
})
export class TransferDemoModule {
}
