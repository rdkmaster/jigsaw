import {NgModule} from "@angular/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawButtonModule, JigsawDialogModule, JigsawInputModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogHeightDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api"
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DialogHeightDemo],
    exports: [DialogHeightDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawInputModule, JigsawDemoDescriptionModule, PerfectScrollbarModule, JigsawHeaderModule, DemoTemplateModule],
    providers: [PopupService]
})
export class DialogHeightDemoModule {

}
