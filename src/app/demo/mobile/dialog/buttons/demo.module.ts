import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileDialogModule} from "jigsaw/mobile-components/dialog/dialog";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogButtonsDemo} from "./demo.component";

@NgModule({
    declarations: [DialogButtonsDemo],
    exports: [DialogButtonsDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogButtonsDemoModule {

}
