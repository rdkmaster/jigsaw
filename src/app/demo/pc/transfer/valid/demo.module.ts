import {NgModule} from "@angular/core";
import {JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayValidDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TransferArrayValidDemoComponent],
    exports: [ TransferArrayValidDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule]
})
export class TransferArrayValidDemoModule {

}
