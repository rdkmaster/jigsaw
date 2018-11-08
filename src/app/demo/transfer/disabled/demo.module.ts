import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayDisabledDemoComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/component/transfer/transfer";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch";

@NgModule({
    declarations: [TransferArrayDisabledDemoComponent],
    exports: [ TransferArrayDisabledDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawSwitchModule]
})
export class TransferArrayDisabledDemoModule{

}
