import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogInDomDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DialogInDomDemoComponent],
    exports: [DialogInDomDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    providers: [PopupService]
})
export class DialogInDomDemoModule {

}
