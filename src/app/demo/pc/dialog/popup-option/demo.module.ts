import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonModule, JigsawDialogModule, JigsawSwitchModule, JigsawRadioModule,
    JigsawInputModule, PopupService
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogPopOptionDemo} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

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
        DemoTemplateModule
    ],
    providers: [PopupService]
})
export class DialogPopOptionDemoModule {

}
