import {NgModule} from "@angular/core";
import {JigsawHeaderModule, JigsawTransferModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TransferCheckedChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TransferCheckedChangeDemoComponent],
    exports: [TransferCheckedChangeDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawHeaderModule]
})
export class TransferCheckedChangeDemoModule {

}
