import {NgModule} from "@angular/core";
import {DialogPopOptionDemo} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [DialogPopOptionDemo],
    imports: [
        JigsawDialogModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        JigsawRadioModule,
        JigsawInputModule,
        CommonModule
    ],
    providers: [PopupService]
})
export class DialogPopOptionDemoModule{

}
