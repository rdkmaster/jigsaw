import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonModule, JigsawDialogModule, PopupService, JigsawNumericInputModule,
    JigsawSwitchModule, JigsawRadioModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogAbsolutePositionDemoComponent} from "./demo.component";
import {UserDialog2Component} from "../misc/user-dialog2/user-dialog";

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
