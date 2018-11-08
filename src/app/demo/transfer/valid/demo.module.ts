import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayValidDemoComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/component/transfer/transfer";

@NgModule({
    declarations: [TransferArrayValidDemoComponent],
    exports: [ TransferArrayValidDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferArrayValidDemoModule {

}
