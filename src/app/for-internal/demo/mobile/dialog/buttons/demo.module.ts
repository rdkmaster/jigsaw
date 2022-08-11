import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileDialogModule, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogButtonsDemo} from "./demo.component";

@NgModule({
    declarations: [DialogButtonsDemo],
    exports: [DialogButtonsDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogButtonsDemoModule {

}
