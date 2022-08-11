import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogButtonsDemo} from "./demo.component";

@NgModule({
    declarations: [DialogButtonsDemo],
    exports: [DialogButtonsDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogButtonsDemoModule {

}
