import {NgModule} from "@angular/core";
import {JigsawHeaderModule, JigsawSwitchModule, JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TransferCheckedChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TransferCheckedChangeDemoComponent],
    exports: [TransferCheckedChangeDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule, JigsawSwitchModule]
})
export class TransferCheckedChangeDemoModule {

}
