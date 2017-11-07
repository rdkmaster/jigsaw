import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogPopOptionDemo} from "./app.component";

@NgModule({
    declarations: [DialogPopOptionDemo],
    bootstrap: [DialogPopOptionDemo],
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
