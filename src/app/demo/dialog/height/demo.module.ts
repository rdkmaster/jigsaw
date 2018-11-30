import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";
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
