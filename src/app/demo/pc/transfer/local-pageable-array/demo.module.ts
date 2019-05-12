import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferLocalPageableArrayComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/pc-components/transfer/transfer";

@NgModule({
    declarations: [TransferLocalPageableArrayComponent],
    exports: [ TransferLocalPageableArrayComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferLocalPageableArrayDemoModule{

}
