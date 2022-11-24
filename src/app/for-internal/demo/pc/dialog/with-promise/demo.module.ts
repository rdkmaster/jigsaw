import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogWithPromiseDemoComponent} from "./demo.component";
import {MultiDataComponent} from "./multi-data-dialog/multi-data-dialog";

@NgModule({
    declarations: [DialogWithPromiseDemoComponent, MultiDataComponent],
    exports: [DialogWithPromiseDemoComponent],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogWithPromiseDemoModule {
}
