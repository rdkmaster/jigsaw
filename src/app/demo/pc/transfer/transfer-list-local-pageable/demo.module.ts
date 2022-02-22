import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferListLocalPageableDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TransferListLocalPageableDemoComponent],
    exports: [ TransferListLocalPageableDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferListLocalPageableDemoModule{

}
