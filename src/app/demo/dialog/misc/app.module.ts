import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
import {DialogMiscDemoComponent} from "./app.component";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
@NgModule({
    declarations: [DialogMiscDemoComponent,UserDialogComponent,UserDialog2Component],
    bootstrap: [ DialogMiscDemoComponent ],
    imports: [JigsawDialogModule,JigsawButtonModule],
    entryComponents:[UserDialogComponent,UserDialog2Component],
    providers: [PopupService]
})
export class DialogMiscDemoModule{

}
