import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawMobileButtonModule, JigsawMobileDialogModule, JigsawMobileSwitchModule, JigsawMobileRadioModule,
    JigsawMobileInputModule, PopupService
} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogPopOptionDemo} from "./demo.component";

@NgModule({
    declarations: [DialogPopOptionDemo],
    exports: [DialogPopOptionDemo],
    imports: [
        JigsawMobileDialogModule,
        JigsawMobileButtonModule,
        JigsawMobileSwitchModule,
        JigsawMobileRadioModule,
        JigsawMobileInputModule,
        JigsawDemoDescriptionModule,
        CommonModule,
    ],
    providers: [PopupService]
})
export class DialogPopOptionDemoModule {

}
