import {NgModule} from "@angular/core";
import {JigsawTransferModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayDisabledDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TransferArrayDisabledDemoComponent],
    exports: [ TransferArrayDisabledDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawSwitchModule]
})
export class TransferArrayDisabledDemoModule{

}
