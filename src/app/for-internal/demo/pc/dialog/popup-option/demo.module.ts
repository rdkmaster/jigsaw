import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonModule, JigsawDialogModule, JigsawSwitchModule, JigsawRadioModule,
    JigsawInputModule, PopupService
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogPopOptionDemo} from "./demo.component";

@NgModule({
    declarations: [DialogPopOptionDemo],
    exports: [DialogPopOptionDemo],
    imports: [
        JigsawDialogModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        JigsawRadioModule,
        JigsawInputModule,
        JigsawDemoDescriptionModule,
        CommonModule,
    ],
    providers: [PopupService]
})
export class DialogPopOptionDemoModule {

}
