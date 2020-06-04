import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferPageableArrayComponent} from "./demo.component";

@NgModule({
    declarations: [TransferPageableArrayComponent],
    exports: [ TransferPageableArrayComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferPageableArrayDemoModule{

}
