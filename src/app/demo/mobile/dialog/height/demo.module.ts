import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileDialogModule} from "jigsaw/mobile-components/dialog/dialog";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogHeightDemo} from "./demo.component";

@NgModule({
    declarations: [DialogHeightDemo],
    exports: [DialogHeightDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogHeightDemoModule {

}
