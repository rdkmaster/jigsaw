import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogPopOptionDemo} from "./demo.component";

@NgModule({
    declarations: [DialogPopOptionDemo],
    exports: [DialogPopOptionDemo],
    imports: [
        JigsawDialogModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        JigsawRadioModule,
        JigsawInputModule,
        JigsawDemoDescriptionModule,
        CommonModule,
    ],
    providers: [PopupService]
})
export class DialogPopOptionDemoModule {

}
