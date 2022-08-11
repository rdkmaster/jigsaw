import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, JigsawInputModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogTopDemo} from "./demo.component";

@NgModule({
    declarations: [DialogTopDemo],
    exports: [DialogTopDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawInputModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogTopDemoModule {

}
