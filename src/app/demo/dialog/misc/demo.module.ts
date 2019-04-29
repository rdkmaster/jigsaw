import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogMiscDemoComponent} from "./demo.component";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";

@NgModule({
    declarations: [DialogMiscDemoComponent, UserDialogComponent, UserDialog2Component],
    exports: [DialogMiscDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    entryComponents: [UserDialogComponent, UserDialog2Component],
    providers: [PopupService]
})
export class DialogMiscDemoModule {

}
