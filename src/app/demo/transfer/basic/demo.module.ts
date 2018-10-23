import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferDemoComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/component/transfer/transfer";

@NgModule({
    declarations: [TransferDemoComponent],
    exports: [ TransferDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferBasicDemoModule{

}
