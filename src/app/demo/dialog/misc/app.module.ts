import {NgModule} from "@angular/core";
import {DialogMiscDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawDialogModule} from "../../../../jigsaw/component/dialog/dialog";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
import {PopupService} from "../../../../jigsaw/service/popup.service";
@NgModule({
    declarations: [DialogMiscDemoComponent,UserDialogComponent,UserDialog2Component],
    imports: [JigsawDialogModule,JigsawButtonModule],
    entryComponents:[UserDialogComponent,UserDialog2Component],
    providers: [PopupService]
})
export class DialogMiscDemoModule{

}
