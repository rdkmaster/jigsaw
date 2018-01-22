import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
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
