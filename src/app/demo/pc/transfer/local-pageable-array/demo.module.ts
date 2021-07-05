import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferLocalPageableArrayComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TransferLocalPageableArrayComponent],
    exports: [ TransferLocalPageableArrayComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferLocalPageableArrayDemoModule{

}
