import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayDemoComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/pc-components/transfer/transfer";

@NgModule({
    declarations: [TransferArrayDemoComponent],
    exports: [ TransferArrayDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferArrayDemoModule{

}
