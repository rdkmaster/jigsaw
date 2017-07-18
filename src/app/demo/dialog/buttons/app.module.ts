import {NgModule} from "@angular/core";
import {DialogButtonsDemo} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
@NgModule({
    declarations: [DialogButtonsDemo],
    imports: [JigsawDialogModule,JigsawButtonModule],
    providers: [PopupService]
})
export class DialogButtonsDemoModule{

}
