import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogAbsolutePositionDemoComponent} from "./demo.component";
import {UserDialog2Component} from "../misc/user-dialog2/user-dialog";
import {JigsawNumericInputModule} from "jigsaw/pc-components/input/numeric-input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [DialogAbsolutePositionDemoComponent],
    exports: [DialogAbsolutePositionDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawNumericInputModule, JigsawSwitchModule,
        JigsawRadioModule, CommonModule],
    entryComponents: [UserDialog2Component],
    providers: [PopupService]
})
export class DialogAbsolutePositionDemoModule {

}
