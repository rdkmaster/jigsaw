import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileDialogModule} from "jigsaw/mobile-components/dialog/dialog";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogMiscDemoComponent} from "./demo.component";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";

@NgModule({
    declarations: [DialogMiscDemoComponent, UserDialogComponent, UserDialog2Component],
    exports: [DialogMiscDemoComponent],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    entryComponents: [UserDialogComponent, UserDialog2Component],
    providers: [PopupService]
})
export class DialogMiscDemoModule {

}
