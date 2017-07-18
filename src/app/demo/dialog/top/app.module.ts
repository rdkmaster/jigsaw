import {NgModule} from "@angular/core";
import {DialogTopDemo} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";
@NgModule({
    declarations: [DialogTopDemo],
    imports: [JigsawDialogModule,JigsawButtonModule,JigsawInputModule],
    providers: [PopupService]
})
export class DialogTopDemoModule{

}
