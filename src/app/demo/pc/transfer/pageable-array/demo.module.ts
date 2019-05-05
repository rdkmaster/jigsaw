import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferPageableArrayComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/pc-components/transfer/transfer";

@NgModule({
    declarations: [TransferPageableArrayComponent],
    exports: [ TransferPageableArrayComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferPageableArrayDemoModule{

}
