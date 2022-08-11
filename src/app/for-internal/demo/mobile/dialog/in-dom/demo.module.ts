import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileDialogModule, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogInDomDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DialogInDomDemoComponent],
    exports: [DialogInDomDemoComponent],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogInDomDemoModule {

}
