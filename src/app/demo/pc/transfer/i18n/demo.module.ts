import {NgModule} from "@angular/core";
import {JigsawTransferModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TransferArrayI18nDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TransferArrayI18nDemoComponent],
    exports: [ TransferArrayI18nDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTransferModule, JigsawButtonModule]
})
export class TransferArrayI18nDemoModule {

}
