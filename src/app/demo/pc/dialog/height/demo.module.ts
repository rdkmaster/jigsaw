import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogHeightDemo} from "./demo.component";

@NgModule({
    declarations: [DialogHeightDemo],
    exports: [DialogHeightDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawInputModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogHeightDemoModule {

}
