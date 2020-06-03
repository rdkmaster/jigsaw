import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileDialogModule, JigsawMobileInputModule, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogHeightDemo} from "./demo.component";

@NgModule({
    declarations: [DialogHeightDemo],
    exports: [DialogHeightDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogHeightDemoModule {

}
