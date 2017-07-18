import {NgModule} from "@angular/core";
import {DialogInDomDemoComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
@NgModule({
    declarations: [DialogInDomDemoComponent],
    imports: [JigsawDialogModule,JigsawButtonModule],
    providers: [PopupService]
})
export class DialogInDomDemoModule{

}
