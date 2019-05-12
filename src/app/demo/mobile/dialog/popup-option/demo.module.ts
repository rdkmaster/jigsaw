import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileDialogModule} from "jigsaw/mobile-components/dialog/dialog";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogPopOptionDemo} from "./demo.component";

@NgModule({
    declarations: [DialogPopOptionDemo],
    exports: [DialogPopOptionDemo],
    imports: [
        JigsawMobileDialogModule,
        JigsawMobileButtonModule,
        JigsawMobileSwitchModule,
        JigsawMobileRadioModule,
        JigsawMobileInputModule,
        JigsawDemoDescriptionModule,
        CommonModule,
    ],
    providers: [PopupService]
})
export class DialogPopOptionDemoModule {

}
