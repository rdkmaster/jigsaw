import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogButtonsDemo} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DialogButtonsDemo],
    exports: [DialogButtonsDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    providers: [PopupService]
})
export class DialogButtonsDemoModule {

}
