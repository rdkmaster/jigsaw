import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/pc-components/transfer/transfer";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferItemDisabledDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TransferItemDisabledDemoComponent],
    exports: [ TransferItemDisabledDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferItemDisabledDemoModule{

}
