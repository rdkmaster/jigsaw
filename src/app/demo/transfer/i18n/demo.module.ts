import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayI18nDemoComponent} from "./demo.component";
import {JigsawTransferModule} from "jigsaw/pc-components/transfer/transfer";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    declarations: [TransferArrayI18nDemoComponent],
    exports: [ TransferArrayI18nDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawButtonModule]
})
export class TransferArrayI18nDemoModule {

}
