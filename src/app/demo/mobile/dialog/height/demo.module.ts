import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileDialogModule, JigsawMobileInputModule, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogHeightDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [DialogHeightDemo],
    exports: [DialogHeightDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    providers: [PopupService]
})
export class DialogHeightDemoModule {

}
