import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogInDomDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DialogInDomDemoComponent],
    exports: [DialogInDomDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogInDomDemoModule {

}
