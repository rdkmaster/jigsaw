import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
import {DialogMiscDemoComponent} from "./app.component";
import {SoftBankAlertInfoComponent} from "./alert-info/alert-info";
import {SoftBankAlertWarningComponent} from "./alert-warning/alert-warning";
@NgModule({
    declarations: [DialogMiscDemoComponent,SoftBankAlertInfoComponent,SoftBankAlertWarningComponent],
    bootstrap: [ DialogMiscDemoComponent ],
    imports: [JigsawDialogModule,JigsawButtonModule],
    entryComponents:[SoftBankAlertInfoComponent,SoftBankAlertWarningComponent],
    providers: [PopupService]
})
export class DialogMiscDemoModule{

}
