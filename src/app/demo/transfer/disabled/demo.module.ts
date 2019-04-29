import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayDisabledDemoComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/pc-components/transfer/transfer";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch";

@NgModule({
    declarations: [TransferArrayDisabledDemoComponent],
    exports: [ TransferArrayDisabledDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawSwitchModule]
})
export class TransferArrayDisabledDemoModule{

}
