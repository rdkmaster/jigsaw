import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferLocalPageableArrayComponent} from "./demo.component";

@NgModule({
    declarations: [TransferLocalPageableArrayComponent],
    exports: [ TransferLocalPageableArrayComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferLocalPageableArrayDemoModule{

}
