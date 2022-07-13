import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogMiscDemoComponent} from "./demo.component";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DialogMiscDemoComponent, UserDialogComponent, UserDialog2Component],
    exports: [DialogMiscDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    providers: [PopupService]
})
export class DialogMiscDemoModule {

}
